export type WindowType = 'casement' | 'sliding' | 'folding' | 'sunroom';

export interface ProfileConfig {
  id: string;
  name: string;
  color: string;
  metalness: number;
  roughness: number;
  pricePerSqm: number;
}

export interface GlassConfig {
  id: string;
  name: string;
  type: 'clear' | 'frosted' | 'tinted' | 'patterned';
  opacity: number;
  color: string;
  roughness: number;
  pricePerSqm: number;
}

export interface HardwareConfig {
  id: string;
  name: string;
  type: 'handle' | 'hinge' | 'lock';
  color: string;
  pricePerSet: number;
}

export interface WindowInstance {
  id: string;
  type: WindowType;
  width: number;
  height: number;
  position: [number, number, number];
  rotation: [number, number, number];
  profile: ProfileConfig;
  glass: GlassConfig;
  hardware: HardwareConfig;
  panes: number;
}

export interface RoomPreset {
  id: string;
  name: string;
  type: 'bedroom' | 'balcony' | 'living';
  dimensions: { width: number; depth: number; height: number };
  wallColor: string;
  floorColor: string;
  thumbnail: string;
}

export interface Project {
  id: string;
  name: string;
  room: RoomPreset;
  windows: WindowInstance[];
  lighting: 'day' | 'evening';
  createdAt: number;
}

export interface QuoteResult {
  totalArea: number;
  profileCost: number;
  glassCost: number;
  hardwareCost: number;
  totalCost: number;
}

export interface WindowTemplate {
  id: string;
  name: string;
  type: WindowType;
  defaultWidth: number;
  defaultHeight: number;
  defaultPanes: number;
  icon: string;
}
