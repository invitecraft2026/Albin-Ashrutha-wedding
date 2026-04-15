const Footer = () => (
  <footer className="py-16 px-6 bg-sage text-cream text-center">
    {/* Floral wreath with monogram */}
    <div className="mb-8">
      <svg width="120" height="120" viewBox="0 0 120 120" className="mx-auto">
        <circle cx="60" cy="60" r="45" fill="none" stroke="hsl(var(--gold))" strokeWidth="1" opacity="0.5" />
        <circle cx="60" cy="60" r="50" fill="none" stroke="hsl(var(--pistachio))" strokeWidth="0.5" opacity="0.4" />
        {/* Leaf decorations */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <ellipse
            key={angle}
            cx="60"
            cy="15"
            rx="4"
            ry="10"
            fill="hsl(var(--pistachio))"
            opacity="0.5"
            transform={`rotate(${angle} 60 60)`}
          />
        ))}
        {/* Monogram */}
       <text
  x="60"
  y="52"
  textAnchor="middle"
  fontFamily="'Cormorant Garamond', 'Garamond', serif"
  fontSize="20"
  fontWeight="600"
  letterSpacing="2"
  fill="hsl(var(--gold))"
>
  A
</text>

<text
  x="60"
  y="67"
  textAnchor="middle"
  fontFamily="'Cormorant Garamond', 'Garamond', serif"
  fontSize="11"
  letterSpacing="3"
  fill="hsl(var(--cream))"
>
  &amp;
</text>

<text
  x="60"
  y="82"
  textAnchor="middle"
  fontFamily="'Cormorant Garamond', 'Garamond', serif"
  fontSize="20"
  fontWeight="600"
  letterSpacing="2"
  fill="hsl(var(--gold))"
>
  A
</text>
      </svg>
    </div>

    <p className="font-display italic text-xl md:text-2xl text-cream/90 mb-4">
     Therefore what god has joined together,let no one seperate-Mark 10:9
    </p>

    <p className="font-body text-cream/60 text-sm tracking-[0.3em]">
      16 · 06 · 2026
    </p>
  </footer>
);

export default Footer;
