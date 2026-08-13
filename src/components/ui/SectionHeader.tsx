import { motion } from "framer-motion";
import { useImageReady } from "../../hooks/useImageReady";

type SectionHeaderProps = {
    title: string;
    gifSrc?: string;
    flipGif?: boolean;
};

const gifSize = "w-14 h-14 sm:w-24 sm:h-24";

function HeaderGif({ src, flip }: { src: string; flip?: boolean }) {
    const ready = useImageReady(src);

    return (
        <div className={`relative ${gifSize} shrink-0`}>
            {/* glow placeholder */}
            {!ready && (
                <div
                    className="
            absolute inset-0
            rounded-full
            bg-[radial-gradient(circle,#22d3ee55,#00000000)]
            blur-lg
            animate-pulse
          "
                />
            )}

            <motion.img
                src={src}
                alt=""
                loading="lazy"
                decoding="async"
                className={`
          ${gifSize}
          object-contain
          contrast-125
          ${flip ? "scale-x-[-1]" : ""}
        `}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: ready ? 1 : 0, scale: ready ? 1 : 0.9 }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 28,
                }}
            />
        </div>
    );
}

export default function SectionHeader({
    title,
    gifSrc,
    flipGif,
}: SectionHeaderProps) {
    return (
        <div
            className="
        flex items-center justify-center
        gap-4 sm:gap-8
        border-y-4 border-white
        py-6 sm:py-10
        mb-16 sm:mb-24
      "
        >
            {gifSrc && <HeaderGif src={gifSrc} flip={flipGif} />}

            <h1
                className="
          text-5xl sm:text-7xl lg:text-[9rem]
          font-hero font-extrabold uppercase
          tracking-tight leading-none
          text-center
          drop-shadow-[4px_4px_0_#06b6d4]
          md:drop-shadow-[6px_6px_0_#06b6d4]
        "
            >
                {title}
            </h1>

            {gifSrc && <HeaderGif src={gifSrc} />}
        </div>
    );
}
