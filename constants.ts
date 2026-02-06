import { JuiceProduct, RoomSpec } from './types';

export const JUICES: JuiceProduct[] = [
  {
    id: '1',
    name: 'Void Essence',
    description: 'A deep detox blend extracted from the midnight zone.',
    baseColor: '#0f0518', // very dark purple
    accentColor: '#7c3aed', // violet
    sweetness: 30,
    imageSeed: 'obsidian',
    ingredients: ['Maqui Berry', 'Activated Charcoal', 'Dark Matter', 'Lime Zest'],
    potency: '98% PURE'
  },
  {
    id: '2',
    name: 'Solar Flare',
    description: 'Liquid immunity forged in the heart of a dying star.',
    baseColor: '#431407', // orange-brown
    accentColor: '#f59e0b', // amber
    sweetness: 45,
    imageSeed: 'sun',
    ingredients: ['Raw Turmeric', 'Ginger Root', 'Cayenne Plasma', 'Orange'],
    potency: 'RADIANT'
  },
  {
    id: '3',
    name: 'Gaia’s Tear',
    description: 'Restoration fluid from the ancient world tree.',
    baseColor: '#022c22', // teal-950
    accentColor: '#10b981', // emerald
    sweetness: 60,
    imageSeed: 'leaf',
    ingredients: ['Ceremonial Matcha', 'Spinach', 'Spirit Mint', 'Green Apple'],
    potency: 'VITAL'
  },
  {
    id: '4',
    name: 'Neon Pulse',
    description: 'A cybernetic energy boost for the digital soul.',
    baseColor: '#380625', // pink-950
    accentColor: '#ec4899', // pink
    sweetness: 85,
    imageSeed: 'neon',
    ingredients: ['Dragon Fruit', 'Lychee', 'Coconut Water', 'Guarana'],
    potency: 'OVERDRIVE'
  }
];

export const ROOM_SPECS: RoomSpec[] = [
  { label: 'Reality Distortion', value: '100%', description: 'The boundaries between worlds are thin here.' },
  { label: 'Mana Density', value: 'High', description: 'Ley lines converge at this specific coordinate.' },
  { label: 'Illumination', value: 'Starlight', description: 'Lit eternally by the glow of distant nebulas.' },
  { label: 'Silence', value: 'Absolute', description: 'Sound dampening weave from the ethereal plane.' },
];
