import { useState, useRef } from "react";
import IntroOverlay from "@/components/IntroOverlay";
import VideoHero from "@/components/VideoHero";
import Countdown from "@/components/Countdown";
import ScratchReveal from "@/components/ScratchReveal";
import Venue from "@/components/Venue";
import Footer from "@/components/Footer";
import MusicPlayer, { type MusicPlayerHandle } from "@/components/MusicPlayer";
import Gallery from "@/components/Gallery";

const ScrollHint = () => (
  <div className="flex flex-col items-center justify-center py-6 gap-2 animate-fade-up">
    {/* Scroll label */}
    <p className="font-serif text-xs uppercase tracking-[0.3em] text-amber-700/60">
      scroll
    </p>

    {/* Animated bouncing arrow */}
    <div className="flex flex-col items-center gap-[3px] animate-bounce">
      <span
        className="block w-[1px] h-6 bg-gradient-to-b from-transparent to-amber-700/50"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4 text-amber-700/60"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  </div>
);

const Index = () => {
  const [entered, setEntered] = useState(false);
  const musicRef = useRef<MusicPlayerHandle>(null);

  const handleEnter = () => {
    setEntered(true);
    setTimeout(() => musicRef.current?.play(), 100);
  };

  return (
    <div className="min-h-screen">
      {!entered && <IntroOverlay onEnter={handleEnter} />}

      {entered && (
        <>
          <div className="animate-fade-up">
            <VideoHero />

            {/* Scroll hint sits right below the hero */}
            <ScrollHint />

            <Countdown />
            <ScratchReveal />
            {/* <Gallery /> */}
            <Venue />
            <Footer />
          </div>

          <MusicPlayer ref={musicRef} />
        </>
      )}
    </div>
  );
};

export default Index;