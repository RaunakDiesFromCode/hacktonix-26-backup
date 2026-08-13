import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import MarqueeModule from "react-fast-marquee";
import SectionHeader from "../ui/SectionHeader";
import { REVIEWS } from "../../data/data";
import { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Marquee = (MarqueeModule as any).default ?? MarqueeModule;

const sectionVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.06,
        },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" },
    },
};

const hoverFx = {
    whileHover: { y: 6, scale: 0.97 },
    whileTap: { scale: 0.95 },
};

const Reviews = () => {
    const [speed, setSpeed] = useState(45);

    // ✅ Fix: no window during render
    useEffect(() => {
        const update = () => {
            setSpeed(window.innerWidth < 640 ? 28 : 45);
        };

        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    return (
        <motion.section
            id="reviews"
            className="w-full py-20 sm:py-32 text-white relative"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
        >
            <SectionHeader title="Reviews" gifSrc="/gifs/espeon.gif" flipGif />

            {/* marquee wrapper */}
            <div className="mt-16 sm:mt-28 py-8">
                <Marquee
                    speed={speed}
                    autoFill
                    gradient={false}
                    className="overflow-visible" // ✅ don't clip shadows
                >
                    <div className="flex items-stretch will-change-transform">
                        {REVIEWS.map((r) => (
                            <ReviewCard key={r.id} review={r} />
                        ))}
                    </div>
                </Marquee>
            </div>
        </motion.section>
    );
};

const ReviewCard = ({ review }: { review: (typeof REVIEWS)[number] }) => {
    return (
        <motion.div
            {...hoverFx}
            variants={cardVariants}
            className="
        w-72 lg:w-80
        shrink-0
        mx-4 my-3
        p-6

        bg-black
        border-4 border-white
        shadow-[8px_8px_0_0_#22d3ee]

        rotate-[-0.4deg]
        cursor-default
        transform-gpu
      "
        >
            <p className="text-sm sm:text-base text-white/90 leading-relaxed font-mono line-clamp-3 min-h-18">
                “{review.text}”
            </p>

            <div className="my-4 border-t-2 border-white/30" />

            <h4 className="font-extrabold uppercase tracking-widest text-cyan-300 text-sm">
                {review.name}
            </h4>
            <p className="text-xs text-white/60">{review.role}</p>
        </motion.div>
    );
};

export default Reviews;
