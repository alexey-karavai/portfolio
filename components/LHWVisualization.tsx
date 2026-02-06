import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Globe, MapPin, Star, ConciergeBell, Wifi, Coffee, X, Compass } from 'lucide-react';

interface Hotel {
  id: string;
  name: string;
  location: string;
  image: string;
  price: string;
  rating: number;
}

const BASE_HOTELS: Hotel[] = [
  {
    id: '1',
    name: 'The Ritz Paris',
    location: 'Paris, France',
    image: 'https://picsum.photos/seed/paris/600/900',
    price: '€2,400',
    rating: 5.0
  },
  {
    id: '2',
    name: 'Hotel Adlon',
    location: 'Berlin, Germany',
    image: 'https://picsum.photos/seed/berlin/600/900',
    price: '€1,100',
    rating: 4.9
  },
  {
    id: '3',
    name: 'Imperial Hotel',
    location: 'Tokyo, Japan',
    image: 'https://picsum.photos/seed/tokyo/600/900',
    price: '¥85,000',
    rating: 4.9
  },
  {
    id: '4',
    name: 'Le Sirenuse',
    location: 'Positano, Italy',
    image: 'https://picsum.photos/seed/positano/600/900',
    price: '€3,200',
    rating: 5.0
  },
  {
    id: '5',
    name: 'Burj Al Arab',
    location: 'Dubai, UAE',
    image: 'https://picsum.photos/seed/dubai/600/900',
    price: 'AED 9,000',
    rating: 5.0
  },
  {
    id: '6',
    name: 'The Plaza',
    location: 'New York, USA',
    image: 'https://picsum.photos/seed/nyc/600/900',
    price: '$1,800',
    rating: 4.8
  },
  {
    id: '7',
    name: 'Claridge’s',
    location: 'London, UK',
    image: 'https://picsum.photos/seed/london/600/900',
    price: '£1,500',
    rating: 4.9
  },
  {
    id: '8',
    name: 'Marina Bay',
    location: 'Singapore',
    image: 'https://picsum.photos/seed/singapore/600/900',
    price: 'S$900',
    rating: 4.7
  },
  {
    id: '9',
    name: 'The Savoy',
    location: 'London, UK',
    image: 'https://picsum.photos/seed/savoy/600/900',
    price: '£1,200',
    rating: 4.8
  },
  {
    id: '10',
    name: 'La Mamounia',
    location: 'Marrakech',
    image: 'https://picsum.photos/seed/morocco/600/900',
    price: 'MAD 8,000',
    rating: 4.9
  },
  {
    id: '11',
    name: 'Amangiri',
    location: 'Utah, USA',
    image: 'https://picsum.photos/seed/utah/600/900',
    price: '$3,400',
    rating: 5.0
  },
  {
    id: '12',
    name: 'Soneva Jani',
    location: 'Maldives',
    image: 'https://picsum.photos/seed/maldives/600/900',
    price: '$4,100',
    rating: 5.0
  }
];

// Generate a dense cloud for the sphere
const HOTELS = [...BASE_HOTELS, ...BASE_HOTELS];

// 3D Math Constants
const GLOBE_RADIUS = 450;
const ITEM_COUNT = HOTELS.length;

