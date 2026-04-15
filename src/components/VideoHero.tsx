import { useEffect, useRef } from "react";
import CornerFlorals from "./CornerFlorals";
import FloralDivider from "./FloralDivider";

const VideoHero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">

      {/* 🎬 Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover brightness-[0.55] saturate-[1.15]"
      >
        <source src="/wedding-animated-video.mp4" type="video/mp4" />
      </video>

      {/* 🌫 Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-sage/40" />

      <CornerFlorals />

      {/* 🌿 Content */}
      <div className="relative z-10 text-center px-6">
        <p
          className="animate-slide-up text-cream/85 mb-6 uppercase"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "clamp(0.7rem, 1.5vw, 0.9rem)",
            letterSpacing: "0.35em",
            animationDelay: "0.2s",
          }}
        >
          We joyfully invite you to celebrate our
        </p>

        <h2
          className="animate-slide-up text-cream mb-6 leading-tight"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
            letterSpacing: "0.04em",
            textShadow: "0 6px 25px rgba(0,0,0,0.4)",
            animationDelay: "0.5s",
          }}
        >
          Wedding
        </h2>

        <div
          className="animate-slide-up mb-8"
          style={{ animationDelay: "0.8s" }}
        >
          <FloralDivider />
        </div>

        <div
          className="animate-slide-up flex items-center justify-center gap-4 md:gap-8"
          style={{ animationDelay: "1.1s" }}
        >
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "#FFF9F0",
              textShadow: "0 4px 15px rgba(0,0,0,0.35)",
            }}
          >
            Albin
          </span>

          <span
            className="animate-float"
            style={{ color: "#C9A84C", fontSize: "1.6rem" }}
          >
            ✦
          </span>

          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "#FFF9F0",
              textShadow: "0 4px 15px rgba(0,0,0,0.35)",
            }}
          >
            Ashrutha
          </span>
        </div>
      </div>

      {/* ✨ Scroll Hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">

        {/* Ornamental top dots */}
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          {[0, 0.2, 0.4].map((delay, i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: i === 1 ? "5px" : "3px",
                height: i === 1 ? "5px" : "3px",
                borderRadius: "50%",
                background: "rgba(201,168,76,0.8)",
                animation: `dotPulse 2s ease-in-out ${delay}s infinite`,
              }}
            />
          ))}
        </div>

        {/* SCROLL label */}
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "11px",
            letterSpacing: "0.4em",
            color: "rgba(255,249,240,0.75)",
            animation: "fadePulse 3s ease-in-out infinite",
          }}
        >
          scroll
        </p>

        {/* Elegant mouse icon */}
        <div
          style={{
            width: "22px",
            height: "36px",
            border: "1.5px solid rgba(201,168,76,0.6)",
            borderRadius: "12px",
            display: "flex",
            justifyContent: "center",
            paddingTop: "6px",
            animation: "fadePulse 3s ease-in-out infinite",
          }}
        >
          <div
            style={{
              width: "2px",
              height: "7px",
              borderRadius: "2px",
              background: "rgba(201,168,76,0.9)",
              animation: "scrollWheel 2s ease-in-out infinite",
            }}
          />
        </div>

        {/* Triple cascading chevrons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0px", marginTop: "-2px" }}>
          {[0, 0.25, 0.5].map((delay, i) => (
            <svg
              key={i}
              width="18"
              height="10"
              viewBox="0 0 24 12"
              fill="none"
              stroke="#C9A84C"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                animation: `chevronCascade 2s ease-in-out ${delay}s infinite`,
                opacity: 0,
              }}
            >
              <path d="M4 2l8 8 8-8" />
            </svg>
          ))}
        </div>

        {/* Bottom ornament */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            marginTop: "2px",
            animation: "fadePulse 3s ease-in-out 0.5s infinite",
          }}
        >
          <div style={{ width: "20px", height: "1px", background: "rgba(201,168,76,0.4)" }} />
          <span style={{ color: "rgba(201,168,76,0.7)", fontSize: "8px" }}>✦</span>
          <div style={{ width: "20px", height: "1px", background: "rgba(201,168,76,0.4)" }} />
        </div>

      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes fadePulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }

        @keyframes scrollWheel {
          0%   { transform: translateY(0);   opacity: 1; }
          60%  { transform: translateY(8px); opacity: 0; }
          61%  { transform: translateY(0);   opacity: 0; }
          100% { transform: translateY(0);   opacity: 1; }
        }

        @keyframes chevronCascade {
          0%   { opacity: 0;   transform: translateY(-4px); }
          30%  { opacity: 0.9; }
          70%  { opacity: 0.5; transform: translateY(4px); }
          100% { opacity: 0;   transform: translateY(8px); }
        }

        @keyframes dotPulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50%       { opacity: 1;   transform: scale(1.2); }
        }
      `}</style>
    </section>
  );
};

export default VideoHero;