import { useEffect, useRef, useState } from "react";
import FloralDivider from "./FloralDivider";

const photos = [
  { src: "/gallery-1.jpg", alt: "Wedding photo 1", span: "col-span-2 row-span-2" },
  { src: "/gallery-2.jpg", alt: "Wedding photo 2", span: "col-span-1 row-span-1" },
  { src: "/gallery-3.jpg", alt: "Wedding photo 3", span: "col-span-1 row-span-1" },
  { src: "/gallery-4.jpg", alt: "Wedding photo 4", span: "col-span-1 row-span-1" },
  { src: "/gallery-5.jpg", alt: "Wedding photo 5", span: "col-span-1 row-span-1" },
];

const Gallery = () => {
  const [visible, setVisible] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((prev) => prev !== null ? (prev + 1) % photos.length : null);
      if (e.key === "ArrowLeft") setLightbox((prev) => prev !== null ? (prev - 1 + photos.length) % photos.length : null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const slideStyle = (delay: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.97)",
    transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
  });

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 relative overflow-hidden"
      style={{
        background: "radial-gradient(circle at top, #eef5e6 0%, #dfead2 40%, #c5d8a4 100%)",
      }}
    >
      {/* Decorative background blobs */}
      <div
        className="absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-20 pointer-events-none"
        style={{ background: "#6B8F4E", filter: "blur(60px)" }}
      />
      <div
        className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full opacity-20 pointer-events-none"
        style={{ background: "#C9A84C", filter: "blur(60px)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* Header */}
        <div
          className="text-center mb-12"
          style={slideStyle(0)}
        >
          <p
            className="uppercase mb-3"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.7rem",
              letterSpacing: "0.3em",
              color: "#6B8F4E99",
            }}
          >
            captured moments
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#4a6741",
            }}
          >
            Our Gallery
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-12" style={{ background: "#C9A84C66" }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#C9A84C99" }} />
            <div className="h-px w-12" style={{ background: "#C9A84C66" }} />
          </div>
        </div>

        <FloralDivider className="mb-10" />

        {/* Mosaic Grid */}
        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "auto",
          }}
        >
          {/* Photo 1 — large, spans 2 cols & 2 rows */}
          <div
            className="relative overflow-hidden rounded-2xl cursor-pointer group"
            style={{
              gridColumn: "1 / 3",
              gridRow: "1 / 3",
              aspectRatio: "1 / 1",
              ...slideStyle(0.1),
              boxShadow: "0 12px 40px rgba(74,103,65,0.15)",
            }}
            onClick={() => setLightbox(0)}
          >
            <img
              src={photos[0].src}
              alt={photos[0].alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
              style={{ background: "rgba(74,103,65,0.25)" }}
            >
              <span style={{ color: "#FFF9F0", fontSize: "2rem" }}>✦</span>
            </div>
          </div>

          {/* Photos 2–5 — small tiles */}
          {photos.slice(1).map((photo, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-2xl cursor-pointer group"
              style={{
                aspectRatio: "1 / 1",
                ...slideStyle(0.2 + i * 0.1),
                boxShadow: "0 8px 24px rgba(74,103,65,0.12)",
              }}
              onClick={() => setLightbox(i + 1)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                style={{ background: "rgba(74,103,65,0.25)" }}
              >
                <span style={{ color: "#FFF9F0", fontSize: "1.4rem" }}>✦</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Divider */}
        <div
          className="mt-14"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 1s ease 0.7s",
          }}
        >
          <FloralDivider />
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.85)" }}
          onClick={() => setLightbox(null)}
        >
          {/* Prev */}
          <button
            className="absolute left-4 sm:left-8 text-3xl z-10 transition-transform hover:scale-110"
            style={{ color: "#C9A84C" }}
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((prev) => prev !== null ? (prev - 1 + photos.length) % photos.length : null);
            }}
          >
            ‹
          </button>

          <div
            className="relative max-w-3xl w-full rounded-2xl overflow-hidden"
            style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.5)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[lightbox].src}
              alt={photos[lightbox].alt}
              className="w-full h-auto object-contain"
              style={{ maxHeight: "80vh" }}
            />

            {/* Caption bar */}
            <div
              className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-5 py-3"
              style={{ background: "rgba(0,0,0,0.5)" }}
            >
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  color: "#FFF9F0",
                  fontSize: "1rem",
                }}
              >
                {lightbox + 1} / {photos.length}
              </span>
              <span style={{ color: "#C9A84C", fontSize: "1rem" }}>
                Albin ✦ Ashrutha
              </span>
            </div>
          </div>

          {/* Next */}
          <button
            className="absolute right-4 sm:right-8 text-3xl z-10 transition-transform hover:scale-110"
            style={{ color: "#C9A84C" }}
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((prev) => prev !== null ? (prev + 1) % photos.length : null);
            }}
          >
            ›
          </button>

          {/* Close */}
          <button
            className="absolute top-4 right-4 text-xl transition-opacity hover:opacity-70"
            style={{ color: "#FFF9F0" }}
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>
        </div>
      )}
    </section>
  );
};

export default Gallery;