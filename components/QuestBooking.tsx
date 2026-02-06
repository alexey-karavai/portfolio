import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, Calendar, Wind } from 'lucide-react';

const steps = {
  SELECT_PATH: 0,
  SELECT_DATE: 1,
  CONFIRM: 2,
};

const paths = [
  {
    id: 'deep-woods',
    title: 'Deep Woods',
    subtitle: 'Disconnect in the ancient pines.',
    image: 'https://picsum.photos/seed/forestfog/1000/1600',
    color: 'from-green-900/80 to-stone-900/90'
  },
  {
    id: 'river-side',
    title: 'River Side',
    subtitle: 'Find flow by the rushing water.',
    image: 'https://picsum.photos/seed/riverrock/1000/1600',
    color: 'from-blue-900/80 to-stone-900/90'
  }
];

export const QuestBooking: React.FC = () => {
  const [step, setStep] = useState(steps.SELECT_PATH);
  const [selectedPathId, setSelectedPathId] = useState<string | null>(null);

  const selectedPath = paths.find(p => p.id === selectedPathId);

  const handleSelect = (id: string) => {
    setSelectedPathId(id);
    setStep(steps.SELECT_DATE);
  };

  const handleBack = () => {
    if (step === steps.SELECT_DATE) {
      setStep(steps.SELECT_PATH);
      setSelectedPathId(null);
    } else if (step === steps.CONFIRM) {
      setStep(steps.SELECT_DATE);
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-stone-950 text-stone-100 font-serif">
      <AnimatePresence mode="wait">
        
        {/* Step 1: Selection */}
        {step === steps.SELECT_PATH && (
          <motion.div 
            key="selection"
            className="flex flex-col md:flex-row h-full w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {paths.map((path) => (
              <div 
                key={path.id} 
                className="relative flex-1 h-1/2 md:h-full group cursor-pointer overflow-hidden"
                onClick={() => handleSelect(path.id)}
              >
                <motion.div 
                  layoutId={`bg-${path.id}`}
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                  style={{ backgroundImage: `url(${path.image})` }}
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${path.color}`} />
                <motion.div 
                  layoutId={`content-${path.id}`}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10"
                >
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 drop-shadow-lg">{path.title}</h2>
                  <p className="text-lg font-sans font-light opacity-90 tracking-wide">{path.subtitle}</p>
                  <div className="mt-8 px-6 py-2 border border-white/30 rounded-full font-sans text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    Begin Journey
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Step 2 & 3: Immersion & Booking */}
        {selectedPath && step !== steps.SELECT_PATH && (
          <motion.div 
            key="booking-flow"
            className="relative w-full h-full"
          >
            {/* Expanded Background */}
            <motion.div 
              layoutId={`bg-${selectedPath.id}`}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${selectedPath.image})` }}
            />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Content Container */}
            <div className="relative z-10 h-full flex flex-col p-6 md:p-12 max-w-4xl mx-auto">
              {/* Header */}
              <motion.div 
                layoutId={`content-${selectedPath.id}`}
                className="flex items-center justify-between mb-8"
              >
                 <div className="flex items-center gap-4">
                    <button onClick={handleBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                      <ArrowLeft className="w-6 h-6" />
                    </button>
                    <div>
                      <h2 className="text-3xl font-bold">{selectedPath.title}</h2>
                      <p className="text-sm font-sans opacity-70">Your sanctuary awaits</p>
                    </div>
                 </div>
              </motion.div>

              {/* Step 2: Date Selection */}
              {step === steps.SELECT_DATE && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex-1 flex flex-col items-center justify-center"
                >
                  <div className="bg-stone-900/40 border border-stone-700/50 p-8 rounded-2xl backdrop-blur-md max-w-md w-full">
                    <h3 className="text-xl text-center mb-6 font-sans tracking-widest uppercase text-quest-sand">Choose your Moon</h3>
                    <div className="grid grid-cols-7 gap-4 mb-4 font-sans text-sm text-center opacity-60">
                       <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                    </div>
                    <div className="grid grid-cols-7 gap-4 font-sans">
                      {Array.from({ length: 31 }).map((_, i) => (
                        <button 
                          key={i} 
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${[12, 13, 14].includes(i+1) ? 'bg-quest-terracotta text-white shadow-[0_0_15px_rgba(226,114,91,0.5)]' : 'hover:bg-white/10 text-stone-300'}`}
                          onClick={() => setStep(steps.CONFIRM)}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                    <div className="mt-8 text-center text-xs font-sans opacity-50 uppercase tracking-widest">
                       October 2024
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Confirmation / Amenities */}
              {step === steps.CONFIRM && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex-1 flex flex-col items-center justify-center"
                >
                  <div className="max-w-md w-full space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-1 bg-stone-800/60 p-6 rounded-xl border border-stone-700/30 backdrop-blur-md">
                        <Wind className="w-8 h-8 text-quest-sand mb-3" />
                        <h4 className="font-sans font-bold">Guided Breathwork</h4>
                        <p className="text-xs opacity-60 font-sans mt-1">Daily sessions included</p>
                      </div>
                      <div className="flex-1 bg-stone-800/60 p-6 rounded-xl border border-stone-700/30 backdrop-blur-md">
                        <Calendar className="w-8 h-8 text-quest-terracotta mb-3" />
                        <h4 className="font-sans font-bold">3 Nights</h4>
                        <p className="text-xs opacity-60 font-sans mt-1">Oct 12 - Oct 15</p>
                      </div>
                    </div>

                    <button className="w-full group relative py-4 px-8 bg-quest-terracotta/90 hover:bg-quest-terracotta text-white rounded-lg overflow-hidden transition-all shadow-[0_0_20px_rgba(226,114,91,0.3)] hover:shadow-[0_0_30px_rgba(226,114,91,0.6)]">
                      <span className="relative z-10 font-sans font-bold tracking-widest uppercase flex items-center justify-center gap-2">
                        Secure Your Spot <Check className="w-4 h-4" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    </button>
                    
                    <p className="text-center text-xs font-sans opacity-50">No payment required today. Free cancellation.</p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
