import Image from "next/image";
import type { Artifact } from "@/lib/artifacts";

export function ArtifactCapture({ artifact }: { artifact: Artifact }) {
  if (!artifact.capture || artifact.capture.length === 0) return null;

  return (
    <section className="mt-6 space-y-4 sm:mt-16 sm:space-y-8">
      {artifact.capture.map((src, i) => (
        <figure
          key={src}
          className="overflow-hidden rounded-2xl border border-[color:var(--color-hairline)] bg-[color:var(--color-bg)] shadow-float"
        >
          <Image
            src={src}
            alt={`${artifact.name} capture ${i + 1}`}
            width={1600}
            height={1000}
            className="h-auto w-full object-contain"
            unoptimized={src.startsWith("http")}
          />
        </figure>
      ))}
    </section>
  );
}
