import { useState } from "react";
import Hero from "./components/sections/Hero";
import Navbar from "./components/layout/Navbar";
import Timeline from "./components/sections/Timeline";
import Prizes from "./components/sections/Prizes";
import Panel from "./components/sections/Panel";
import Sponsors from "./components/sections/Sponsors";
import Faq from "./components/sections/Faq";
import Footer from "./components/layout/Footer";
import DiscordFloatingButton from "./components/layout/DiscordFloatingButton";
import Gallery from "./components/sections/Gallery";
import { motion, type Variants } from "framer-motion";
import BrutalButton from "./components/ui/BrutalButton";
import Review from "./components/sections/Reviews";
import MentorApplyModal from "./components/ui/MentorApplyModal";
import JudgeApplyModal from "./components/ui/JudgeApplyModal";
import CommunityPartners from "./components/sections/CommunityPartners";


const brutalCTA: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 600,
      damping: 26,
    },
  },
};

const easeSnap = [0.2, 0, 0, 1] as const;

const App = () => {
  const [mentorOpen, setMentorOpen] = useState(false);
  const [judgeOpen, setJudgeOpen] = useState(false);

  /* ---------- DEVFOLIO REDIRECT ---------- */
  const openDevfolio = () => {
    window.open("https://hacktonix-26.devfolio.co/", "_blank");
  };

  return (
    <div className="bg-cyan-950">
      {/* NAVBAR */}
      <Navbar />

      <Hero />
      <Timeline />
      <Prizes />

      <Panel
        onMentorClick={() => setMentorOpen(true)}
        onJudgeClick={() => setJudgeOpen(true)}
      />

      <Sponsors />
      <CommunityPartners/>
      <Gallery />
      <Review />

      {/* CTA */}
      <div className="flex flex-col w-full gap-3 mt-16 sm:mt-24 items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: easeSnap }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white"
        >
          Are you still thinking?
        </motion.div>

        <BrutalButton
          onClick={openDevfolio}
          variants={brutalCTA}
          variant="primary"
        >
          Just Register Now!
        </BrutalButton>
      </div>

      <Faq />
      <Footer />
      <DiscordFloatingButton />

      {/* MODALS */}
      <MentorApplyModal
        open={mentorOpen}
        onClose={() => setMentorOpen(false)}
      />

      <JudgeApplyModal
        open={judgeOpen}
        onClose={() => setJudgeOpen(false)}
      />
    </div>
  );
};

export default App;