export const LHWVisualization: React.FC = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [activeHotel, setActiveHotel] = useState<Hotel | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Auto-rotation ref to keep animation smooth without re-renders
  const requestRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const rotationRef = useRef({ x: 0, y: 0 });

  // Update visual state from ref
  const animate = (time: number) => {
    if (lastTimeRef.current !== undefined) {
      if (!isDragging && !activeHotel) {
        rotationRef.current = {
            x: rotationRef.current.x,
            y: rotationRef.current.y + 0.002
        };
        setRotation({ ...rotationRef.current });
      }
    }
    lastTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isDragging, activeHotel]);

  // Gestures
  const handleDrag = (_: any, info: PanInfo) => {
    const sensitivity = 0.005;
    rotationRef.current = {
        x: rotationRef.current.x + info.delta.y * sensitivity,
        y: rotationRef.current.y - info.delta.x * sensitivity
    };
    setRotation({ ...rotationRef.current });
  };

  // Calculate Positions on Sphere (Fibonacci Sphere Algorithm)
  const items = useMemo(() => {
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    return HOTELS.map((hotel, i) => {
      const y = 1 - (i / (ITEM_COUNT - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i; // golden angle increment

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      return {
        hotel,
        basePos: { x: x * GLOBE_RADIUS, y: y * GLOBE_RADIUS, z: z * GLOBE_RADIUS }
      };
    });
  }, []);

  // Projection Logic
  const getProjectedItems = () => {
    // Rotation Matrix
    const cosX = Math.cos(rotation.x);
    const sinX = Math.sin(rotation.x);
    const cosY = Math.cos(rotation.y);
    const sinY = Math.sin(rotation.y);

    return items.map((item, index) => {
      // Rotate around Y axis
      let x = item.basePos.x * cosY - item.basePos.z * sinY;
      let z = item.basePos.z * cosY + item.basePos.x * sinY;
      
      // Rotate around X axis
      let y = item.basePos.y * cosX - z * sinX;
      z = z * cosX + item.basePos.y * sinX;

      // Perspective Projection
      const perspective = 1000;
      const scale = perspective / (perspective + z); // Objects further away are smaller
      const alpha = Math.max(0.1, (z + GLOBE_RADIUS) / (2 * GLOBE_RADIUS)); // Opacity based on Z depth

      return {
        ...item,
        index,
        x, 
        y, 
        z, 
        scale, 
        alpha,
        isFront: z < 100 // Roughly front facing
      };
    }).sort((a, b) => b.z - a.z); // Sort by Z for correct layering (Painter's algorithm)
  };

  const projectedItems = getProjectedItems();

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#2C1810] text-[#E3D4C4] font-serif selection:bg-[#C5A059] selection:text-white">
      
      {/* Background Ambience - Deep Brown Luxury Theme */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#4A2E20_0%,_#1F0F0A_100%)]" />
      <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}></div>
      
      {/* Header UI */}
      <div className="absolute top-0 left-0 w-full p-8 z-30 flex justify-between items-start pointer-events-none">
        <div>
          <h1 className="text-4xl md:text-6xl font-serif text-[#E3D4C4] tracking-tight drop-shadow-sm">
            <span className="text-[#C5A059]">LHW</span> World
          </h1>
          <div className="flex items-center gap-3 mt-2">
            <div className="h-[1px] w-12 bg-[#C5A059]" />
            <p className="text-xs uppercase tracking-[0.3em] text-[#C5A059]/80 font-sans">Curated Destinations</p>
          </div>
        </div>
      </div>

      {/* Main Interactive Container */}
      <div className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing z-10">
        <motion.div 
            className="relative w-full h-full flex items-center justify-center"
            onPan={handleDrag}
            onPanStart={() => setIsDragging(true)}
            onPanEnd={() => setIsDragging(false)}
        >
            {/* Wireframe Globe Core (Decoration) */}
            <div className="absolute pointer-events-none opacity-20">
               <motion.div 
                  className="w-[500px] h-[500px] border border-[#C5A059]/40 rounded-full"
                  animate={{ rotate: 360, rotateX: 60 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
               />
               <motion.div 
                  className="absolute inset-0 border border-[#C5A059]/40 rounded-full"
                  animate={{ rotate: -360, rotateY: 60 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
               />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-[#C5A059]/10 blur-3xl rounded-full" />
            </div>

            {/* Render Projected Items */}
            {projectedItems.map((item) => (
               <div
                  key={`${item.hotel.id}-${item.index}`}
                  className="absolute top-1/2 left-1/2 flex flex-col items-center justify-center"
                  style={{
                    transform: `translate3d(${item.x}px, ${item.y}px, 0) scale(${item.scale})`,
                    zIndex: Math.floor(1000 - item.z), // Layering
                    opacity: item.alpha,
                    width: 160,
                    height: 100,
                    marginLeft: -80,
                    marginTop: -50,
                    pointerEvents: item.z < 0 ? 'auto' : 'none', // Only clickable if in front half roughly
                  }}
               >
                 <motion.div
                    onClick={() => item.z < 100 && setActiveHotel(item.hotel)}
                    whileHover={{ scale: 1.2, zIndex: 2000 }}
                    className={`
                      relative group cursor-pointer flex flex-col items-center
                      transition-all duration-300
                      ${item.z > 100 ? 'blur-[1px] opacity-70' : 'blur-0 opacity-100'}
                    `}
                 >
                    {/* Floating Image Bubble */}
                    <div className="w-20 h-20 rounded-full border-2 border-[#C5A059]/30 p-1 overflow-hidden bg-[#1F0F0A] shadow-[0_10px_30px_rgba(0,0,0,0.3)] group-hover:border-[#C5A059] group-hover:shadow-[0_10px_30px_rgba(197,160,89,0.3)] transition-all">
                       <img 
                          src={item.hotel.image} 
                          className="w-full h-full object-cover rounded-full brightness-125 saturate-125 contrast-110" 
                          alt={item.hotel.name} 
                       />
                    </div>
                    
                    {/* Connecting Line */}
                    <div className="h-8 w-[1px] bg-gradient-to-b from-[#C5A059] to-transparent opacity-50" />
                    
                    {/* Label */}
                    <div className="bg-[#2C1810]/80 backdrop-blur-md px-3 py-1 rounded border border-[#C5A059]/30 text-center min-w-[140px] shadow-sm">
                      <p className="text-[10px] uppercase tracking-widest text-[#C5A059] mb-0.5 font-sans">{item.hotel.location.split(',')[0]}</p>
                      <h3 className="text-xs font-serif text-[#E3D4C4] whitespace-nowrap">{item.hotel.name}</h3>
                    </div>
                 </motion.div>
               </div>
            ))}
        </motion.div>
      </div>

      {/* Footer Controls */}
      <div className="absolute bottom-8 right-8 z-30 pointer-events-none flex flex-col items-end gap-2">
         <div className="flex items-center gap-2 text-[#E3D4C4]/40">
           <Compass className="w-4 h-4 animate-spin-slow" />
           <span className="text-[10px] font-sans tracking-widest uppercase">
             {Math.round(rotation.y * (180/Math.PI)) % 360}° E
           </span>
         </div>
         <p className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-sans">
            Drag Globe to Navigate
         </p>
      </div>

      {/* Detail Modal Overlay */}
      <AnimatePresence>
        {activeHotel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
             <div className="absolute inset-0 bg-[#1F0F0A]/90 backdrop-blur-md" onClick={() => setActiveHotel(null)} />
             
             <motion.div
                layoutId={`card-${activeHotel.id}`}
                initial={{ scale: 0.9, y: 50, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 50, opacity: 0 }}
                className="relative bg-[#2C1810] w-full max-w-6xl h-[85vh] rounded-sm overflow-hidden shadow-2xl flex flex-col md:flex-row border border-[#C5A059]/30 z-50"
             >
                <button 
                  onClick={() => setActiveHotel(null)}
                  className="absolute top-6 right-6 z-50 p-2 bg-black/20 hover:bg-[#C5A059] rounded-full text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Left: Immersive Image */}
                <div className="w-full md:w-[55%] h-1/2 md:h-full relative overflow-hidden group">
                   <img src={activeHotel.image} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[2s]" />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810] via-transparent to-transparent opacity-80" />
                   
                   <div className="absolute bottom-8 left-8">
                      <div className="bg-[#C5A059] text-white text-[10px] font-bold font-sans uppercase px-3 py-1 inline-block mb-4 tracking-widest">
                        LHW Collection
                      </div>
                      <h2 className="text-5xl md:text-7xl font-serif text-white leading-none">{activeHotel.name}</h2>
                   </div>
                </div>

                {/* Right: Details */}
                <div className="w-full md:w-[45%] p-8 md:p-12 overflow-y-auto bg-[#2C1810]">
                   <div className="flex items-center justify-between mb-8 border-b border-[#C5A059]/20 pb-6">
                      <div className="flex items-center gap-2 text-[#E3D4C4]/60">
                         <MapPin className="w-4 h-4 text-[#C5A059]" />
                         <span className="text-xs uppercase tracking-widest font-sans">{activeHotel.location}</span>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-[#C5A059] fill-current" />
                        ))}
                      </div>
                   </div>

                   <div className="space-y-8">
                      <div>
                        <h3 className="text-xl font-serif text-[#E3D4C4] mb-3">The Experience</h3>
                        <p className="text-[#E3D4C4]/60 font-sans font-light leading-relaxed text-sm">
                           Nestled in the heart of {activeHotel.location.split(',')[0]}, this iconic destination defines the pinnacle of luxury. 
                           Every detail has been curated to provide an immersive escape from the ordinary. 
                           From the handcrafted interiors to the world-class culinary journeys, prepare for an 
                           unforgettable stay that transcends traditional hospitality.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                         <div className="p-4 bg-[#1F0F0A] border border-[#C5A059]/10 rounded-sm hover:border-[#C5A059]/50 transition-colors group cursor-pointer">
                            <ConciergeBell className="w-5 h-5 text-[#C5A059] mb-3 group-hover:scale-110 transition-transform" />
                            <h4 className="text-xs font-bold uppercase tracking-widest text-[#E3D4C4] mb-1">Butler Service</h4>
                            <p className="text-[10px] text-[#E3D4C4]/40">24/7 Dedicated Team</p>
                         </div>
                         <div className="p-4 bg-[#1F0F0A] border border-[#C5A059]/10 rounded-sm hover:border-[#C5A059]/50 transition-colors group cursor-pointer">
                            <Coffee className="w-5 h-5 text-[#C5A059] mb-3 group-hover:scale-110 transition-transform" />
                            <h4 className="text-xs font-bold uppercase tracking-widest text-[#E3D4C4] mb-1">Fine Dining</h4>
                            <p className="text-[10px] text-[#E3D4C4]/40">Michelin Starred</p>
                         </div>
                      </div>

                      <div className="pt-8 mt-auto">
                         <div className="flex items-end justify-between mb-6">
                            <div>
                               <p className="text-[10px] text-[#E3D4C4]/40 uppercase tracking-widest mb-1">Nightly Rate</p>
                               <div className="text-3xl font-serif text-[#C5A059]">{activeHotel.price}</div>
                            </div>
                         </div>
                         <button className="w-full py-4 bg-[#C5A059] text-[#1F0F0A] font-sans font-bold uppercase tracking-[0.2em] text-xs hover:bg-white transition-colors duration-300">
                            Check Availability
                         </button>
                      </div>
                   </div>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};