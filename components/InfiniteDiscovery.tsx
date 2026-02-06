import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Sparkles, Moon, Star, Wand2, Orbit } from 'lucide-react';
import { ROOM_SPECS } from '../constants';

export const InfiniteDiscovery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);
  
  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset: ["start start", "end end"]
  });

  const rotation = useTransform(scrollYProgress, [0, 0.5], [0, 15]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  // Handle active section for Compass
  const handleScroll = () => {
    if (!containerRef.current) return;
    const scrollPos = containerRef.current.scrollTop;
    const height = window.innerHeight;
    const section = Math.round(scrollPos / height);
    setActiveSection(section);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (el) el.addEventListener('scroll', handleScroll);
    return () => el?.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: index * window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative w-full h-full bg-[#020617] text-slate-200 overflow-hidden font-sans selection:bg-purple-500/30">
      
      {/* Magic Navigation (The Constellation) */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-8 items-center">
        <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-purple-500/50 to-transparent absolute top-0 left-1/2 -translate-x-1/2 -z-10" />
        {[0, 1, 2].map((idx) => (
          <button
            key={idx}
            onClick={() => scrollToSection(idx)}
            className={`relative group flex items-center justify-center w-4 h-4 transition-all duration-500`}
          >
             <div className={`absolute w-full h-full rotate-45 border border-cyan-400/50 transition-all duration-500 ${activeSection === idx ? 'scale-125 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)]' : 'bg-slate-900 group-hover:bg-cyan-900'}`} />
             {activeSection === idx && (
               <span className="absolute right-8 text-cyan-300 text-xs font-bold tracking-widest whitespace-nowrap opacity-0 animate-[fadeIn_0.5s_ease-out_forwards] font-mono">
                 RUNE 0{idx + 1}
               </span>
             )}
          </button>
        ))}
      </div>

      {/* Floating Particles Overlay */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: Math.random() * 0.5 + 0.1,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Scroll Container */}
      <div ref={containerRef} className="h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar">
        
        {/* Section 1: Hero & Magic Portal */}
        <section className="h-screen w-full relative flex items-center justify-center snap-start overflow-hidden perspective-1000">
          <div className="absolute inset-0 bg-[#020617] z-0">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-950 to-slate-950" />
          </div>
          
          <motion.div 
            style={{ rotateX: rotation, scale }}
            className="relative z-10 w-[85%] max-w-5xl aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(124,58,237,0.15)] group"
          >
             <div className="absolute inset-0 bg-cover bg-center opacity-80 transition-transform duration-[10s] group-hover:scale-110" style={{ backgroundImage: 'url(https://picsum.photos/seed/nebula/1920/1080)' }} />
             <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
             
             <div className="absolute bottom-16 left-8 md:left-16 text-center md:text-left">
               <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                  className="inline-block px-3 py-1 border border-cyan-500/30 rounded-full bg-cyan-950/30 backdrop-blur-md text-cyan-300 text-[10px] tracking-[0.3em] uppercase mb-4"
               >
                 Discover the Unseen
               </motion.div>
               <motion.h1 
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-5xl md:text-8xl font-serif font-medium text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-cyan-200 drop-shadow-lg"
               >
                 THE VOID
               </motion.h1>
               <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-slate-400 tracking-widest mt-4 uppercase text-xs md:text-sm font-mono max-w-md"
               >
                 Where magic meets the event horizon.
               </motion.p>
             </div>
          </motion.div>

          <motion.div 
            style={{ opacity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-cyan-500/50"
          >
            <ArrowDown className="w-6 h-6" />
          </motion.div>
        </section>

        {/* Section 2: Magical Specs Grid */}
        <section className="h-screen w-full relative flex items-center justify-center snap-start bg-[#020617]">
          {/* Background Orb */}
          <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <div className="max-w-6xl w-full px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center z-10">
             <div>
                <motion.h2 
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl md:text-5xl font-serif mb-6 leading-tight"
                >
                  Arcane <span className="text-cyan-400 italic">Properties</span>
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-slate-400 leading-relaxed mb-8 max-w-md font-light"
                >
                  This sanctum exists outside of standard time. The walls are woven from crystallized starlight, and the air hums with ancient resonance.
                </motion.p>
                <button className="text-cyan-400 border-b border-cyan-400/30 pb-1 hover:text-white hover:border-white transition-colors font-mono text-xs uppercase tracking-widest">
                  Read the Grimoire ->
                </button>
             </div>

             <div className="grid grid-cols-2 gap-6">
                {ROOM_SPECS.map((spec, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.05, borderColor: 'rgba(34,211,238,0.4)' }}
                    className="p-6 border border-white/5 bg-white/[0.02] backdrop-blur-sm rounded-xl hover:bg-white/[0.05] transition-all duration-300 group"
                  >
                    <div className="text-purple-400 mb-4 opacity-70 group-hover:opacity-100 group-hover:text-cyan-300 transition-all">
                      {i === 0 ? <Orbit size={24} /> : i === 1 ? <Sparkles size={24} /> : i === 2 ? <Moon size={24} /> : <Wand2 size={24} />}
                    </div>
                    <h3 className="text-xl font-bold font-sans mb-1 text-slate-200">{spec.value}</h3>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-2 font-mono">{spec.label}</p>
                    <p className="text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0 leading-snug">
                      {spec.description}
                    </p>
                  </motion.div>
                ))}
             </div>
          </div>
        </section>

        {/* Section 3: The Portal (Interactive) */}
        <section className="h-screen w-full relative flex items-center justify-center snap-start bg-[#020617] overflow-hidden">
          {/* Spinning Background Ring */}
          <motion.div 
             animate={{ rotate: 360 }}
             transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
             className="absolute w-[120vh] h-[120vh] border border-dashed border-white/5 rounded-full"
          />
          <motion.div 
             animate={{ rotate: -360 }}
             transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
             className="absolute w-[90vh] h-[90vh] border border-dashed border-cyan-900/20 rounded-full"
          />

          <div className="text-center relative z-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-80 h-80 mx-auto flex items-center justify-center"
            >
               {/* Glowing Portal Core */}
               <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-[80px] animate-pulse" />
               <div className="absolute inset-4 border border-cyan-500/30 rounded-full animate-[spin_10s_linear_infinite]" />
               <div className="absolute inset-12 border-2 border-purple-500/30 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
               
               {/* Center Button */}
               <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative z-20 w-32 h-32 bg-[#020617] rounded-full border border-white/20 flex items-center justify-center group overflow-hidden"
               >
                  <span className="relative z-10 font-mono font-bold text-cyan-300 tracking-widest text-xs group-hover:text-white transition-colors">ENTER</span>
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               </motion.button>

               {/* Satellites */}
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-0 z-0"
               >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]" />
               </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-16"
            >
               <h3 className="text-2xl font-serif text-white mb-2">Begin the Ritual</h3>
               <p className="text-slate-500 text-sm max-w-sm mx-auto">Cross the threshold into a world where imagination shapes reality.</p>
            </motion.div>
          </div>
        </section>

      </div>
    </div>
  );
};
