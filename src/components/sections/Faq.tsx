import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { FAQS } from "../../data/data";
import SectionHeader from "../ui/SectionHeader";

const easeSnap = [0.2, 0, 0, 1] as const;

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.08,
        },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.35, ease: easeSnap },
    },
};

const answerVariants: Variants = {
    hidden: {
        height: 0,
        opacity: 0,
    },
    visible: {
        height: "auto",
        opacity: 1,
        transition: {
            duration: 0.3,
            ease: easeSnap,
        },
    },
    exit: {
        height: 0,
        opacity: 0,
        transition: {
            duration: 0.25,
            ease: easeSnap,
        },
    },
};

const Faq = () => {
    const [openId, setOpenId] = useState<string | null>(null);

    const toggle = (id: string) => {
        setOpenId((prev) => (prev === id ? null : id));
    };

    return (
        <motion.section
            id="faqs"
            className="
    w-full
    py-20 sm:py-32
    text-white
    relative
    overflow-hidden
"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            {/* HEADER */}
            <SectionHeader title="FAQs" gifSrc="/gifs/psyduck.gif" flipGif />

            {/* FAQ LIST */}
            <div
                className="
        max-w-5xl mx-auto
        px-4 sm:px-6
        space-y-4 sm:space-y-8
    "
            >
                {FAQS.map((faq, i) => {
                    const isOpen = openId === faq.id;

                    return (
                        <motion.div
                            key={faq.id}
                            variants={cardVariants}
                            className="relative bg-black border-4 border-white md:shadow-[10px_10px_0_0_#06b6d4] shadow-[7px_7px_0_0_#06b6d4]"
                            style={{
                                rotate: i % 2 === 0 ? "-0.3deg" : "0.3deg",
                            }}
                        >
                            {/* QUESTION */}
                            <button
                                onClick={() => toggle(faq.id)}
                                className="
    w-full
    px-4 sm:px-8
    py-4 sm:py-6
    flex items-center justify-between
    text-left
    uppercase font-extrabold tracking-wide
    text-base sm:text-lg lg:text-xl
"
                            >
                                <span>{faq.question}</span>

                                <span
                                    className={`ml-6 text-cyan-300 font-mono text-xl sm:text-2xl lg:text-3xl transition-transform duration-200 ${isOpen ? "rotate-45" : "rotate-0"}`}
                                >
                                    +
                                </span>
                            </button>

                            {/* ANSWER */}
                            <AnimatePresence initial={false}>
                                {isOpen && (
                                    <motion.div
                                        variants={answerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="overflow-hidden border-t-4 border-white"
                                    >
                                        <div
                                            className="
        px-4 sm:px-8
        py-4 sm:py-6
        text-sm sm:text-base lg:text-lg
        text-white/85
        font-mono
        leading-relaxed
    "
                                        >
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>
        </motion.section>
    );
};

export default Faq;
