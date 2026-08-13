import { motion, useTransform, MotionValue } from "framer-motion";
import type { TimelineDayData } from "../../data/data";

interface Props {
    day: TimelineDayData;
    index: number;
    scrollYProgress: MotionValue<number>;
}

const TimelineDay = ({ day, index, scrollYProgress }: Props) => {
    const isLeft = index % 2 === 0;

    // DESKTOP slide (left / right)
    const x = useTransform(
        scrollYProgress,
        [0.1, 0.5],
        isLeft ? [-300, 0] : [300, 0],
    );

    // MOBILE slide (bottom → up)
    const y = useTransform(scrollYProgress, [0.1, 0.5], [80, 0]);

    const opacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);

    return (
        <motion.div
            className="
        relative
        px-4 sm:px-8 lg:px-16
        py-6 sm:py-16 lg:py-24
    "
            style={{
                opacity,
                rotate: isLeft ? "-0.3deg" : "0.3deg",
                willChange: "transform",
            }}
        >
            {/* MOBILE motion */}
            <motion.div className="lg:hidden" style={{ y }}>
                <Card day={day} />
            </motion.div>

            {/* DESKTOP motion */}
            <motion.div className="hidden lg:block" style={{ x }}>
                <Card day={day} />
            </motion.div>
        </motion.div>
    );
};

const Card = ({ day }: { day: TimelineDayData }) => {
    return (
        <div
            className="
                relative
                bg-black
                border-4 border-white
                shadow-[8px_8px_0_0_#06b6d4]
                p-6 sm:p-8 lg:p-12
            "
        >
            {/* BIG DAY NUMBER */}
            <div
                className="
                    absolute
                    -top-6 left-2
                    text-[4rem] sm:text-[6rem] lg:text-[10rem]
                    font-hero
                    text-white/20
                    pointer-events-none
                "
            >
                {day.day}
            </div>

            {/* DATE */}
            <div className="mb-8 sm:mb-10 lg:mb-12">
                <p className="text-cyan-300 font-hero text-3xl sm:text-4xl lg:text-6xl">
                    {day.date}
                </p>
                <p className="uppercase tracking-widest text-white/60 mt-1 sm:mt-2 text-xs sm:text-sm">
                    {day.dateLabel}
                </p>
            </div>

            {/* EVENTS */}
            <div className="space-y-6 sm:space-y-8">
                {day.events.map((event, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 32,
                            mass: 0.6,
                        }}
                        className="
                            flex gap-4 sm:gap-6
                            items-start
                            border-l-4 border-cyan-300
                            pl-4 sm:pl-6
                        "
                    >
                        <span className="text-cyan-300 font-mono text-xs sm:text-sm pt-1">
                            {event.time}
                        </span>
                        <p className="text-base sm:text-lg lg:text-xl text-white/90 font-mono">
                            {event.title}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};



export default TimelineDay;
