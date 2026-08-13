import React, { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { PEOPLE, type PersonRole } from "../../data/data";
import BrutalButton from "../ui/BrutalButton";
import SectionHeader from "../ui/SectionHeader";

/* -----------------------------------
   Role Badge Styles
----------------------------------- */
const ROLE_STYLES: Record<PersonRole, string> = {
    mentor: "bg-[#22d3ee] text-black",
    judge: "bg-white text-black",
};

const personHover = {
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
   Types
----------------------------------- */
type PanelProps = {
    onMentorClick: () => void;
    onJudgeClick: () => void;
};

/* -----------------------------------
   Empty State
----------------------------------- */
const EmptyState: React.FC<{
    text: string;
    ctaLabel?: string;
    onClick?: () => void;
}> = ({ text, ctaLabel, onClick }) => {
    return (
        <div className="max-w-3xl mx-auto px-6 mt-16 mb-24">
            <div className="border-4 border-white bg-black shadow-[8px_8px_0_0_#22d3ee] px-10 py-20 text-center">
                <p className="text-2xl uppercase font-extrabold tracking-widest text-[#22d3ee]">
                    {text}
                </p>

                <p className="mt-4 text-white/70 font-mono">
                    We’re locking in the right people. Quality over filler.
                </p>

                {ctaLabel && (
                    <div className="mt-10 flex justify-center">
                        <BrutalButton onClick={onClick} variant="primary">
                            {ctaLabel}
                        </BrutalButton>
                    </div>
                )}
            </div>
        </div>
    );
};

/* -----------------------------------
   Card Component
----------------------------------- */
const PersonCard = memo(({ person }: { person: (typeof PEOPLE)[number] }) => {
    const avatarSrc = person.avatar.startsWith("/")
        ? person.avatar
        : `/${person.avatar}`;

    return (
        <motion.div
            {...personHover}
            className="
        relative
        w-full max-w-[320px] mx-auto
        aspect-3/4
        bg-black
        border-4 border-white
        overflow-hidden
        cursor-pointer
        shadow-[8px_8px_0_0_#22d3ee]
      "
        >
            <img
                src={avatarSrc}
                alt={person.name}
                className="absolute inset-0 w-full h-full object-cover bg-white contrast-125 saturate-50 hover:saturate-100 transition-all duration-300"
                loading="lazy"
                decoding="async"
            />

            <div className="absolute inset-0 bg-black/20" />

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t-4 border-white bg-black">
                <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-widest text-white">
                    {person.name}
                </h3>

                <p
                    className={`mt-2 inline-block font-bold text-[10px] px-2 py-0.5 uppercase tracking-widest ${ROLE_STYLES[person.role]}`}
                >
                    {person.role}
                </p>

                <p className="mt-2 text-white/80 text-xs font-mono leading-relaxed truncate">
                    {person.title}
                </p>
            </div>
        </motion.div>
    );
});

/* -----------------------------------
   Reusable Grid Section
----------------------------------- */
const PanelGrid: React.FC<{
    title: string;
    people: typeof PEOPLE;
    emptyText: string;
    ctaLabel?: string;
    onCtaClick?: () => void;
}> = ({ title, people, emptyText, ctaLabel, onCtaClick }) => {
    return (
        <div className="mt-24">
            {/* HEADER */}
            <SectionHeader title={title} gifSrc="/gifs/turtwig.gif" flipGif />

            {/* CONTENT */}
            {people.length === 0 ? (
                <EmptyState
                    text={emptyText}
                    ctaLabel={ctaLabel}
                    onClick={onCtaClick}
                />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center gap-6 sm:gap-8 max-w-7xl mx-auto px-6 mt-16 mb-24">
                    {people.map((person) => (
                        <PersonCard key={person.id} person={person} />
                    ))}
                </div>
            )}
        </div>
    );
};

/* -----------------------------------
   Main Component
----------------------------------- */
const Panel = ({ onMentorClick, onJudgeClick }: PanelProps) => {
    const mentors = useMemo(
        () => PEOPLE.filter((p) => p.role === "mentor"),
        [],
    );
    const judges = useMemo(() => PEOPLE.filter((p) => p.role === "judge"), []);

    return (
        <section
            id="panel"
            className="w-full py-20 sm:py-32 text-white relative overflow-hidden"
        >
            <PanelGrid
                title="Mentors"
                people={mentors}
                emptyText="Announcing Soon..."
                ctaLabel={mentors.length === 0 ? "Call for Mentors" : undefined}
                onCtaClick={onMentorClick}
            />

            <PanelGrid
                title="Judges"
                people={judges}
                emptyText="Announcing Soon..."
                ctaLabel={judges.length === 0 ? "Call for Judges" : undefined}
                onCtaClick={onJudgeClick}
            />
        </section>
    );
};

export default Panel;
