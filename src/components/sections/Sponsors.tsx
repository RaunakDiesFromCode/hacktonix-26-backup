import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import MarqueeModule from "react-fast-marquee";
import { useEffect, useState } from "react";

import { CURRENT_SPONSORS, PREVIOUS_SPONSORS } from "../../data/data";

import SectionHeader from "../ui/SectionHeader";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Marquee = (MarqueeModule as any).default ?? MarqueeModule;

/* -----------------------------------
   Animations
----------------------------------- */

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

const sponsorHover = {
    whileHover: {
        y: 6,
        scale: 0.97,
        transition: {
            duration: 0.12,
            ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
        },
    },

    whileTap: {
        scale: 0.95,
    },
};

/* -----------------------------------
   Reusable Sponsor Section
----------------------------------- */

const SponsorSection = ({
    title,
    sponsors,
    gif,
    bw = false,
    isMobile,
}: {
    title: string;
    sponsors: typeof CURRENT_SPONSORS;
    gif: string;
    bw?: boolean;
    isMobile: boolean;
}) => {
    const isMarqueeEnabled = sponsors.length >= 3;

    return (
        <div className="mt-24">
            <SectionHeader title={title} gifSrc={gif} flipGif />

            <div className="mt-16 overflow-hidden py-8">
                {/* If less than 3 → No marquee */}
                {isMarqueeEnabled ? (
                    <Marquee
                        speed={isMobile ? 35 : 50}
                        autoFill
                        gradient={false}
                    >
                        {sponsors.map((s) => (
                            <SponsorCard
                                key={s.id}
                                sponsor={s}
                                size={isMobile ? "mobile" : undefined}
                                bw={bw}
                            />
                        ))}
                    </Marquee>
                ) : (
                    /* Static Layout */
                    <div className="flex justify-center gap-6 flex-wrap">
                        {sponsors.map((s) => (
                            <SponsorCard key={s.id} sponsor={s} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

/* -----------------------------------
   Main Component
----------------------------------- */

const Sponsors = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const update = () => {
            setIsMobile(window.innerWidth < 640);
        };

        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    return (
        <motion.section
            id="sponsors"
            className="w-full py-20 sm:py-32 text-white relative overflow-hidden"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
        >
            {/* Current Year */}
            <SponsorSection
                title="This Year's Sponsors"
                sponsors={CURRENT_SPONSORS}
                gif="/gifs/bulbasaur.gif"
                isMobile={isMobile}
            />
            <div className="justify-center flex mt-6 font-bold text-2xl font-mono text-gray-200">
                <p>More coming soon!</p>
            </div>
            {/* Previous */}
            <SponsorSection
                title="Previous Sponsors"
                sponsors={PREVIOUS_SPONSORS}
                gif="/gifs/bulbasaur.gif"
                bw={true}
                isMobile={isMobile}
            />
        </motion.section>
    );
};

/* -----------------------------------
   Card
----------------------------------- */

const SponsorCard = ({
    sponsor,
    size,
    bw = false,
}: {
    sponsor: (typeof CURRENT_SPONSORS)[number];
    size?: "mobile";
    bw?: boolean;
}) => {
    const Card = (
        <motion.div
            {...sponsorHover}
            className={`
        relative
        ${size === "mobile" ? "w-40" : "w-72 lg:w-80"}
        aspect-square
        bg-black
        border-4 border-white
        overflow-hidden
        shrink-0
        cursor-pointer
        mx-2
        my-3
        shadow-[8px_8px_0_0_#22d3ee]
      `}
        >
            <img
                src={sponsor.logo}
                alt={sponsor.name}
                className={`absolute inset-0 w-full h-full object-cover bg-white ${bw ? "grayscale" : ""}`}
                loading="lazy"
                decoding="async"
            />

            <div className="absolute inset-0 bg-black/30" />

            <div className="absolute bottom-0 left-0 right-0 p-3 border-t-4 border-white bg-black">
                <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest">
                    {sponsor.name}
                </h3>
            </div>
        </motion.div>
    );

    return sponsor.website ? (
        <a href={sponsor.website} target="_blank" rel="noreferrer">
            {Card}
        </a>
    ) : (
        Card
    );
};

export default Sponsors;
