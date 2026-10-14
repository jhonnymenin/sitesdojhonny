import { citaClinicsData } from "@/data/citaClinicsData";

/** Bloco institucional das clínicas do Grupo CITA (não são patrocinadores). */
export function CitaClinics() {
  return (
    <div className="rounded-3xl border border-navy/10 bg-mist/40 p-4">
      <ul className="grid grid-cols-2 gap-3">
        {citaClinicsData.map((c) => (
          <li key={c.id} className="flex h-20 items-center justify-center rounded-2xl bg-white p-3">
            <img src={c.logo} alt={c.name} loading="lazy" className="max-h-11 w-full object-contain" />
          </li>
        ))}
      </ul>
      <p className="mt-3 text-center text-[11px] leading-relaxed text-navy/50">
        Unidades que compõem o Grupo CITA, realizador do simpósio.
      </p>
    </div>
  );
}
