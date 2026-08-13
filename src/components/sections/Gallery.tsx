import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GALLERY_IMAGES } from "../../data/data";
import SectionHeader from "../ui/SectionHeader";
import { useImageReady } from "../../hooks/useImageReady";

/* Single Image Card */
const GalleryImage = ({
    src,
    index,
    isInView,
}: {
    src: string;
    index: number;
    isInView: boolean;
}) => {
    const ready = useImageReady(src);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
                isInView && ready
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.9 }
            }
            transition={{
                delay: index * 0.08,
                duration: 0.4,
                ease: "easeOut",
            }}
            className="
                overflow-hidden
                border-4
                border-white
                shadow-[8px_8px_0_0_#06b6d4]
                bg-gray-800
                relative
            "
        >
            {/* Loading Placeholder */}
            {!ready && (
                <div className="absolute inset-0 bg-gray-700 animate-pulse" />
            )}

            {/* Image */}
            <img
                src={src}
                alt={`Gallery Image ${index + 1}`}
                loading="lazy"
                decoding="async"
                className={`
                    w-full
                    h-full
                    object-cover
                    transition-all
                    duration-500
                    hover:scale-110
                    ${ready ? "opacity-100" : "opacity-0"}
                `}
            />
        </motion.div>
    );
};

const Gallery = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            ref={ref}
            id="gallery"
            className="
                w-full
                py-20 sm:py-32
                text-white
                relative
                overflow-hidden
            "
        >
            {/* HEADER */}
            <SectionHeader title="Gallery" gifSrc="/gifs/snorlax.gif" flipGif />

            {/* MAIN CARD */}
            <motion.div
                initial={{ opacity: 0, y: 80 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="
                    mt-16 sm:mt-32
                    mx-auto
                    max-w-7xl
                    border-4 border-white
                    shadow-[10px_10px_0_0_#06b6d4]
                    p-6 sm:p-10 lg:p-16
                    md:rotate-[-0.3deg]
                    bg-black
                "
            >
                {/* GRID */}
                <div
                    className="
                        grid
                        grid-cols-1
                        sm:grid-cols-2
                        lg:grid-cols-3
                        gap-6
                        sm:gap-8
                    "
                >
                    {GALLERY_IMAGES.map((image, i) => (
                        <GalleryImage
                            key={`gallery-${i}`}
                            src={image}
                            index={i}
                            isInView={isInView}
                        />
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Gallery;
