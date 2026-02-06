import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ShoppingBag, Zap, Droplets, Hexagon } from 'lucide-react';
import { JUICES } from '../constants';

export const ChromaticOrdering: React.FC = () => {
  const [flavorFilter, setFlavorFilter] = useState(50);
  const [activeIndex, setActiveIndex] = useState(0);

  const availableJuices = useMemo(() => {
    // Show all for the prototype flow
    return JUICES;
  }, []);

  const activeJuice = availableJuices[activeIndex % availableJuices.length];

  const nextJuice = () => setActiveIndex((prev) => (prev + 1) % availableJuices.length);
  const prevJuice = () => setActiveIndex((prev) => (prev - 1 + availableJuices.length) % availableJuices.length);

  // Background gradients
  const bgGradient = `linear-gradient(135deg, ${activeJuice.baseColor} 0%, ${activeJuice.accentColor} 100%)`;

  return (
    <div className="relative w-full h-full overflow-hidden font-sans text-white transition-colors duration-1000"
         style={{ background: bgGradient }}>
      
      {/* Precision Background Pictures / Shards */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[20%] -right-[20%] w-[800px] h-[800px] opacity-20 mix-blend-overlay"
          >
             <img src={`https://picsum.photos/seed/${activeJuice.imageSeed}1/800/800`} className="w-full h-full object-cover rounded-full blur-3xl" alt="Atmosphere" />
          </motion.div>
          <motion.div 
             animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
             className="absolute top-20 left-10 w-64 h-64 opacity-30 mix-blend-soft-light"
          >
             <img src={`https://picsum.photos/seed/${activeJuice.imageSeed}2/400/400`} className="w-full h-full object-cover rounded-xl rotate-12" alt="Shard 1" />
          </motion.div>
          <motion.div 
             animate={{ y: [0, 30, 0], x: [0, -10, 0] }}
             transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
             className="absolute bottom-40 right-10 w-48 h-96 opacity-30 mix-blend-soft-light"
          >
             <img src={`https://picsum.photos/seed/${activeJuice.imageSeed}3/400/600`} className="w-full h-full object-cover rounded-full" alt="Shard 2" />
          </motion.div>
      </div>

      {/* Mesh Overlay */}
      <motion.div 
        className="absolute inset-0 opacity-30 mix-blend-overlay"
        animate={{ 
          background: [
            `radial-gradient(circle at 20% 20%, ${activeJuice.accentColor}, transparent 50%)`,
            `radial-gradient(circle at 80% 80%, ${activeJuice.baseColor}, transparent 50%)`
          ]
        }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Main UI */}
      <div className="relative z-10 h-full flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 md:px-12">
          <div className="flex flex-col">
            <h1 className="text-3xl font-display font-bold tracking-tighter">MYSTERY<span className="text-white/50">BOX</span></h1>
            <p className="text-[10px] uppercase tracking-[0.3em] opacity-60">Curated Sensory Experience</p>
          </div>
          <button className="relative p-3 bg-white/5 backdrop-blur-md rounded-xl hover:bg-white/10 transition-all border border-white/10 group">
            <ShoppingBag className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          </button>
        </div>

        {/* Center: The Mystery Box */}
        <div className="flex-1 flex flex-col items-center justify-center relative perspective-1000">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeJuice.id}
              initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotateY: -90 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="relative w-64 h-64 md:w-80 md:h-80 group"
              style={{ transformStyle: 'preserve-3d' }}
            >
               {/* Glowing Aura */}
               <div className="absolute inset-0 bg-current blur-[60px] opacity-20 animate-pulse" style={{ color: activeJuice.accentColor }} />
               
               {/* The Cube Container */}
               <div className="w-full h-full relative" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(10deg)' }}>
                  {/* Front Face */}
                  <div className="absolute inset-0 border border-white/20 bg-white/5 backdrop-blur-md rounded-xl shadow-2xl flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                      <div className="text-center p-6 transform group-hover:scale-105 transition-transform duration-500">
                         <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                            <Hexagon className="w-8 h-8 opacity-80" />
                         </div>
                         <h2 className="text-3xl font-display font-bold mb-2 tracking-tight">{activeJuice.name}</h2>
                         <div className="h-[1px] w-12 bg-white/50 mx-auto mb-2" />
                         <p className="text-xs font-mono text-white/70">{activeJuice.potency}</p>
                      </div>
                      
                      {/* Corner Accents */}
                      <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-white/50" />
                      <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-white/50" />
                      <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-white/50" />
                      <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-white/50" />
                  </div>
                  
                  {/* Side Depth (Simulated) */}
                  <div className="absolute inset-0 rounded-xl border border-white/10 bg-black/20 -z-10 transform translate-x-4 translate-y-4" />
               </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav Arrows */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-20 pointer-events-none">
            <button onClick={prevJuice} className="pointer-events-auto p-4 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md border border-white/10 transition-all text-white/70 hover:text-white">
               <Minus className="w-6 h-6" />
            </button>
            <button onClick={nextJuice} className="pointer-events-auto p-4 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md border border-white/10 transition-all text-white/70 hover:text-white">
               <Plus className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Info Panel & Slider */}
        <div className="p-6 md:p-8 w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
          
          {/* Detailed Info Box */}
          <motion.div 
            key={`info-${activeJuice.id}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-black/20 backdrop-blur-xl border border-white/10 p-6 rounded-2xl"
          >
             <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-widest opacity-60">
                <Zap className="w-3 h-3" /> Analysis
             </div>
             <p className="text-sm leading-relaxed opacity-90 mb-4 font-mono">
               {activeJuice.description}
             </p>
             <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {activeJuice.ingredients.map((ing, i) => (
                    <span key={i} className="px-3 py-1 bg-white/10 rounded text-xs font-medium border border-white/5">
                      {ing}
                    </span>
                  ))}
                </div>
             </div>
          </motion.div>

          {/* Interactive Controls */}
          <div>
            <div className="mb-6">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-3 opacity-60">
                <span>Profile Scan</span>
                <span className="font-mono">{flavorFilter}% Sweetness</span>
              </div>
              <div className="relative h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent to-white rounded-full"
                  style={{ width: `${flavorFilter}%` }}
                />
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={flavorFilter}
                onChange={(e) => {
                   setFlavorFilter(Number(e.target.value));
                   const index = Math.floor((Number(e.target.value) / 100) * (JUICES.length - 1));
                   if (index !== activeIndex) setActiveIndex(index);
                }}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" 
              />
            </div>
            
            <button className="w-full py-4 bg-white text-black hover:bg-white/90 font-display font-bold uppercase tracking-widest text-sm rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2">
              <span>Initiate Order</span>
              <span className="bg-black text-white text-[10px] px-2 py-1 rounded ml-2 font-mono">$18.00</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
