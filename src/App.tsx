import { motion, useScroll, useTransform } from "motion/react";
import Lottie from "lottie-react";
import { Plane } from "lucide-react";
import { CTA_LOTTIE } from "./constants/lottie";
import { useRef } from "react";
import { ImageSequence } from "./components/ImageSequence";

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Transformations for side text moving out
  const sideOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]); 
  const leftMove = useTransform(scrollYProgress, [0, 0.4], [0, -1500]);
  const rightMove = useTransform(scrollYProgress, [0, 0.4], [0, 1500]);
  
  const letsBeginY = useTransform(scrollYProgress, [0, 0.4], [0, -280]); 
  const letsBeginScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.5]);

  const windowOpacity = useTransform(scrollYProgress, [0.35, 0.5], [1, 0]); 
  const footerOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]); 

  const appBg = "transparent";
  const navColor = "#ffffff";

  return (
    <motion.div 
      ref={containerRef} 
      style={{ backgroundColor: appBg }}
      className="relative h-[1400vh] font-sans selection:bg-white selection:text-black text-white"
    >
      <ImageSequence scrollYProgress={scrollYProgress} />
      
      {/* Persistent General Navigation */}
      <motion.nav 
        style={{ color: navColor }}
        className="fixed top-0 left-0 w-full flex justify-between items-center z-50 px-10 py-8 pointer-events-none"
      >
        <div className="flex gap-12 font-medium text-sm tracking-widest uppercase pointer-events-auto">
          {["About", "Experience"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:opacity-50 transition-opacity"
            >
              {item}
            </a>
          ))}
        </div>
        <a href="mailto:anandsinghrathore409@gmail.com" className="flex items-center gap-2 group cursor-pointer pointer-events-auto">
          <span className="text-sm font-medium">anandsinghrathore409@gmail.com</span>
          <div className="w-12 h-12 flex items-center justify-center -mr-2">
            <Lottie animationData={CTA_LOTTIE} loop={true} className="w-full h-full scale-150 invert" />
          </div>
        </a>
      </motion.nav>

      {/* Sticky Hero Section */}
      <motion.div 
        style={{ opacity: windowOpacity }}
        className="sticky top-0 h-screen w-full flex flex-col overflow-hidden px-10 py-8 bg-transparent z-10"
      >
        <div className="h-16" />

        <div className="flex-1 relative flex items-center justify-between">
          <motion.div style={{ x: leftMove, opacity: sideOpacity }} className="z-10 max-w-xl" id="home">
            <h1 className="font-display text-[8vw] leading-[0.85] font-semibold tracking-tighter uppercase mb-20 text-white drop-shadow-lg">
              Anand Singh<br />Rathore
            </h1>
            <div className="max-w-xs pt-12 border-t border-white/20">
              <p className="text-xl font-medium leading-tight tracking-tight uppercase text-white/80">
                Your<br />freedom to<br />enjoy life
              </p>
            </div>
          </motion.div>

          <motion.div style={{ x: rightMove, opacity: sideOpacity }} className="z-10 text-right mt-60">
            <h2 className="font-display text-[7vw] leading-[0.8] font-semibold tracking-tighter uppercase max-w-md ml-auto text-white drop-shadow-lg">
              You are at<br />your desired<br />destination
            </h2>
          </motion.div>


          <motion.div 
            style={{ y: letsBeginY, scale: letsBeginScale, left: "50%", translateX: "-50%", opacity: windowOpacity }}
            className="absolute top-1/2 -translate-y-1/2 z-20"
          >
            <span className="font-display text-[2.5vw] font-medium tracking-[0.2em] uppercase whitespace-nowrap text-white">
              Let's Begin
            </span>
          </motion.div>

          <motion.div style={{ opacity: windowOpacity }} className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
            <a 
              href="https://www.linkedin.com/in/anand-singh-07a44143/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-8 bg-white/10 backdrop-blur-md px-10 py-3 rounded-full border border-white/20 shadow-lg hover:bg-white hover:text-black transition-all duration-500 group"
            >
              <span className="font-medium text-lg uppercase tracking-wider text-white group-hover:text-black">Connect</span>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                <Plane className="w-4 h-4 fill-current rotate-45" />
              </div>
            </a>
          </motion.div>
        </div>
      </motion.div>

      <AboutSection scrollYProgress={scrollYProgress} />
      <ExperienceSection scrollYProgress={scrollYProgress} />
      <CurrentRoleSection scrollYProgress={scrollYProgress} />
      <FinalSection scrollYProgress={scrollYProgress} />
    </motion.div>
  );
}

