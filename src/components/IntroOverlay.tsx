import { useRef, useState } from "react";

interface IntroOverlayProps {
  onEnter: () => void;
}

const IntroOverlay = ({ onEnter }: IntroOverlayProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [fading, setFading] = useState(false);

  const handleStart = () => {
    if (started) return;
    setStarted(true);
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = 0.6;
    video.play().catch(() => {});
  };

  const handleVideoEnd = () => {
    setFading(true);
    setTimeout(() => onEnter(), 400);
  };

  return (
    <div
      onClick={handleStart}
      className="fixed inset-0 z-50 cursor-pointer overflow-hidden"
      style={{ background: "#000" }}
    >

      {/* Cover poster — shown before tap, hides once video starts */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/coverimage 2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: started ? 0 : 1,
          transition: "opacity 0.6s ease",
          zIndex: 1,
        }}
      />

      {/* Video */}
      <video
        ref={videoRef}
        src="/envlopintro.mp4"
        playsInline
        preload="auto"
        muted
        onEnded={handleVideoEnd}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          zIndex: 0,
        }}
      />

      {/* Tap hint dots — visible before tap */}
      <div
        className="absolute inset-0 flex items-end justify-center pointer-events-none"
        style={{
          paddingBottom: "8vh",
          opacity: started ? 0 : 1,
          transition: "opacity 0.8s ease",
          zIndex: 2,
        }}
      >
        {/* Tap to open label */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "13px",
              letterSpacing: "0.3em",
              color: "rgba(74,103,65,0.85)",
              animation: "fadePulse 2.5s ease-in-out infinite",
            }}
          >
            tap to open
          </p>

          <div style={{ display: "flex", gap: 8 }}>
            {[0, 0.25, 0.5].map((delay, i) => (
              <div
                key={i}
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "rgba(74,103,65,0.6)",
                  animation: `dotBounce 1.4s ease-in-out ${delay}s infinite`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* White fade out at end */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "#fff",
          opacity: fading ? 1 : 0,
          transition: fading ? "opacity 0.4s ease" : "none",
          zIndex: 3,
        }}
      />

      <style>{`
        @keyframes dotBounce {
          0%, 100% { transform: translateY(0);    opacity: 0.3; }
          50%       { transform: translateY(-6px); opacity: 1;   }
        }
        @keyframes fadePulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 1;   }
        }
      `}</style>
    </div>
  );
};

export default IntroOverlay;