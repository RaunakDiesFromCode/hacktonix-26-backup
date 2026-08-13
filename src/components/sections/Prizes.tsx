import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";

const Prizes = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const [count, setCount] = useState(0);
    const target = 50000;
    const duration = 1200;

    useEffect(() => {
        if (!isInView) return;

        const startTime = performance.now();

        const tick = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
    }, [isInView]);

    return (
        <section
            ref={ref}
            id="prizes"
            className="
    w-full
    py-20 sm:py-32
    text-white
    relative
    overflow-hidden
"
        >
            {/* HEADER */}
            <SectionHeader title="Prizes" gifSrc="/gifs/cleffa.gif" flipGif />

            {/* COUNTER BLOCK */}
            <motion.div
                initial={{ opacity: 0, y: 80 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="
    mt-16 sm:mt-32
    mx-auto
    max-w-5xl
    border-4 border-white
    shadow-[10px_10px_0_0_#06b6d4]
    p-6 sm:p-10 lg:p-16
    text-center
    rotate-[-0.3deg]
    bg-black
"
            >
                <p className="uppercase tracking-widest text-sm font-bold text-white/60">
                    Total Prize Pool
                </p>

                <div
                    className="
        mt-4 sm:mt-6
        font-extrabold
        text-5xl sm:text-7xl lg:text-[9rem]
        leading-none
        text-cyan-300
    "
                >
                    ₹{count.toLocaleString()}
                </div>

                <p
                    className="
        mt-6 sm:mt-10
        text-base sm:text-lg lg:text-xl
        text-white/80
        max-w-3xl
        mx-auto
        font-mono
    "
                >
                    Cash prizes, savage swag, shiny goodies, and bragging rights
                    that slap harder than realizing you procrastinated again.
                </p>
            </motion.div>
        </section>
    );
};

export default Prizes;
