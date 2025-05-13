import { useState, useRef, useEffect } from "react";

export default function GlowingTextEffect() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 100);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div
      ref={containerRef}
      className="h-[28rem] md:h-[22.9rem] lg:flex items-center justify-center font-raleway lg:mt-2 mx-4 lg:gap-4 !cursor-default"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: "default" }}
    >
      {["I", "M", "A", "G", "I", "N", "U", "M"].map((char, index) => {
        const letterRef = useRef<HTMLDivElement | null>(null);
        const [glowIntensity, setGlowIntensity] = useState(0);

        useEffect(() => {
          if (isHovering && letterRef.current && containerRef.current) {
            const letterRect = letterRef.current.getBoundingClientRect();
            const containerRect = containerRef.current.getBoundingClientRect();

            const letterX =
              letterRect.left - containerRect.left + letterRect.width / 2;
            const letterY =
              letterRect.top - containerRect.top + letterRect.height / 2;

            const distance = Math.sqrt(
              Math.pow(mousePosition.x - letterX, 2) +
                Math.pow(mousePosition.y - letterY, 2)
            );

            const maxDistance = 150;
            let intensity = 0;
            if (distance < maxDistance) {
              intensity = 1 - distance / maxDistance;
              intensity = Math.pow(intensity, 2);
            }

            setGlowIntensity(intensity);
          } else {
            setGlowIntensity(0);
          }
        }, [mousePosition, isHovering]);

        return (
          <div
            key={index}
            ref={letterRef}
            className="relative inline-block text-5xl md:text-6xl lg:text-[11vw] font-black font-['Geist'] px-2 !cursor-default"
            style={{ cursor: "default" }}
          >
            <span
              className="text-transparent bg-clip-text bg-gradient-to-b from-[#0b75db] to-[#01284f] tracking-wide block !cursor-default"
              style={{
                cursor: "default",
                WebkitTextStroke: `${1 + glowIntensity}px rgba(255,255,255,${
                  0.3 + glowIntensity * 0.7
                })`,
                transition: "all 0.1s ease",
                filter: `drop-shadow(0 0 ${
                  glowIntensity * 5
                }px rgba(255,255,255,${glowIntensity * 0.8}))`,
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(50px)",
                transitionDelay: `${index * 0.15}s`,
                transitionProperty: "opacity, transform",
                transitionDuration: "0.6s",
                transitionTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)",
              }}
            >
              {char}
            </span>
          </div>
        );
      })}
    </div>
  );
}
