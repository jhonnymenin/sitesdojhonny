
-- 1) Secure coupon validation via SECURITY DEFINER function.
--    Avoids any temptation to open a public SELECT on public.coupons.
CREATE OR REPLACE FUNCTION public.validate_coupon(_code text)
RETURNS TABLE (id uuid, valid boolean, reason text)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  c public.coupons%ROWTYPE;
BEGIN
  IF _code IS NULL OR length(trim(_code)) = 0 THEN
    RETURN QUERY SELECT NULL::uuid, false, 'empty'::text;
    RETURN;
  END IF;

  SELECT * INTO c FROM public.coupons WHERE upper(code) = upper(trim(_code)) LIMIT 1;

  IF NOT FOUND THEN
    RETURN QUERY SELECT NULL::uuid, false, 'not_found'::text;
    RETURN;
  END IF;

  IF c.revoked_at IS NOT NULL THEN
    RETURN QUERY SELECT c.id, false, 'revoked'::text;
    RETURN;
  END IF;

  IF c.max_uses IS NOT NULL AND c.uses_count >= c.max_uses THEN
    RETURN QUERY SELECT c.id, false, 'exhausted'::text;
    RETURN;
  END IF;

  RETURN QUERY SELECT c.id, true, 'ok'::text;
END;
$$;

REVOKE ALL ON FUNCTION public.validate_coupon(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.validate_coupon(text) TO authenticated, service_role;

-- 2) Registrations: keep client writes closed. All inserts must go through
--    server functions using the service role. Explicitly revoke any lingering
--    write grants from anon/authenticated (RLS also has no INSERT/UPDATE/DELETE
--    policies, so this is defense in depth).
REVOKE INSERT, UPDATE, DELETE ON public.registrations FROM anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.registrations TO service_role;

-- 3) user_roles: role assignments are backend-only. No client writes allowed.
REVOKE INSERT, UPDATE, DELETE ON public.user_roles FROM anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_roles TO service_role;
