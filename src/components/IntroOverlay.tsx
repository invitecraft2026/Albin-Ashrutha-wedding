import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import floralTop from "/floral-corner-top.png";
import floralBottom from "/floral-corner-bottom.png";

interface WeddingIntroProps {
  groomName?: string;
  brideName?: string;
  onEnter: () => void;
}

const Petal = ({ delay }: { delay: number }) => {
  const left = Math.random() * 100;
  const duration = 6 + Math.random() * 6;
  const size = 10 + Math.random() * 8;
  const symbols = ["✿", "❀", "✾", "🌸"];
  const symbol = symbols[Math.floor(Math.random() * symbols.length)];

  return (
    <motion.span
      className="absolute top-0 pointer-events-none select-none"
      style={{ left: `${left}%`, fontSize: size }}
      initial={{ y: -20, opacity: 0, rotate: 0 }}
      animate={{ y: 620, opacity: [0, 0.6, 0.5, 0], rotate: 720 }}
      transition={{ duration, delay, ease: "linear", repeat: Infinity, repeatDelay: Math.random() * 4 }}
    >
      {symbol}
    </motion.span>
  );
};

const Sparkle = ({ top, left, delay }: { top: string; left: string; delay: number }) => (
  <motion.div
    className="absolute pointer-events-none w-2 h-2"
    style={{ top, left }}
    animate={{ scale: [0, 1, 0], rotate: [0, 180, 360], opacity: [0, 1, 0] }}
    transition={{ duration: 3, delay, repeat: Infinity, ease: "easeInOut" }}
  >
    <span
      className="absolute inset-0"
      style={{
        background: "#c9a882",
        clipPath: "polygon(50% 0%, 52% 48%, 100% 50%, 52% 52%, 50% 100%, 48% 52%, 0% 50%, 48% 48%)",
      }}
    />
  </motion.div>
);

const IntroOverlay = ({
  groomName = "Albin",
  brideName = "Ashrutha",
  onEnter,
}: WeddingIntroProps) => {
  const [petals] = useState(() => Array.from({ length: 12 }, (_, i) => i));

  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center overflow-hidden"
      style={{ background: "hsl(var(--background))", cursor: "pointer" }}
      exit={{ opacity: 0, scale: 1.06 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 1, 1] }}
      onClick={onEnter}
    >
      {/* Falling petals */}
      {petals.map((i) => (
        <Petal key={i} delay={i * 0.5} />
      ))}

      {/* Sparkles */}
      <Sparkle top="22%" left="18%" delay={0} />
      <Sparkle top="35%" left="78%" delay={0.8} />
      <Sparkle top="65%" left="26%" delay={1.6} />
      <Sparkle top="70%" left="82%" delay={2.1} />
      <Sparkle top="15%" left="68%" delay={0.4} />

      {/* Pulse rings */}
      {[200, 280].map((size, i) => (
        <motion.div
          key={size}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: size,
            height: size,
            border: "0.5px solid rgba(201,168,130,0.2)",
            top: "50%",
            left: "50%",
            marginTop: -size / 2,
            marginLeft: -size / 2,
          }}
          animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 4, delay: i * 0.6, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Top-left floral */}
      <motion.img
        src={floralTop}
        alt=""
        className="absolute top-0 left-0 w-48 sm:w-64 md:w-80 pointer-events-none"
        initial={{ opacity: 0, scale: 0.85, x: -20, y: -20 }}
        animate={{
          opacity: 0.85,
          scale: [1, 1.02, 1],
          x: 0,
          y: 0,
          rotate: [0, 1, 0],
        }}
        transition={{
          opacity: { duration: 1.8, ease: "easeOut" },
          x: { duration: 1.5, ease: "easeOut" },
          y: { duration: 1.5, ease: "easeOut" },
          scale: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 },
          rotate: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 },
        }}
      />

      {/* Bottom-right floral */}
      <motion.img
        src={floralBottom}
        alt=""
        className="absolute bottom-0 right-0 w-48 sm:w-64 md:w-80 pointer-events-none"
        initial={{ opacity: 0, scale: 0.85, x: 20, y: 20 }}
        animate={{
          opacity: 0.85,
          scale: [1, 1.02, 1],
          x: 0,
          y: 0,
          rotate: [0, -1, 0],
        }}
        transition={{
          opacity: { duration: 1.8, ease: "easeOut", delay: 0.3 },
          x: { duration: 1.5, ease: "easeOut", delay: 0.3 },
          y: { duration: 1.5, ease: "easeOut", delay: 0.3 },
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 },
          rotate: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 },
        }}
      />

      {/* Center content — floats gently */}
      <motion.div
        className="relative z-20 text-center px-6 max-w-md"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Eyebrow */}
        <motion.p
          className="font-body text-[10px] tracking-[0.45em] uppercase mb-8"
          style={{ color: "#9b8c7e", fontFamily: "'Jost', sans-serif", fontWeight: 200 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
        >
          Together with their families
        </motion.p>

        {/* Groom name */}
        <motion.h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontStyle:"italic",
            fontSize: "clamp(3.5rem, 9vw, 6rem)",
            lineHeight: 1.05,
            color: "#3d2c20",
            letterSpacing: "0.02em",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {groomName}
        </motion.h1>

        {/* Divider */}
        <motion.div
          className="flex items-center justify-center gap-3 my-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.div
            className="h-px w-16"
            style={{ background: "linear-gradient(90deg, transparent, #c9a882, transparent)" }}
          />
          <motion.div
            className="w-[5px] h-[5px]"
            style={{ background: "#c9a882", transform: "rotate(45deg)" }}
            animate={{ opacity: [0.55, 0.85, 0.55] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="h-px w-16"
            style={{ background: "linear-gradient(90deg, transparent, #c9a882, transparent)" }}
          />
        </motion.div>

        {/* Bride name */}
        <motion.h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontStyle:"italic",
            fontSize: "clamp(3.5rem, 9vw, 6rem)",
            lineHeight: 1.05,
            color: "#3d2c20",
            letterSpacing: "0.02em",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {brideName}
        </motion.h1>

        {/* Tap hint */}
        <motion.p
          className="mt-10 text-[9.5px] tracking-[0.5em] uppercase"
          style={{ color: "#c9a882", fontFamily: "'Jost', sans-serif", fontWeight: 200 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.35, 0.75, 0.35] }}
          transition={{ delay: 2.8, duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          Tap anywhere to open
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default IntroOverlay;