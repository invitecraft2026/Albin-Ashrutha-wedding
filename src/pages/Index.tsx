import { useState, useRef } from "react";
import IntroOverlay from "@/components/IntroOverlay";
import VideoHero from "@/components/VideoHero";
import Countdown from "@/components/Countdown";
import ScratchReveal from "@/components/ScratchReveal";
import Venue from "@/components/Venue";
import Footer from "@/components/Footer";
import MusicPlayer, { type MusicPlayerHandle } from "@/components/MusicPlayer";
// import Gallery from "@/components/Gallery";

const Index = () => {
  const [entered, setEntered] = useState(false);
  const musicRef = useRef<MusicPlayerHandle>(null);

  const handleEnter = () => {
    setEntered(true);

    // play music after entering
    setTimeout(() => {
      musicRef.current?.play();
    }, 300);
  };

  return (
    <div className="min-h-screen relative">

      {/* INTRO OVERLAY */}
      {!entered && <IntroOverlay onEnter={handleEnter} />}

      {/* MAIN WEBSITE */}
      {entered && (
        <>
          <div className="animate-fade-up">
            <VideoHero />
            <Countdown />
            <ScratchReveal />
            {/* <Gallery /> */}
            <Venue />
            <Footer />
          </div>

          {/* MUSIC */}
          <MusicPlayer ref={musicRef} />
        </>
      )}
    </div>
  );
};

export default Index;