import { useScroll, useTransform } from "framer-motion";
import BrutalButton from "../ui/BrutalButton";

const DiscordFloatingButton = () => {
    const { scrollY } = useScroll();

    const opacity = useTransform(scrollY, [200, 400], [0, 1]);
    const scale = useTransform(scrollY, [200, 400], [0.85, 1]);
    const y = useTransform(scrollY, [200, 400], [20, 0]);

    return (
        <BrutalButton
            href="https://go.phnx.in/discord"
            variant="discord"
            style={{ opacity, scale, y }}
            className="fixed bottom-16 right-8 z-50"
        >
            <img
                src="/discord.svg"
                alt="Discord"
                className="h-6 w-6 object-contain bg-white p-1"
                loading="lazy"
                decoding="async"
            />
            <span className="hidden sm:inline">Join Discord</span>
        </BrutalButton>
    );
};

export default DiscordFloatingButton;