function AboutSection({ scrollYProgress }: { scrollYProgress: any }) {
  const y = useTransform(scrollYProgress, [0.08, 0.18], [500, 0]);
  const scale = useTransform(scrollYProgress, [0.08, 0.18], [0.8, 1]);
  const rotateX = useTransform(scrollYProgress, [0.08, 0.18], [15, 0]);
  const opacity = useTransform(scrollYProgress, [0.08, 0.15, 0.35, 0.42], [0, 1, 1, 0]);
  const blur = useTransform(scrollYProgress, [0.08, 0.15, 0.38, 0.42], ["blur(20px)", "blur(0px)", "blur(0px)", "blur(20px)"]);

  const leftMove = useTransform(scrollYProgress, [0.32, 0.45], [0, -1000]);
  const rightMove = useTransform(scrollYProgress, [0.32, 0.45], [0, 1000]);

  return (
    <motion.div 
      id="about"
      style={{ y, scale, rotateX, opacity, filter: blur, perspective: 1000 }}
      className="sticky top-0 h-screen w-full flex items-center justify-center z-20 px-10 md:px-20 bg-transparent"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24 max-w-7xl mx-auto items-center origin-center">
        
        <motion.div style={{ x: leftMove }} className="space-y-10 group">
          <div className="space-y-4">
            <span className="text-[12px] font-bold tracking-[0.5em] uppercase text-white/50 group-hover:text-white transition-colors duration-700">The Visionary Leader</span>
            <h2 className="text-[6vw] font-display font-semibold leading-[0.8] tracking-tighter uppercase drop-shadow-2xl text-white">
              Growth<br />Defined
            </h2>
          </div>
          
          <div className="space-y-6 bg-black/40 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:border-white/30 transition-colors duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            <p className="text-2xl md:text-3xl font-medium leading-tight tracking-tight text-white font-display uppercase italic">
              "Building pipelines that transcend borders."
            </p>
            <p className="text-lg md:text-xl font-medium leading-snug tracking-tight text-white/80 max-w-lg">
              I'm a results-driven Business Development Manager with <span className="text-white font-bold tracking-wider">12+ years</span> of specialized experience in the pharmaceutical and medical device industries. Currently at <span className="text-white font-bold">Evonik</span>, I lead emerging market strategies and growth initiatives across South Asia.
            </p>
            <div className="h-px w-24 bg-white/20 group-hover:w-full transition-all duration-1000" />
            <p className="text-sm font-medium leading-relaxed max-w-md opacity-80 text-white/70">
              Successfully increased market share by <span className="text-white font-bold">30%</span> and built a <span className="text-white font-bold">$7M+ pipeline</span>.
            </p>
          </div>
        </motion.div>

        <motion.div style={{ x: rightMove }} className="space-y-16">
          <div className="space-y-8 bg-black/40 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:border-white/30 transition-colors duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            <h3 className="text-[1.5vw] font-display font-bold tracking-[0.2em] uppercase text-white/60 border-l-4 border-white pl-4">Strategic Execution</h3>
            <ul className="space-y-6">
              {[
                { title: "Market Entry", desc: "Developing precision strategies for complex medical solutions." },
                { title: "Relationship Mastery", desc: "Managing high-level institutional partnerships (Fortis, Jupiter)." },
                { title: "Competitive Edge", desc: "Forecasting trends through deep market analysis." },
                { title: "Distribution Velocity", desc: "Driving product launches with market-specific agility." }
              ].map((item, i) => (
                <li key={i} className="group/item cursor-pointer">
                  <div className="flex gap-6 items-center">
                    <span className="text-2xl font-display font-bold text-white/20 group-hover/item:text-white group-hover/item:-translate-y-1 transition-all duration-500">0{i+1}</span>
                    <div className="group-hover/item:translate-x-2 transition-transform duration-500">
                      <h4 className="text-lg font-bold uppercase tracking-tight text-white/80 group-hover/item:text-white transition-colors">{item.title}</h4>
                      <p className="text-sm text-white/40 font-medium group-hover/item:text-white/80 transition-colors">{item.desc}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}

function ExperienceSection({ scrollYProgress }: { scrollYProgress: any }) {
  const z = useTransform(scrollYProgress, [0.42, 0.52], [-1000, 0]);
  const rotateY = useTransform(scrollYProgress, [0.42, 0.55], [-45, 0]);
  const scale = useTransform(scrollYProgress, [0.65, 0.72], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0.42, 0.52, 0.65, 0.72], [0, 1, 1, 0]);
  const blur = useTransform(scrollYProgress, [0.42, 0.5], ["blur(30px)", "blur(0px)"]);

  return (
    <motion.div 
      id="experience"
      style={{ z, rotateY, scale, opacity, filter: blur, perspective: 1500 }}
      className="sticky top-0 h-screen w-full flex flex-col p-10 md:p-20 bg-transparent z-30 transform-gpu"
    >
      <div className="flex-1 relative">
        <div className="absolute top-0 left-0 max-w-sm space-y-4 bg-black/50 backdrop-blur-lg p-6 rounded-2xl border border-white/10 hover:border-white/40 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 group">
          <div className="space-y-1">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/50 group-hover:text-white transition-colors">Market Access Leader</span>
            <h3 className="text-2xl font-display font-bold uppercase tracking-tighter text-white">ResMed India</h3>
          </div>
          <div className="text-xs font-bold tracking-widest text-white/70 uppercase group-hover:text-white transition-colors">2019 – 2021 | Account Manager</div>
          <ul className="space-y-2 border-l border-white/20 pl-4 py-1">
            <li className="text-xs font-medium uppercase leading-tight tracking-tight text-white/80">55% sales increase</li>
            <li className="text-xs font-medium uppercase leading-tight tracking-tight text-white/80">Key institutional relationships</li>
            <li className="text-xs font-medium uppercase leading-tight tracking-tight text-white/80">Market access strategy</li>
          </ul>
        </div>

        <div className="absolute top-0 right-0 max-w-sm space-y-4 text-right bg-black/50 backdrop-blur-lg p-6 rounded-2xl border border-white/10 hover:border-white/40 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 group">
          <div className="space-y-1">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/50 group-hover:text-white transition-colors">Hospital Solutions</span>
            <h3 className="text-2xl font-display font-bold uppercase tracking-tighter text-white">BD</h3>
          </div>
          <div className="text-xs font-bold tracking-widest text-white/70 uppercase group-hover:text-white transition-colors">2016 – 2019 | Account Sales Manager</div>
          <ul className="space-y-2 border-r border-white/20 pr-4 py-1">
            <li className="text-xs font-medium uppercase leading-tight tracking-tight text-white/80">Corporate hospital management</li>
            <li className="text-xs font-medium uppercase leading-tight tracking-tight text-white/80">Distributor network development</li>
          </ul>
        </div>

        <div className="absolute bottom-20 left-0 max-w-sm space-y-4 bg-black/50 backdrop-blur-lg p-6 rounded-2xl border border-white/10 hover:border-white/40 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 group">
          <div className="space-y-1">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/50 group-hover:text-white transition-colors">Pharma Strategy</span>
            <h3 className="text-2xl font-display font-bold uppercase tracking-tighter text-white">Pfizer India Ltd</h3>
          </div>
          <div className="text-xs font-bold tracking-widest text-white/70 uppercase group-hover:text-white transition-colors">2013 – 2016 | Professional Sales Officer</div>
          <ul className="space-y-2 border-l border-white/20 pl-4 py-1">
            <li className="text-xs font-medium uppercase leading-tight tracking-tight text-white/80">Campaign execution & precision</li>
            <li className="text-xs font-medium uppercase leading-tight tracking-tight text-white/80">ACE Award 2015 recipient</li>
          </ul>
        </div>

        <div className="absolute bottom-20 right-0 max-w-sm space-y-4 text-right bg-black/50 backdrop-blur-lg p-6 rounded-2xl border border-white/10 hover:border-white/40 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 group">
          <div className="space-y-1">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/50 group-hover:text-white transition-colors">Territory Growth</span>
            <h3 className="text-2xl font-display font-bold uppercase tracking-tighter text-white">Systopic Labs</h3>
          </div>
          <div className="text-xs font-bold tracking-widest text-white/70 uppercase group-hover:text-white transition-colors">2011 – 2013 | Medical Representative</div>
          <ul className="space-y-2 border-r border-white/20 pr-4 py-1">
            <li className="text-xs font-medium uppercase leading-tight tracking-tight text-white/80">Territory development & scale</li>
            <li className="text-xs font-medium uppercase leading-tight tracking-tight text-white/80">Prescription generation focus</li>
          </ul>
        </div>
      </div>
      
      <div className="mt-auto flex justify-between items-end border-t border-white/10 pt-6">
        <div className="text-[10px] font-bold tracking-[0.5em] uppercase opacity-40 text-white">Milestones 2011-2021</div>
        <div className="text-[10px] font-bold tracking-[0.5em] uppercase opacity-40 text-white">Career Destination</div>
      </div>
    </motion.div>
  );
}

function CurrentRoleSection({ scrollYProgress }: { scrollYProgress: any }) {
  const y = useTransform(scrollYProgress, [0.72, 0.80], [1000, 0]);
  const exitY = useTransform(scrollYProgress, [0.88, 0.94], [0, -1500]);
  const opacity = useTransform(scrollYProgress, [0.72, 0.78, 0.88, 0.94], [0, 1, 1, 0]);

  return (
    <motion.div style={{ y: exitY, opacity }} className="sticky top-0 h-screen w-full z-40 bg-transparent">
      <motion.div style={{ y }} className="h-full w-full flex flex-col md:flex-row backdrop-blur-md bg-black/60">
        <div className="w-full md:w-1/2 p-10 md:p-24 flex flex-col justify-center space-y-16">
          <div className="space-y-6">
            <h2 className="text-[5vw] font-display font-semibold leading-[0.8] tracking-tighter uppercase text-white drop-shadow-2xl">
              Evonik<br />Solutions
            </h2>
            <div className="h-0.5 w-16 bg-white" />
            <p className="text-xl font-display font-medium tracking-tight uppercase opacity-80 text-white">
              Manager — Emerging Accounts<br />& Growth Segments
            </p>
          </div>

          <div className="space-y-8 max-w-lg">
            {[
              "Developed strategic plans for medical device solutions across South Asian markets, resulting in 30% increase in market share.",
              "Identified and secured high-value supply agreements worth $5M+ through competitive market analysis.",
              "Spearheaded market entry strategy for EPICITE BALANCE product in Asia South & Middle East regions."
            ].map((text, i) => (
              <div key={i} className="flex gap-6 group">
                <span className="text-[10px] font-bold py-1 text-white/30 group-hover:text-white transition-colors">0{i+1}</span>
                <p className="text-sm font-medium leading-relaxed text-white/80">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/2 relative overflow-hidden bg-black">
          <img 
            src="/input_file_0.png" 
            alt="Anand Singh Rathore"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 scale-100 hover:scale-110 opacity-70"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent pointer-events-none" />
          
          <div className="absolute bottom-12 right-12 text-white z-10 text-right">
             <div className="text-[8vw] font-display font-bold leading-none tracking-tighter opacity-20 text-white">EVONIK</div>
             <div className="text-xs font-bold tracking-[0.5em] uppercase pr-2 text-white">Healthcare Solutions</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function FinalSection({ scrollYProgress }: { scrollYProgress: any }) {
  const y = useTransform(scrollYProgress, [0.92, 1.0], [1000, 0]);
  const opacity = useTransform(scrollYProgress, [0.92, 1.0], [0, 1]);

  return (
    <motion.div 
      style={{ y, opacity }}
      className="sticky top-0 h-screen w-full text-white flex flex-col z-50 overflow-hidden bg-black"
    >
      <video src="/input_file_1.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-60">
        <source src="/input_file_1.mp4" type="video/mp4" />
      </video>
      
      <div className="relative flex-1 flex flex-col justify-center px-10 md:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-20">
          <div className="space-y-8 max-w-lg z-10">
             <h2 className="text-[5vw] font-display font-bold leading-[0.9] tracking-tighter uppercase italic drop-shadow-2xl text-white">
               Turning Markets into Opportunities
             </h2>
             <div className="flex items-center gap-6 pt-4">
                <div className="w-12 h-px bg-white/30" />
             </div>
          </div>

          <div className="md:text-right space-y-4 z-10">
             <h3 className="text-3xl font-display font-medium tracking-tight text-white/90">
               Charting New Markets. Higher Altitudes.
             </h3>
             <div className="pt-10 flex flex-col md:items-end space-y-2">
                <a href="mailto:anandsinghrathore409@gmail.com" className="text-xl font-medium border-b border-white/20 hover:border-white transition-all duration-300 text-white">
                  anandsinghrathore409@gmail.com
                </a>
             </div>
          </div>
        </div>
      </div>

      <div className="relative p-10 md:p-20 flex justify-between items-end border-t border-white/10 z-10">
        <div className="space-y-1"></div>
        <div className="text-right space-y-4">
          <div className="flex gap-8 justify-end items-center">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 text-white">Made by</span>
            <a 
              href="https://www.linkedin.com/in/anshumansinghshekhawat/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-white text-black px-8 py-3 rounded-full font-bold uppercase text-[10px] tracking-widest hover:bg-zinc-200 transition-all duration-500 hover:scale-105"
            >
              Anshuman
              <Plane className="w-3 h-3 rotate-45 fill-current transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
