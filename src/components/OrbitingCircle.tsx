import { useState, useEffect } from "react";
import {
  Github,
  Figma,
  Linkedin,
  Code2,
  FileCode,
  LayoutGrid,
  Database,
  Cog,
} from "lucide-react";

const Icons = {
  figma: () => <Figma className="text-pink-500" />,
  github: () => <Github className="text-gray-800" />,
  nextjs: () => <Code2 className="text-black" />,
  mongodb: () => <Database className="text-green-500" />,
  react: () => (
    <div className="text-blue-400">
      <svg viewBox="0 0 24 24" fill="currentColor" height="100%" width="100%">
        <path d="M12 9.861a2.139 2.139 0 100 4.278 2.139 2.139 0 100-4.278zm-5.992 6.394c-.353-.548-.675-1.124-.94-1.714.228-.457.478-.898.746-1.324a19.39 19.39 0 00-.754-1.328c.271-.6.596-1.184.954-1.738.778.377 1.596.694 2.442.935a19.822 19.822 0 001.584-2.166A19.915 19.915 0 0012 8.335c1.227.025 2.44.193 3.613.496.44.705.96 1.45 1.557 2.177.844-.24 1.663-.557 2.438-.932.356.553.68 1.133.95 1.73-.261.434-.513.875-.788 1.335.258.427.51.871.785 1.33-.266.593-.588 1.168-.942 1.714-1.93-.914-3.81-1.496-5.613-1.735a20.204 20.204 0 01-1.563 2.182A20.424 20.424 0 018.997 16c-1.797.236-3.677.82-5.605 1.736zm12.65-.46c.863-1.342 1.342-2.795 1.342-4.294 0-1.513-.493-2.96-1.37-4.317-1.384-2.15-3.815-3.657-6.63-4.115C9.233.75 6.422 1.09 4.241 2.172 2.374 3.113 1 4.453 1 6c0 1.5.474 2.938 1.33 4.282.107.169.22.336.338.5a5.975 5.975 0 00-.338.506C1.465 12.637 1 14.07 1 15.5c0 1.546 1.375 2.886 3.241 3.828.782.394 1.646.689 2.56.879C8.535 20.737 10.258 21 12 21c1.766 0 3.467-.27 5.2-.791.895-.192 1.748-.48 2.52-.87C21.60 18.386 23 17.032 23 15.5c0-1.43-.467-2.86-1.342-4.205zM12 14.831a4.831 4.831 0 110-9.662 4.831 4.831 0 010 9.662z" />
      </svg>
    </div>
  ),
  node: () => (
    <div className="text-green-600">
      <svg viewBox="0 0 24 24" fill="currentColor" height="100%" width="100%">
        <path d="M12 2.25c-.578 0-1.155.144-1.67.422L3.495 6.48c-1.027.557-1.667 1.617-1.667 2.77v5.5c0 1.154.64 2.214 1.667 2.77l6.835 3.81c.516.278 1.093.42 1.67.42s1.154-.142 1.67-.42l6.835-3.81c1.027-.556 1.667-1.616 1.667-2.77v-5.5c0-1.153-.64-2.213-1.667-2.77l-6.835-3.808c-.515-.278-1.092-.422-1.67-.422zm-.134 1.904c.17 0 .342.035.498.105l5.734 3.297c.308.19.498.522.498.889v6.51c0 .366-.19.698-.498.887l-5.734 3.298a1.035 1.035 0 01-.996 0l-5.734-3.298a1.013 1.013 0 01-.498-.887v-6.51c0-.367.19-.7.498-.889l5.734-3.297a1.03 1.03 0 01.498-.105z" />
      </svg>
    </div>
  ),
  tailwind: () => (
    <div className="text-cyan-500">
      <svg viewBox="0 0 24 24" fill="currentColor" height="100%" width="100%">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
      </svg>
    </div>
  ),
  js: () => (
    <div className="text-yellow-400">
      <FileCode />
    </div>
  ),
  html: () => <LayoutGrid className="text-orange-500" />,
};

const OrbitingCircles = ({
  children,
  iconSize = 24,
  radius,
  reverse = false,
  speed = 0.8,
}) => {
  const [rotation, setRotation] = useState(0);
  const childCount = Array.isArray(children) ? children.length : 1;
  const angleStep = 360 / childCount;

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => {
        const direction = reverse ? -1 : 1;
        return (prev + 0.2 * speed * direction) % 360;
      });
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [reverse, speed]);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {Array.isArray(children) ? (
        children.map((child, index) => {
          const angle = rotation + index * angleStep;
          const radians = angle * (Math.PI / 180);

          const top = `calc(50% - ${iconSize / 2}px + ${
            Math.sin(radians) * radius
          }px)`;
          const left = `calc(50% - ${iconSize / 2}px + ${
            Math.cos(radians) * radius
          }px)`;

          return (
            <div
              key={index}
              className="absolute transition-transform duration-75 ease-linear"
              style={{
                top,
                left,
                width: `${iconSize}px`,
                height: `${iconSize}px`,
              }}
            >
              {child}
            </div>
          );
        })
      ) : (
        <div
          className="absolute transition-transform duration-75 ease-linear"
          style={{
            top: `calc(50% - ${iconSize / 2}px + ${
              Math.sin(rotation * (Math.PI / 180)) * radius
            }px)`,
            left: `calc(50% - ${iconSize / 2}px + ${
              Math.cos(rotation * (Math.PI / 180)) * radius
            }px)`,
            width: `${iconSize}px`,
            height: `${iconSize}px`,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

const OrbitingCirclesAnimation = () => {
  const [sizes, setSizes] = useState({
    iconSize: 24,
    radiusLarge: 140,
    radiusSmall: 80,
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // lg breakpoint
        setSizes({
          iconSize: 32,
          radiusLarge: 200,
          radiusSmall: 120,
        });
      } else if (window.innerWidth >= 768) {
        // md breakpoint
        setSizes({
          iconSize: 28,
          radiusLarge: 160,
          radiusSmall: 100,
        });
      } else {
        setSizes({
          iconSize: 24,
          radiusLarge: 120,
          radiusSmall: 70,
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex items-center justify-end w-[60%] py-8">
      <div className="relative w-full max-w-lg aspect-square">
        {/* Outer orbit */}
        <OrbitingCircles
          iconSize={sizes.iconSize}
          radius={sizes.radiusLarge}
          speed={0.6}
        >
          <Icons.figma />
          <Icons.github />
          <Icons.nextjs />
          <Icons.mongodb />
        </OrbitingCircles>

        {/* Inner orbit */}
        <OrbitingCircles
          iconSize={sizes.iconSize}
          radius={sizes.radiusSmall}
          reverse
          speed={1}
        >
          <Icons.react />
          <Icons.node />
          <Icons.tailwind />
          <Icons.js />
          <Icons.html />
        </OrbitingCircles>

        {/* Centered Logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Glow effect */}
          <div className="absolute w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-b from-blue-600/50 to-purple-600/30 blur-xl" />

          {/* Logo container */}
          <div className="relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-b from-orange-500 via-cyan-400 to-violet-700 flex items-center justify-center shadow-lg">
            {/* Logo placeholder */}
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center">
              <Cog className="w-10 h-10 md:w-12 md:h-12 text-cyan-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrbitingCirclesAnimation;
