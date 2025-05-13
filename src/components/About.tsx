import { useEffect, useState } from "react";
import img1 from "/img1.svg";
import img2 from "/img2.svg";
import img3 from "/img3.svg";
import img4 from "/img4.svg";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import square from "/square.svg";
import OrbitingCirclesAnimation from "./OrbitingCircle";

// Type for the items
const title: string[] = ["Innovation", "Integrity", "Creativity", "Excellence"];
const desc: string[] = [
  "Constantly pushing boundaries and exploring new technologies",
  "Building trust through honesty and transparency",
  "Bringing unique and artistic perspectives to every project",
  "Delivering nothing short of the highest quality work",
];
const image: string[] = [img1, img2, img3, img4];

const About = () => {
  // State for the circle sizes
  const [radiusLarge, setRadiusLarge] = useState<number>(200);
  const [radiusSmall, setRadiusSmall] = useState<number>(130);
  const [sizeset, setSizeset] = useState<number>(38);

  useEffect(() => {
    // Ensure window is defined (for SSR compatibility)
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    // Animation for title
    gsap.fromTo(
      "#about-home h1",
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: "#about-home h1",
          start: "top 80%",
          end: "bottom 60%",
          scrub: true,
        },
      }
    );

    // Animation for each item
    gsap.utils.toArray<HTMLElement>(".section-item").forEach((item, index) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "bottom 60%",
            scrub: true,
          },
        }
      );
    });

    // Orbiting circle animation
    gsap.fromTo(
      ".orbiting-circles",
      { scale: 0.5, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        scrollTrigger: {
          trigger: ".orbiting-circles",
          start: "top 70%",
          end: "bottom 50%",
          scrub: true,
        },
      }
    );

    // Responsive radius handler
    const handleResize = (): void => {
      const width = window.innerWidth;
      setRadiusLarge(width < 768 ? 150 : 220);
      setRadiusSmall(width < 768 ? 100 : 150);
      setSizeset(width < 768 ? 32 : 48);
    };

    handleResize(); // Set initial values
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div id="about-home" className="relative">
      {/* Title */}
      <div className="text-white font-geist font-bold text-2xl md:text-3xl px-6 lg:px-[6rem] md:px-[6.6vw] flex flex-col gap-4">
        <div className="flex items-center">
          <img src={square} alt="image" className="size-7 md:size-9" />
          <h1 className="pl-4 md:pl-[1rem] lg:ml-[-0.5rem]">About us</h1>
        </div>
        <div className="border-gradient-custom w-[6rem] shadow-[0px_0px_7px_0px_rgba(0,221,255,1.00)] outline outline-[3px] outline-offset-[-2.50px] outline-cyan-400/40 rounded" />
      </div>

      {/* Intro */}
      <div className="px-6 lg:px-[6rem] md:px-[6.6vw] text-3xl md:text-5xl mt-4 md:mb-[6vh] lg:mb-0 mb-0">
        <h1 className="text-[#A1B0D1] font-semibold font-['Figtree'] tracking-widest">
          Innovating <br />
          with <span className="text-white">technology</span> to create <br />a
          smarter future.
        </h1>
      </div>

      {/* Features Section */}
      <div className="flex flex-col lg:flex-row px-6 md:px-[6rem] md:mt-0 gap-14 lg:gap-8 items-center justify-between mt-12 lg:mt-[-5vh]">
        <div className="grid grid-cols-2 gap-10 lg:px-6">
          {title.map((e, i) => (
            <div
              key={i}
              className="section-item max-w-[90vw] sm:w-[15rem] flex flex-col items-center gap-3"
            >
              <div className="flex flex-col items-center gap-2">
                <img
                  src={image[i]}
                  alt={`icon-${i}`}
                  className="h-[2.5rem] md:h-[2.5rem]"
                />
                <h1 className="text-white text-[1.25rem] md:text-[1.7rem] font-medium font-['Geist']">
                  {e}
                </h1>
              </div>
              <p className="text-white text-center px-4 sm:px-10 lg:text-base text-xs font-light mt-[-1vh] lg:mt-[-1vh] leading-5 font-['Figtree']">
                {desc[i]}
              </p>
            </div>
          ))}
        </div>

        <OrbitingCirclesAnimation
          radiusLarge={radiusLarge} // Passing the dynamic radius values
          radiusSmall={radiusSmall}
          sizeset={sizeset}
        />
      </div>

      {/* Background Blur Circle */}
      <div className="absolute top-[12vh] md:top-[15vh] left-1/6 -translate-x-1/2 md:left-[-15rem] md:translate-x-0 -z-[20]">
        <div className="h-[22rem] w-[24rem] md:h-[32rem] md:w-[30rem] rounded-full opacity-40 bg-[conic-gradient(from_177deg_at_50.00%_50.00%,_#2B6ED1_59deg,_#062550_247deg,_#006FFF_360deg)] blur-3xl" />
      </div>
    </div>
  );
};

export default About;
