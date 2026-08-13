import {
    motion,
    useScroll,
    useTransform,
    AnimatePresence,
} from "framer-motion";
import { useState, useRef, useEffect } from "react";

/* ---------- DESKTOP STRUCTURE ---------- */

const PRIMARY_ITEMS = [
    { label: "TIMELINE", id: "timeline" },
    { label: "PRIZES", id: "prizes" },
    { label: "PANEL", id: "panel" },
    { label: "SPONSORS", id: "sponsors" },
] as const;

const DROPDOWN_ITEMS = [
    { label: "GALLERY", id: "gallery" },
    { label: "REVIEWS", id: "reviews" },
] as const;

const MOBILE_ITEMS = [
    { label: "TIMELINE", id: "timeline" },
    { label: "PRIZES", id: "prizes" },
    { label: "PANEL", id: "panel" },
    { label: "SPONSORS", id: "sponsors" },
    { label: "GALLERY", id: "gallery" },
    { label: "REVIEWS", id: "reviews" },
    { label: "FAQs", id: "faqs" },
] as const;

const Navbar = () => {
    const { scrollY } = useScroll();

    const [mobileOpen, setMobileOpen] = useState(false);
    const [desktopDrop, setDesktopDrop] = useState(false);

    const dropRef = useRef<HTMLDivElement>(null);

    /* scroll animation */
    const scrollYTransform = useTransform(scrollY, [0, 200], [-40, 0]);
    const scrollOpacity = useTransform(scrollY, [80, 220], [0, 1]);

    const y = mobileOpen ? 0 : scrollYTransform;
    const opacity = mobileOpen ? 1 : scrollOpacity;

    /* close dropdown when clicking outside */
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (
                dropRef.current &&
                !dropRef.current.contains(e.target as Node)
            ) {
                setDesktopDrop(false);
            }
        };

        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    /* ---------- DEVFOLIO REDIRECT ---------- */
    const openDevfolio = () => {
        window.open("https://hacktonix-26.devfolio.co/", "_blank");
    };

    const scrollToId = (id: string) => {
        setMobileOpen(false);
        setDesktopDrop(false);

        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <>
            {/* ================= NAVBAR ================= */}
            <motion.nav
                style={{ y, opacity }}
                className="
          fixed z-50
          top-0 left-0 w-full
          xl:top-6 xl:left-1/2 xl:-translate-x-1/2 xl:w-[97%]
          h-17
          flex items-center justify-between
          px-6
          bg-black
          border-b-[5px] border-white
          xl:border-[5px]
          xl:shadow-[9px_9px_0_0_#06b6d4]
          text-white
        "
            >
                {/* ---------- LEFT BRAND ---------- */}
                <a
                    href="#about"
                    className="flex items-center gap-3 font-hero text-3xl xl:text-4xl uppercase"
                >
                    <img
                        src="/logo_hacktonix_small.jpg"
                        alt="Hacktonix Logo"
                        className="h-10 w-10 border-2 border-white bg-black"
                        loading="eager"
                        decoding="async"
                        fetchPriority="high"
                    />

                    <span>
                        Hacktonix
                        <span className="text-cyan-300 ml-1">5.0</span>
                    </span>
                </a>

                {/* ---------- DESKTOP NAV ---------- */}
                <div className="hidden xl:flex items-center gap-3 font-mono text-lg relative">
                    {/* REGISTER */}
                    <button
                        onClick={openDevfolio}
                        className="
              uppercase px-3 py-2 border-2
              bg-cyan-300 text-black border-white font-bold
              transition hover:scale-105
              shadow-[4px_4px_0_0_#000] cursor-pointer
            "
                    >
                        REGISTER
                    </button>

                    {PRIMARY_ITEMS.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToId(item.id)}
                            className="
                uppercase px-3 py-2 border-2 border-transparent
                text-white/70 hover:text-white hover:border-white cursor-pointer
              "
                        >
                            {item.label}
                        </button>
                    ))}

                    {/* ---- DROPDOWN ---- */}
                    <div
                        ref={dropRef}
                        className="relative"
                        onMouseEnter={() => setDesktopDrop(true)}
                        onMouseLeave={() => setDesktopDrop(false)}
                    >
                        <button
                            className="
                uppercase px-3 py-2 border-2 border-transparent
                text-white/70 hover:text-white hover:border-white cursor-pointer
              "
                        >
                            MORE ▾
                        </button>

                        <AnimatePresence>
                            {desktopDrop && (
                                <motion.div
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    className="
                    absolute top-full right-0 mt-2
                    bg-black border-4 border-white
                    shadow-[6px_6px_0_0_#06b6d4]
                    flex flex-col w-44 z-50
                  "
                                >
                                    {DROPDOWN_ITEMS.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => scrollToId(item.id)}
                                            className="
                        text-left px-4 py-3 uppercase
                        border-b-2 border-white last:border-0
                        hover:bg-cyan-300 hover:text-black cursor-pointer
                      "
                                        >
                                            {item.label}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* FAQs */}
                    <button
                        onClick={() => scrollToId("faqs")}
                        className="
              uppercase px-3 py-2 border-2 border-transparent
              text-white/70 hover:text-white hover:border-white cursor-pointer
            "
                    >
                        FAQs
                    </button>
                </div>

                {/* ---------- RIGHT LOGO ---------- */}
                <a
                    href="https://phnx.in"
                    target="_blank"
                    rel="noreferrer"
                    className="hidden xl:flex items-center"
                >
                    <img
                        src="/logo-text-small.png"
                        alt="PHOENIX"
                        className="w-24"
                        loading="eager"
                        decoding="async"
                    />
                </a>

                {/* ---------- HAMBURGER ---------- */}
                <button
                    onClick={() => setMobileOpen((v) => !v)}
                    className="xl:hidden flex flex-col gap-1 border-2 border-white px-3 py-2 cursor-pointer"
                >
                    <span className="w-6 h-0.5 bg-white" />
                    <span className="w-6 h-0.5 bg-white" />
                    <span className="w-6 h-0.5 bg-white" />
                </button>
            </motion.nav>

            {/* ================= MOBILE MENU ================= */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        className="
              fixed top-17 xl:hidden left-1/2 -translate-x-1/2
              z-40 w-[95%]
              bg-black border-[5px] border-white
              shadow-[9px_9px_0_0_#06b6d4]
              p-6 flex flex-col gap-4 text-white
            "
                    >
                        {/* REGISTER MOBILE */}
                        <button
                            onClick={openDevfolio}
                            className="
                border-2 border-cyan-300 text-cyan-300
                px-4 py-3 uppercase
                hover:bg-cyan-300 hover:text-black cursor-pointer
              "
                        >
                            REGISTER
                        </button>

                        {MOBILE_ITEMS.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToId(item.id)}
                                className="
                  text-left uppercase font-mono text-lg
                  border-2 border-white
                  px-4 py-3
                  hover:bg-cyan-300 hover:text-black cursor-pointer
                "
                            >
                                {item.label}
                            </button>
                        ))}

                        <img
                            src="/logo-text-small.png"
                            alt="PHOENIX"
                            className="w-28 mt-4"
                            loading="lazy"
                            decoding="async"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
