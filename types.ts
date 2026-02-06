export enum Tab {
  QUEST = 'QUEST',
  CHROMATIC = 'CHROMATIC',
  INFINITE = 'INFINITE',
  LHW_3D = 'LHW_3D'
}

export interface JuiceProduct {
  id: string;
  name: string;
  description: string;
  baseColor: string; // Hex for background gradient start
  accentColor: string; // Hex for gradient end
  sweetness: number; // 0 (Tart) to 100 (Sweet)
  imageSeed: string;
  ingredients: string[];
  potency: string; // e.g. "High", "Extreme"
}

export interface RoomSpec {
  label: string;
  value: string;
  description: string;
}