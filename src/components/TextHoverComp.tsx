import { useState, useRef, useEffect } from "react";

export default function GlowingTextEffect() {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Trigger entrance animation after component mounts
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 100);
  }, []);

  // Track mouse position over the entire container
  const handleMouseMove = (e) => {
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
      className="h-[28rem] md:h-[22.9rem] lg:flex items-center justify-center font-raleway lg:mt-2 mx-4 lg:gap-4"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {["I", "M", "A", "G", "I", "N", "U", "M"].map((char, index) => {
        // Create a reference for each letter to get its position
        const letterRef = useRef(null);
        const [glowIntensity, setGlowIntensity] = useState(0);

        // Calculate glow intensity based on distance from mouse
        useEffect(() => {
          if (isHovering && letterRef.current) {
            const letterRect = letterRef.current.getBoundingClientRect();
            const containerRect = containerRef.current.getBoundingClientRect();

            // Get letter position relative to container
            const letterX =
              letterRect.left - containerRect.left + letterRect.width / 2;
            const letterY =
              letterRect.top - containerRect.top + letterRect.height / 2;

            // Calculate distance from mouse to center of letter
            const distance = Math.sqrt(
              Math.pow(mousePosition.x - letterX, 2) +
                Math.pow(mousePosition.y - letterY, 2)
            );

            // Maximum distance for glow effect (adjust as needed)
            const maxDistance = 150;

            // Calculate intensity based on distance
            let intensity = 0;
            if (distance < maxDistance) {
              intensity = 1 - distance / maxDistance;
              intensity = Math.pow(intensity, 2); // Make falloff more exponential
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
            className="relative inline-block text-5xl md:text-6xl lg:text-[11vw] font-black font-['Geist'] px-2"
          >
            <span
              className="text-transparent bg-clip-text bg-gradient-to-b from-[#0b75db] to-[#01284f] tracking-wide block"
              style={{
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
