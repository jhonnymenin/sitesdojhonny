import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import case1 from "@/assets/gallery/case-1.svg";
import case2 from "@/assets/gallery/case-2.svg";
import case3 from "@/assets/gallery/case-3.svg";
import case4 from "@/assets/gallery/case-4.svg";
import case5 from "@/assets/gallery/case-5.svg";
import case6 from "@/assets/gallery/case-6.svg";
import case7 from "@/assets/gallery/case-7.svg";
import case8 from "@/assets/gallery/case-8.svg";
import case9 from "@/assets/gallery/case-9.svg";
import case10 from "@/assets/gallery/case-10.svg";
import case11 from "@/assets/gallery/case-11.svg";
import case12 from "@/assets/gallery/case-12.svg";
import case13 from "@/assets/gallery/case-13.svg";
import case14 from "@/assets/gallery/case-14.svg";
import case15 from "@/assets/gallery/case-15.svg";
import case16 from "@/assets/gallery/case-16.svg";
import case17 from "@/assets/gallery/case-17.svg";
import case18 from "@/assets/gallery/case-18.svg";
import case19 from "@/assets/gallery/case-19.svg";

const cases = [
  case1, case2, case3, case4, case5, case6, case7, case8, case9, case10,
  case11, case12, case13, case14, case15, case16, case17, case18, case19,
];

export function BeforeAfterGallery() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => setCurrent(api.selectedScrollSnap() + 1));
  }, [api]);

  return (
    <div className="relative">
      <Carousel
        setApi={setApi}
        opts={{ align: "start", loop: true }}
        plugins={[Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })]}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {cases.map((c, i) => (
            <CarouselItem
              key={c}
              className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
            >
              <figure
                className="group relative overflow-hidden border w-full"
                style={{
                  borderColor: "var(--color-gold-soft)",
                  aspectRatio: "1350 / 1080",
                }}
              >
                <img
                  src={c}
                  alt={`Antes e depois — caso ${String(i + 1).padStart(2, "0")}`}
                  loading={i < 3 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={i === 0 ? "high" : "low"}
                  width={1350}
                  height={1080}
                  draggable={false}
                  className="absolute inset-0 w-full h-full object-cover block transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <figcaption
                  className="absolute bottom-0 left-0 right-0 px-4 py-3 flex items-center justify-between font-sans"
                  style={{
                    background:
                      "linear-gradient(0deg, rgba(28,26,24,0.78), rgba(28,26,24,0))",
                    color: "var(--ivory)",
                    fontSize: 10,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                  }}
                >
                  <span>Caso {String(i + 1).padStart(2, "0")}</span>
                  <span style={{ color: "var(--color-gold)" }}>Elevation®</span>
                </figcaption>
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 md:-left-12 bg-transparent border-[var(--color-gold-soft)] text-[var(--color-gold)] hover:bg-[var(--color-gold)]/10 hover:text-[var(--color-gold)]" />
        <CarouselNext className="right-2 md:-right-12 bg-transparent border-[var(--color-gold-soft)] text-[var(--color-gold)] hover:bg-[var(--color-gold)]/10 hover:text-[var(--color-gold)]" />
      </Carousel>
      <div
        className="mt-6 flex justify-end font-sans"
        style={{
          fontSize: 11,
          letterSpacing: "0.28em",
          color: "var(--color-gold)",
        }}
      >
        {String(current).padStart(2, "0")} / {String(cases.length).padStart(2, "0")}
      </div>
    </div>
  );
}
