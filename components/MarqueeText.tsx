type MarqueeTextProps = {
  text: string;
};

export default function MarqueeText({ text }: MarqueeTextProps) {
  // Repeat text enough times that it fills the viewport at any width
  const repeated = Array(8).fill(text).join("");

  return (
    <div className="marquee w-full">
      <span className="marquee-inner text-5xl md:text-7xl font-light text-[var(--color-primary)]"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {repeated}{repeated}
      </span>
    </div>
  );
}
