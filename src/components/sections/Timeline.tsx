import { useRef } from "react";
import { ACTIVE_TIMELINE, EVENT_STATUS } from "../../data/data";
import { useScroll, motion } from "framer-motion";
import TimelineDay from "../ui/TimelineDay";
import SectionHeader from "../ui/SectionHeader";

const Timeline = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    return (
        <section
            ref={sectionRef}
            id="timeline"
            className="
                w-full
                py-20 sm:py-32
                text-white
                relative
                overflow-hidden
            "
        >
            <SectionHeader title="Timeline" gifSrc="/gifs/mudkip.gif" flipGif />

            {EVENT_STATUS.comingSoon ? (
                /* ───────────────────────────── */
                /* SIMPLE STACKED CARDS (TBA MODE) */
                /* ───────────────────────────── */
                <div className="max-w-4xl mx-auto px-4 space-y-10">
                    {ACTIVE_TIMELINE.map((day, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.35 }}
                            className="
                                relative
                                bg-black
                                border-4 border-white
                                shadow-[8px_8px_0_0_#06b6d4]
                                p-8 sm:p-10
                            "
                        >
                            {/* PHASE */}
                            <h3 className="text-3xl font-hero text-cyan-300 mb-2">
                                {day.day}
                            </h3>

                            {/* DATE */}
                            <p className="font-mono text-white/60 mb-6">
                                {day.date} • {day.dateLabel}
                            </p>

                            {/* EVENTS */}
                            <div className="space-y-3">
                                {day.events.map((event, i) => (
                                    <div
                                        key={i}
                                        className="flex gap-4 border-l-4 border-cyan-300 pl-4"
                                    >
                                        <span className="text-cyan-300 font-mono text-sm">
                                            {event.time}
                                        </span>
                                        <p className="font-mono text-white/90">
                                            {event.title}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                /* ───────────────────────────── */
                /* ORIGINAL ANIMATED TIMELINE */
                /* ───────────────────────────── */
                <div
                    className="
                        relative
                        grid
                        grid-cols-1 lg:grid-cols-2
                        gap-16 lg:gap-0
                        max-w-7xl
                        mx-auto
                        px-4 sm:px-8
                    "
                >
                    {ACTIVE_TIMELINE.map((day, index) => (
                        <TimelineDay
                            key={index}
                            day={day}
                            index={index}
                            scrollYProgress={scrollYProgress}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default Timeline;
