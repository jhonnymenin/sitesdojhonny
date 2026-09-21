
ALTER TABLE public.coupons
  ALTER COLUMN guest_name DROP NOT NULL,
  ALTER COLUMN guest_email DROP NOT NULL,
  ADD COLUMN IF NOT EXISTS max_uses integer,
  ADD COLUMN IF NOT EXISTS uses_count integer NOT NULL DEFAULT 0;

CREATE UNIQUE INDEX IF NOT EXISTS coupons_code_unique ON public.coupons (upper(code));

INSERT INTO public.coupons (code)
SELECT 'CONVIDADOCITA'
WHERE NOT EXISTS (SELECT 1 FROM public.coupons WHERE upper(code) = 'CONVIDADOCITA');

ALTER TABLE public.registrations
  ADD COLUMN IF NOT EXISTS crm_uf text,
  ADD COLUMN IF NOT EXISTS rqe text,
  ADD COLUMN IF NOT EXISTS coupon_code text;
