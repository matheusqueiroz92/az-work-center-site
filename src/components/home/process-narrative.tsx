import Image from "next/image";

export const processNarrativeSrc = "/media/process/process-narrative.png";
export const processNarrativeWidth = 2172;
export const processNarrativeHeight = 724;

const processCrops = ["1", "2", "3", "4"] as const;

function ProcessNarrativeImage({ sizes }: { sizes: string }) {
  return (
    <Image
      src={processNarrativeSrc}
      width={processNarrativeWidth}
      height={processNarrativeHeight}
      alt=""
      aria-hidden="true"
      draggable={false}
      loading="lazy"
      sizes={sizes}
    />
  );
}

export function ProcessNarrative() {
  return (
    <div
      data-process-narrative=""
      aria-hidden="true"
      className="pointer-events-none"
    >
      <ProcessNarrativeImage sizes="(min-width: 1024px) min(1280px, calc(100vw - 4rem)), 100vw" />
    </div>
  );
}

export function ProcessStationMark({ index }: { index: number }) {
  const crop = processCrops[index];

  if (!crop) {
    return null;
  }

  return (
    <div
      data-process-mark=""
      data-process-crop={crop}
      aria-hidden="true"
      className="pointer-events-none"
    >
      <ProcessNarrativeImage sizes="(max-width: 1023px) 480px, 1px" />
    </div>
  );
}
