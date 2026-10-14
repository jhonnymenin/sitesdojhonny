import { createFileRoute } from "@tanstack/react-router";
import { AppPage } from "@/components/app/AppPage";
import { EuVou } from "@/components/EuVou";

export const Route = createFileRoute("/euvou")({
  head: () => ({
    meta: [
      { title: "#EuVou — I Simpósio CITA" },
      {
        name: "description",
        content:
          "Monte a sua arte #EuVou com a sua foto e compartilhe que você vai ao I Simpósio CITA de Doenças Imunomediadas.",
      },
      { property: "og:title", content: "#EuVou — I Simpósio CITA" },
      { property: "og:description", content: "Monte a sua arte e conte que você vai ao simpósio." },
    ],
  }),
  component: EuVouPage,
});

function EuVouPage() {
  return (
    <AppPage title="#EuVou" subtitle="Monte a sua arte e compartilhe">
      <EuVou />
    </AppPage>
  );
}
