import Image from "next/image";
import type { Artifact } from "@/lib/artifacts";

export function ArtifactDemo({ artifact }: { artifact: Artifact }) {
  const demo = artifact.demo;
  if (!demo) return null;

  const frame =
    "mt-6 overflow-hidden rounded-2xl border border-[color:var(--color-hairline)] bg-[color:var(--color-bg)] shadow-float sm:mt-16";

  if (demo.kind === "iframe") {
    return (
      <figure className={frame}>
        <iframe
          src={demo.url}
          title={`${artifact.name} live demo`}
          loading="lazy"
          className="h-[70vh] w-full border-0"
          allow="clipboard-read; clipboard-write; fullscreen"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </figure>
    );
  }

  if (demo.kind === "video") {
    return (
      <figure className={frame}>
        <video
          src={demo.url}
          poster={demo.poster}
          controls
          playsInline
          className="h-auto w-full"
        />
      </figure>
    );
  }

  return (
    <figure className={frame}>
      <Image
        src={demo.url}
        alt={`${artifact.name} demo`}
        width={1600}
        height={1000}
        className="h-auto w-full object-contain"
        unoptimized={demo.kind === "gif" || demo.url.startsWith("http")}
      />
    </figure>
  );
}
