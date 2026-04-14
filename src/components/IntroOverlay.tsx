import { useRef, useState } from "react";

interface IntroOverlayProps {
  onEnter: () => void;
}

const IntroOverlay = ({ onEnter }: IntroOverlayProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [fading, setFading] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

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
    >
      {/* Background always painted first, no flash */}
      <div className="absolute inset-0" style={{ background: "#c5d8a4" }} />

      <video
        ref={videoRef}
        src="/introvideo2.mp4"
        playsInline
        muted
        preload="metadata" // ← "auto" causes Instagram browser loading spinner
        onCanPlayThrough={() => setVideoReady(true)} // ← only show when ready
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
          background: "transparent",
          // ← hide video element until it's actually ready to play
          opacity: videoReady ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Tap prompt dots */}
      <div
        className="absolute inset-0 flex items-end justify-center pointer-events-none"
        style={{
          paddingBottom: "8vh",
          opacity: started ? 0 : 1,
          transition: "opacity 0.8s ease",
        }}
      >
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

      {/* Fade-out overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "#fff",
          opacity: fading ? 1 : 0,
          transition: fading ? "opacity 0.4s ease" : "none",
        }}
      />

      <style>{`
        @keyframes dotBounce {
          0%, 100% { transform: translateY(0);   opacity: 0.3; }
          50%       { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default IntroOverlay;