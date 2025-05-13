import Hero from "./components/Hero";
import Herobg from "./components/Herobg";
import About from "./components/About";
import Projects from "./components/Projects";
import Expertise from "./components/Expertise";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Team from "./components/Team";
import Lenis from "@studio-freight/lenis";
import { useEffect, useRef } from "react";

const App = () => {
 const lenis = useRef<Lenis | null>(null);

  useEffect(() => {
    lenis.current = new Lenis({
      duration: 0.6,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    });

    const animate = (time: number) => {
      lenis.current?.raf(time);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    return () => {
      lenis.current?.destroy();
    };
  }, []);

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    lenis.current?.scrollTo(element);
  }
};

  return (
    <div className="min-h-screen overflow-hidden">
      <Herobg />
      <Hero />
      <About />
      <Projects />
      <Expertise />
      <Team />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
