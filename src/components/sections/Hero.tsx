import type { Variants } from "framer-motion";
import {
    motion,
    useScroll,
    useTransform,
    AnimatePresence,
} from "framer-motion";
import { useRef, useEffect } from "react";
import { EVENT_STATUS } from "../../data/data";
import BrutalButton from "../ui/BrutalButton";
import { useImageReady } from "../../hooks/useImageReady";

const easeInOut = [0.4, 0, 0.2, 1] as const;

const section: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.25,
            ease: easeInOut,
            when: "beforeChildren",
            staggerChildren: 0.05,
        },
    },
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.2,
            ease: easeInOut,
        },
    },
};

const slideRight: Variants = {
    hidden: { opacity: 0, x: 24 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.25,
            ease: easeInOut,
        },
    },
};

const brutalCTA: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 700,
            damping: 28,
            mass: 0.6,
        },
    },
};

const Hero = () => {
    const ref = useRef<HTMLDivElement | null>(null);

    const mewReady = useImageReady("/gifs/mew.gif");
    const editionReady = useImageReady("/gradient.webp");

    // Load Devfolio SDK
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://apply.devfolio.co/v2/sdk.js";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const scale = useTransform(scrollYProgress, [0, 0.1, 1], [1, 1, 0.97]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, -1]);

    return (
        <motion.section
            ref={ref}
            id="about"
            style={{ scale, rotate }}
            className="min-h-screen text-white overflow-hidden
            bg-[radial-gradient(ellipse_at_bottom,rgba(34,211,238,0.35),rgba(0,0,0,0.9)_70%,#000_100%)]
            pb-12 border-white border-3 shadow-2xl"
            variants={section}
            initial="hidden"
            animate="visible"
        >
            <div className="px-7">
                {/* HEADER */}
                <motion.div
                    className="relative flex justify-center mt-4"
                    variants={fadeUp}
                >
                    <motion.img
                        src="/header.webp"
                        alt="HACKTONIX"
                        className="w-full"
                        variants={fadeUp}
                        fetchPriority="high"
                        loading="eager"
                        decoding="async"
                    />

                    <div
                        className="
        absolute
        top-1/2 left-1/2
        -translate-x-1/2 -translate-y-1/2
        pointer-events-none
    "
                    >
                        {/* Placeholder */}
                        <AnimatePresence>
                            {!mewReady && (
                                <motion.div
                                    className="
                    w-50 h-50 sm:w-65 sm:h-65
                    rounded-full
                    bg-[radial-gradient(circle,#22d3ee55,#00000000)]
                    blur-xl
                "
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                />
                            )}
                        </AnimatePresence>

                        {/* Actual GIF */}
                        <motion.img
                            src="/gifs/mew.gif"
                            alt="mew"
                            loading="eager"
                            decoding="async"
                            className="
            scale-[0.7] sm:scale-[1.4] lg:scale-[1.6]
            contrast-125 saturate-75
            drop-shadow-[4px_4px_0_#06b6d4]
        "
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={
                                mewReady
                                    ? { opacity: 1, scale: 1 }
                                    : { opacity: 0 }
                            }
                            transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 30,
                            }}
                        />
                    </div>
                </motion.div>

                <motion.div
                    className="
                        flex flex-col gap-2 text-lg
                        sm:flex-row sm:justify-between sm:text-3xl
                        -mt-2 sm:-mt-4
                    "
                    variants={fadeUp}
                >
                    <span>THE ANNUAL TECH HACKATHON</span>

                    <span className="uppercase tracking-wide">
                        {EVENT_STATUS.comingSoon
                            ? "Coming Soon"
                            : EVENT_STATUS.dateText}
                    </span>
                </motion.div>
            </div>

            <motion.hr
                className="border-t-2 my-5 w-full border-white/70"
                variants={fadeUp}
            />

            {/* CENTER CTA */}
            <div
                className="
                    flex flex-col w-full
                    items-center justify-center
                    gap-4
                    mt-4 sm:-mt-12
                "
            >
                <BrutalButton
                    href="https://hacktonix-26.devfolio.co/"
                    variants={brutalCTA}
                    variant="primary"
                >
                    <div className="flex items-center justify-center gap-2">
                        <img
                            src="/devfolio_logo.svg"
                            alt="Devfolio"
                            className="h-6 w-6 object-contain shrink-0"
                            loading="eager"
                            decoding="async"
                        />
                        <span className="relative top-0.5">
                            Apply on Devfolio
                        </span>
                    </div>
                </BrutalButton>

                <BrutalButton
                    href="https://go.phnx.in/discord"
                    variants={brutalCTA}
                    variant="discord"
                    dontCollapse
                >
                    <img
                        src="/discord.svg"
                        alt="Discord"
                        className="h-6 w-6 object-contain bg-white p-1"
                        loading="eager"
                        decoding="async"
                    />
                    <span className="hidden sm:inline">Join Discord</span>
                </BrutalButton>
            </div>

            <div
                className="
                    flex flex-col-reverse
                    lg:flex-row
                    w-full
                    gap-10
                    mt-10 lg:-mt-15
                "
            >
                {/* LEFT CONTENT */}
                <motion.div className="w-full" variants={fadeUp}>
                    <h1
                        className="
                            px-7
                            text-[#86A8AE]
                            text-5xl sm:text-7xl lg:text-9xl
                            font-hero uppercase tracking-tight
                        "
                    >
                        ABOUT US.
                    </h1>

                    <hr className="border-t-2 w-full border-white/70 mb-4" />

                    <div className="px-7 text-xl leading-relaxed">
                        Phoenix 2026 proudly presents HACKTONIX 5.0 — an
                        in-person hackathon where innovation, creativity, and
                        problem-solving take center stage.
                        <br />
                        <br />
                        Like a true Pokémon Gym Battle, you’ll strategize,
                        build, and evolve ideas under pressure to create
                        impactful solutions. Team up, push your limits, and put
                        your skills to the test in this ultimate coding
                        showdown.
                        <br />
                        <br />
                        The challenge is set. The arena is ready. Are you?
                    </div>
                </motion.div>

                {/* RIGHT IMAGE */}
                <motion.div
                    className="relative w-full mr-7"
                    variants={slideRight}
                >
                    <div className="relative w-full aspect-3/2 mr-7">
                        {/* Placeholder */}
                        <motion.div
                            className="
            absolute inset-0
            bg-[linear-gradient(135deg,#06b6d4,#000)]
            border-4 border-white
            shadow-[10px_10px_0_0_#06b6d4]
        "
                            animate={{ opacity: editionReady ? 0 : 1 }}
                            transition={{ duration: 0.2 }}
                        />

                        {/* Actual image */}
                        <motion.img
                            src="/gradient.webp"
                            alt="2026 Edition"
                            loading="eager"
                            decoding="async"
                            className="
            absolute inset-0
            w-full h-full object-cover
            border-4 border-white
            shadow-[10px_10px_0_0_#06b6d4]
        "
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={
                                editionReady ? { opacity: 0.9, scale: 1 } : {}
                            }
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            style={{ rotate: "-0.3deg" }}
                        />
                    </div>

                    <div className="absolute top-6 right-6 text-right">
                        <span className="block text-[2rem] tracking-widest text-white/50 uppercase pr-5">
                            Edition
                        </span>
                        <span
                            className="
                                block
                                text-[6rem] sm:text-[10rem] lg:text-[15rem]
                                font-hero text-cyan-300
                                leading-none -mt-2 sm:-mt-5
                            "
                        >
                            #2026
                        </span>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default Hero;
