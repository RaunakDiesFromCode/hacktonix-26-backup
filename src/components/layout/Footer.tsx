const Footer = () => {
    return (
        <footer>
            <div className="text-white/50 font-hero md:text-9xl text-5xl text-center">
                SEE YOU AT PHOENIX
            </div>
            <div className="w-full bg-black text-white border-t-4 border-white">
                {/* LINKTREE CTA STRIP */}
                <a
                    href="https://linktr.ee/phoenix.fiem"
                    target="_blank"
                    rel="noreferrer"
                    className="
        block w-full
        bg-cyan-300 text-black
        border-b-4 border-white
        text-center
        font-hero uppercase tracking-widest
        text-lg sm:text-xl md:text-2xl py-4 sm:py-6
        hover:bg-white
        transition-colors
    "
                >
                    linktr.ee/phoenix.fiem
                </a>

                {/* MAIN FOOTER */}
                <div
                    className="
        max-w-7xl mx-auto
        px-4 sm:px-6
        py-14 sm:py-20
        grid
        grid-cols-1 md:grid-cols-3
        gap-10 md:gap-16
    "
                >
                    {/* LEFT — BRAND */}
                    <div>
                        <img
                            src="/logo_hacktonix_medium.jpg"
                            alt="Hacktonix Logo"
                            className="h-20"
                            loading="lazy"
                            decoding="async"
                        />
                        <h2
                            className="
        font-hero
        text-4xl sm:text-5xl lg:text-6xl
        uppercase tracking-tight
        drop-shadow-[4px_4px_0_#06b6d4]
    "
                        >
                            Hacktonix
                        </h2>
                        <p className="mt-4 text-white/70 font-mono text-sm leading-relaxed max-w-sm">
                            Phoenix 2026 proudly presents HACKTONIX 5.0 — a
                            24-hour in-person hackathon built for
                            problem-solvers, builders, and people who enjoy
                            controlled chaos.
                        </p>
                    </div>

                    {/* CENTER — QUICK LINKS */}
                    <div>
                        <h3 className="uppercase font-extrabold tracking-widest mb-6 text-white">
                            Navigate
                        </h3>
                        <ul className="space-y-4 font-mono text-sm">
                            {[
                                ["About", "#about"],
                                ["Timeline", "#timeline"],
                                ["Prizes", "#prizes"],
                                ["Panel", "#panel"],
                                ["Sponsors", "#sponsors"],
                                ["FAQs", "#faqs"],
                            ].map(([label, href]) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        className="text-white/60 hover:text-cyan-300 transition-colors"
                                    >
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* RIGHT — CONTACT */}
                    <div>
                        <h3 className="uppercase font-extrabold tracking-widest mb-6 text-white">
                            Contact
                        </h3>
                        <div className="space-y-4 font-mono text-sm text-white/70">
                            <p>
                                📍 FIEM Sonarpur
                                <br />
                                Kolkata, India
                            </p>
                            <p>
                                ✉️{" "}
                                <a
                                    href="mailto:phnx@teamfuture.in"
                                    className="hover:text-cyan-300 transition-colors"
                                >
                                    phnx@teamfuture.in
                                </a>
                            </p>
                            <p>
                                🌐{" "}
                                <a
                                    href="https://phnx.in"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:text-cyan-300 transition-colors"
                                >
                                    phnx.in
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

                {/* BOTTOM STRIP */}
                <div
                    className="
        border-t-4 border-white
        px-4 sm:px-6
        py-4 sm:py-6
        flex flex-col md:flex-row
        gap-2 md:gap-0
        justify-between items-center
        text-sm font-mono text-white/60
        text-center md:text-left
    "
                >
                    <span>© 2026 Phoenix. All rights reserved.</span>
                    <span className="mt-2 md:mt-0">
                        Built By{" "}
                        <span>
                            <a
                                href="https://github.com/Xplorica-FIEM"
                                target="_blank"
                                rel="noreferrer"
                                className="text-teal-400"
                            >
                                XplOriCa Tech Team
                            </a>
                        </span>
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
