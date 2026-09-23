import logoAsset from "@/assets/logo-outubro-prateado.png";

/**
 * Official logo. Never redrawn, never recoloured.
 *
 * O arquivo original era um JPEG com fundo branco e uma margem larga em volta da
 * arte, o que desenhava uma caixa branca visível sobre o creme do site. Aqui ele
 * é a mesma arte, sem alteração de forma ou cor: apenas recortada na margem e com
 * o branco do fundo convertido em transparência.
 *
 * On dark surfaces it sits on its own ivory plate so the artwork stays intact.
 */
export function BrandLogo({
  className = "h-9",
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  const img = (
    <img
      src={logoAsset}
      alt="Outubro Prateado — Envelhecer é continuar."
      className={`${className} w-auto`}
    />
  );
  if (!onDark) return img;
  return (
    <span className="inline-flex items-center bg-[--color-paper] px-4 py-2.5">{img}</span>
  );
}
