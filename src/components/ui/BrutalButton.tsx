import React from "react";
import { motion } from "framer-motion";
import type { Variants, MotionStyle } from "framer-motion";
import clsx from "clsx";

type BrutalButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    href?: string;
    variant?: "primary" | "discord";
    className?: string;
    variants?: Variants;
    style?: MotionStyle;
    type?: "button" | "submit";
    disabled?: boolean;
    dontCollapse?: boolean; // 👈 NEW
};

const BASE_CLASSES = `
    pointer-events-auto
    uppercase font-hero tracking-widest
    text-2xl md:text-3xl
    w-fit
    border-4
    transition-all duration-150
    z-30
`;

const VARIANT_CLASSES = {
    primary: `
        px-10 py-5
        bg-black text-cyan-300
        border-white
        shadow-[8px_8px_0_0_#06b6d4]
        hover:translate-x-1 hover:translate-y-1
        hover:shadow-[4px_4px_0_0_#06b6d4]
        active:translate-x-2 active:translate-y-2
        active:shadow-[0_0_0_0_#06b6d4]
    `,
    discord: `
        px-3 py-2
        bg-[#5865F2] text-white
        border-white
        shadow-[8px_8px_0_0_#000000]
        hover:shadow-[4px_4px_0_0_#000000]
        flex items-center gap-3
    `,
};

const sharedMotion = {
    whileHover: {
        translateY: -1,
        transition: {
            type: "spring" as const,
            stiffness: 500,
            damping: 30,
        },
    },
    whileTap: {
        translateY: -2,
        transition: {
            duration: 0.05,
        },
    },
};

const BrutalButton = ({
    children,
    onClick,
    href,
    variant = "primary",
    className,
    variants,
    style,
    type = "button",
    disabled = false,
    dontCollapse = false, // 👈 default false
}: BrutalButtonProps) => {
    const classes = clsx(
        BASE_CLASSES,
        VARIANT_CLASSES[variant],
        dontCollapse && "[&_span]:!inline [&_span]:!opacity-100",
        className,
    );

    if (href) {
        return (
            <motion.a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                variants={variants}
                style={style}
                className={classes}
                {...sharedMotion}
            >
                {children}
            </motion.a>
        );
    }

    return (
        <motion.button
            type={type ?? "button"}
            onClick={onClick}
            disabled={disabled}
            variants={variants}
            style={style}
            className={clsx(
                classes,
                disabled && "opacity-40 cursor-not-allowed",
            )}
            {...(!disabled ? sharedMotion : {})}
        >
            {children}
        </motion.button>
    );
};

export default BrutalButton;
