import type { Route } from "./+types/home";
import Navbar from "../../components/Navbar";
import {ArrowRight, Layers, Sparkles, Code, Brain, Cpu, Database, Laptop} from "lucide-react";
import Button from "../../components/ui/Button";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Upload from "../../components/Upload";

gsap.registerPlugin(ScrollTrigger);

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);

  const words = ["Innovate", "Create", "Visualize", "Design", "Render", "Transform"];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const spans = gsap.utils.toArray(".animated-word");
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: `+=${words.length * 40}%`,
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      spans.forEach((span, i) => {
        // Entrance
        if (i > 0) {
          tl.fromTo(span as HTMLElement, 
            { y: 100, opacity: 0, scale: 0.8 },
            { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
            i * 1.5
          );
        } else {
          tl.to(span as HTMLElement, { opacity: 1, scale: 1, duration: 1 }, 0);
        }

        // Exit
        if (i < spans.length - 1) {
          tl.to(span as HTMLElement, 
            { y: -100, opacity: 0, scale: 1.2, duration: 1, ease: "power2.in" },
            (i + 1) * 1.5
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return ( <div className = "home" ref={containerRef}>
    <Navbar />
    <motion.section 
      className={"hero"}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      id="hero"
    >
      <motion.div variants={itemVariants} className={"announce"}>
        <div className={"dot"}>
          <div className={"pulse"}> </div>
        </div>
        <p>Konichiwa Meowify</p>
      </motion.div>
      <motion.h1 variants={itemVariants}>Introducing Meowify An AI</motion.h1>
      <motion.p variants={itemVariants} className={"subtitle"}>
        Meowify is An AI-based Web app which helps
        Interior Designer to convert 2D to 3D
      </motion.p>
      <motion.div variants={itemVariants} className={"actions"}>
        <a href={"#upload"} className={"cta"}>
          Start Now <Sparkles className="ml-3 w-6 h-6 transition-transform hover:rotate-12" />

        </a>
        <Button variant={"outline"} size={"lg"} className={"demo"}>
          Watch Demo
        </Button>
      </motion.div>
      <motion.div variants={itemVariants} id={"upload"} className={"upload-shell"}>
        <div className={"grid-overlay"}/>
        <div className={"upload-card"}>
          <div className={"upload-head"}>
            <div className={"upload-icon"}>
              <Layers className={"icon"}/>

            </div>
            <h3>Upload your Sketch</h3>
            <p>
              Supports JPG, PNG formats Upto 10MB
            </p>

            <Upload />
          </div>

        </div>
      </motion.div>
    </motion.section>

    <div className="section-separator" />
    
    <div className="sliding-text-container">
      <div className="sliding-text">
        Meowify AI • 2D to 3D for Interior Designers • Professional SAAS Platform • Modern AI Rendering • 
      </div>
    </div>

    <div className="section-separator" />


    <motion.section 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="split-section py-24 md:py-32 px-4 md:px-8 bg-surface-highlight/30 relative overflow-hidden group/section"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center max-w-7xl mx-auto relative z-10">
        <div className="content-side">
          <motion.div
              variants={itemVariants}
              className="tag mb-6 inline-block"
          >
            <span className="bg-primary/10 text-primary px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-widest border-[3px] border-primary/20 shadow-handdrawn-soft">Global Scale</span>
          </motion.div>
          <motion.h2
              variants={itemVariants}
              className="text-5xl md:text-8xl font-offbit font-bold mb-12 leading-tight tracking-tighter"
          >
            One platform, <br />
            <span className="text-primary animate-pulse inline-block mt-4 tracking-wide">infinite</span> <br />
            <span className={"tracking-wide"}>possibilities.</span>
          </motion.h2>
          <motion.p
              variants={itemVariants}
              className="text-xl md:text-3xl text-foreground font-black mb-10 leading-relaxed max-w-lg uppercase tracking-tight"
          >
            Empowering Interior Designers to turn 2D Sketches into professional 3D Renders instantly with AI-driven precision.
          </motion.p>
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-6"
          >
            <a href="#upload" className="cta text-lg px-8 py-4 bg-primary text-white border-[3px] border-foreground shadow-handdrawn hover:-translate-y-1 hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all rounded-2xl flex items-center justify-center">Try Now</a>
            <Button variant="outline" size="lg" onClick={() => window.location.href='#'}>Learn More</Button>
          </motion.div>
        </div>
        <div className="visual-side relative">
          <motion.div
              variants={itemVariants}
              className="relative z-10 bg-surface border-[6px] border-foreground rounded-[3rem] p-4 md:p-8 shadow-handdrawn animate-rotate-3d"
          >
            <div className="aspect-square bg-surface-highlight rounded-[2rem] border-[4px] border-foreground overflow-hidden relative group cursor-crosshair">
              {/* Innovative Sketch-to-3D Preview */}
              <div className="absolute top-6 left-6 z-30 flex flex-col gap-3">
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-primary text-white px-4 py-2 rounded-xl text-xs font-bold border-[3px] border-foreground shadow-handdrawn-soft opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  3D RENDER
                </motion.div>
                <motion.div 
                   initial={{ x: -20, opacity: 0 }}
                   whileInView={{ x: 0, opacity: 1 }}
                   transition={{ delay: 0.4 }}
                   className="bg-secondary text-white px-4 py-2 rounded-xl text-xs font-bold border-[3px] border-foreground shadow-handdrawn-soft group-hover:opacity-0 transition-all duration-300"
                >
                  2D SKETCH
                </motion.div>
              </div>

              <img
                  src="https://picsum.photos/seed/sketch1/800/800?grayscale"
                  alt="Sketch"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-1000 ease-out"
                  referrerPolicy="no-referrer"
              />
              <img
                  src="https://picsum.photos/seed/interior1/800/800"
                  alt="Interior Design"
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-out"
                  referrerPolicy="no-referrer"
              />
              
              {/* Scanline Effect on Hover */}
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.1)_50%,transparent_50%)] bg-[length:100%_4px] animate-pulse" />
              </div>
            </div>
          </motion.div>
          
          {/* Decorative 2D Elements */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-12 -right-12 w-48 h-48 border-[4px] border-dashed border-primary/30 rounded-full pointer-events-none" 
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-16 -left-16 w-64 h-64 border-[4px] border-dashed border-secondary/30 rounded-full pointer-events-none" 
          />
        </div>
      </div>
    </motion.section>
    <motion.section 
      ref={triggerRef} 
      className="scroll-trigger-section relative bg-foreground overflow-hidden min-h-screen flex items-center justify-center py-16 md:py-32"
    >
      {/* Decorative Background Elements */}
      <div className="bg-elements hidden md:block">
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            rotate: [12, 15, 12],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="element rect top-20 left-[10%]" 
        />
        <motion.div 
          animate={{ 
            rotate: 360,
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="element circle bottom-20 right-[15%]" 
        />
        <motion.div 
          animate={{ 
            x: [0, 30, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="element triangle top-1/2 left-[5%]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [-10, 10, -10],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="element triangle-outline bottom-1/4 right-[5%]" 
        />
        {/* Additional Pixel Elements */}
        <div className="absolute top-[30%] right-[25%] w-4 h-4 bg-white/20 animate-pulse" />
        <div className="absolute bottom-[40%] left-[20%] w-6 h-6 bg-white/10 border border-white/30 rotate-45" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full flex flex-col items-center justify-center text-center relative z-10">
        {/* New Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-24"
        >
          <h1 className="text-white text-4xl sm:text-5xl md:text-8xl font-offbit font-black uppercase mb-4 md:mb-6 tracking-tighter">
            What do we do?
          </h1>
          <p className="text-white/60 text-base sm:text-lg md:text-3xl font-offbit-101 font-medium uppercase tracking-widest max-w-3xl mx-auto">
            what are we meant to do?
          </p>
        </motion.div>

        {/* Animated Sequence */}
        <div className="flex items-center gap-3 md:gap-8 justify-center">
           <span className="text-white text-4xl sm:text-5xl md:text-9xl font-offbit font-black uppercase tracking-tighter opacity-40">WE</span>
           <div ref={wordsRef} className="relative h-12 sm:h-15 md:h-30 w-48 sm:w-62.5 md:w-150 overflow-hidden">
              {words.map((word, index) => (
                <span
                  key={word}
                  className="animated-word absolute inset-0 text-primary text-4xl sm:text-5xl md:text-9xl font-offbit font-black uppercase tracking-tighter opacity-0 flex items-center justify-center text-center"
                >
                  {word}
                </span>
              ))}
           </div>
        </div>
      </div>
    </motion.section>

    {/* Section 4: Developer Introduction */}
    <section className="intro-section" id="about">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="profile-card"
        >
          {/* Avatar Area */}
          <div className="avatar-wrapper">
            <div className="avatar-bg" />
            <motion.div 
              whileHover={{ rotate: 0, scale: 1.05 }}
              className="avatar-main"
            >
              <img 
                src="https://api.dicebear.com/7.x/pixel-art/svg?seed=Siddhant" 
                alt="Siddhant Choudhary"
                className="w-full h-full object-cover p-4"
              />
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="floating-tag"
            >
              Full-Stack Ninja
            </motion.div>

            {/* Floating Tech Icons */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="tech-icon -top-8 -left-8"
            >
              <Code className="text-primary w-6 h-6" />
            </motion.div>
            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="tech-icon bottom-0 -right-8"
            >
              <Brain className="text-secondary w-6 h-6" />
            </motion.div>
          </div>

          {/* Bio Content */}
          <div className="bio-content">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary mb-4 block">Meet the Developer</span>
              <h2>I'm <span>Siddhant Choudhary.</span></h2>
              <p>
                I am a Backend and Frontend developer working with AI. My journey involves making and researching AI systems that push the boundaries of digital creativity.
              </p>
              <p className="mb-4">
                While AI can easily create website frontends today, the real challenge lies in the complex logic and <strong>Deep Learning/Machine Learning</strong> required for spatial transformations. This is where my focus lies.
              </p>
              
              <div className="bg-zinc-50 border-l-[4px] border-primary p-6 rounded-r-2xl mb-8 shadow-sm space-y-4">
                <p className="text-sm md:text-base italic m-0 text-foreground/80">
                  "I created Meowify to use Agentic AI to convert 2D sketches to 3D. While the original project idea was inspired by a video from <strong>JavaScript Mastery</strong> on YouTube, I have heavily elaborated on it—implementing my own UI, custom backend logic, and a deeper technical architecture to make these tools truly accessible."
                </p>
                <p className="text-sm md:text-base font-bold m-0 text-primary">
                  As my professor says: "We, the future generation, are meant to use and build upon the things which our predecessors have provided."
                </p>
              </div>
              
              <div className="tech-stack">
                <div className="stack-item">
                  <Database size={16} /> PostgreSQL
                </div>
                <div className="stack-item">
                  <Cpu size={16} /> Machine Learning
                </div>
                <div className="stack-item">
                  <Code size={16} /> React/Next.js
                </div>
                <div className="stack-item">
                  <Laptop size={16} /> Agentic AI
                </div>
              </div>

              <div className="mt-12 flex items-center gap-6">
                 <Button variant="primary" size="lg" className="px-12">Get in Touch</Button>
                 <div className="hidden md:flex flex-col">
                    <span className="text-xs font-bold uppercase text-foreground/40">Next Milestones</span>
                    <span className="text-sm font-bold">Removing Puter & Full Native Auth</span>
                 </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  </div>)
}
