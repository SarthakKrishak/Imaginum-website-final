import element from "/element.svg";
import { motion, useMotionValue, animate, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Loader from "./Loader";
import TextHoverComp from "./TextHoverComp.tsx";

const Hero = () => {
  const img1X = useMotionValue(90);
  const img1Y = useMotionValue(0);
  const img2X = useMotionValue(-90);
  const img2Y = useMotionValue(-10);
  const [isHover, setIsHover] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true });

  return (
    <>
      <Loader />
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
        className="lg:min-h-[85vh] min-h-[48vh] flex flex-col justify-between mt-16 py-8 px-6 md:px-12"
      >
        <div className="flex flex-col items-center gap-6 text-center mt-6 ms:mt-4 md:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="px-5 py-1 bg-gradient-to-r from-slate-950 to-sky-700 text-white outline outline-1 outline-blue-300 rounded-full text-[2.8vw] sm:text-[2.9vw] md:text-sm ont-['Lexend'] font-medium"
          >
            Innovate • Design • Build
          </motion.div>

          <motion.h1
            className="font-bold text-white text-[1.35rem] sm:text-[1.3vw] md:text-[2.5rem] lg:text-[2.9rem] capitalize font-['Geist'] leading-snug"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          >
            Building the{" "}
            <i className="font-['Canela_Trial'] font-medium">Future</i> with
            smart,
            <br />
            <i className="font-medium font-['Canela_Trial'] capitalize text-[#9DC9FF]">
              seamless
            </i>{" "}
            <span className="font-bold font-['Geist'] text-[#9DC9FF]">
              Technology.
            </span>
          </motion.h1>

          <motion.button
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            className="relative overflow-hidden rounded-3xl px-4 md:px-6 py-2 flex items-center bg-gradient-to-b from-white to-neutral-400 shadow-[0px_12px_60px_0px_rgba(57,143,255,0.60)]"
            aria-label="Explore Now Button"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: isHover ? "100%" : "0%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute left-0 top-0 h-full bg-black z-0"
            />

            <div
              onClick={() => {
                document
                  .getElementById("about-home")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="relative z-10 flex items-center gap-2 cursor-pointer"
            >
              <motion.p
                className="text-[0.7rem] md:text-base font-['Geist'] capitalize leading-loose"
                animate={{ color: isHover ? "#FFFFFF" : "#000000" }}
                transition={{ duration: 0.3 }}
              >
                Explore Now
              </motion.p>
            </div>
          </motion.button>
        </div>

        {/* <TextHoverEffect text="IMAGINUM" /> */}
        <TextHoverComp />

        <motion.img
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 1 }}
          style={{ x: img1X, y: img1Y }}
          drag
          dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
          dragElastic={0.8}
          dragMomentum={false}
          whileTap={{ scale: 0.95 }}
          whileDrag={{ zIndex: 50 }}
          onDragEnd={() => {
            animate(img1X, 90, { type: "spring", stiffness: 200 });
            animate(img1Y, 0, { type: "spring", stiffness: 200 });
          }}
          src={element}
          alt="Rotating element image"
          loading="lazy"
          className="absolute h-28 md:h-37 md:top-[23.7rem] md:left-[1.5rem] lg:h-40 lg:top-[22rem] lg:left-14 left-[-12vw] top-[29rem] cursor-grab active:cursor-grabbing"
        />

        <motion.img
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 1 }}
          style={{ x: img2X, y: img2Y }}
          drag
          dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
          dragElastic={0.8}
          dragMomentum={false}
          whileTap={{ scale: 0.95 }}
          whileDrag={{ zIndex: 50 }}
          onDragEnd={() => {
            animate(img2X, -90, { type: "spring", stiffness: 200 });
            animate(img2Y, -10, { type: "spring", stiffness: 200 });
          }}
          src={element}
          alt="Rotating element image"
          loading="lazy"
          className="absolute h-24 md:h-28 lg:right-28 lg:h-28 top-[8rem] md:right-12 right-[-12vw] cursor-grab active:cursor-grabbing"
        />
      </motion.div>
    </>
  );
};

export default Hero;
