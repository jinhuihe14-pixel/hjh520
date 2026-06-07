import { GlassConfig } from '@/types';

export const glasses: GlassConfig[] = [
  {
    id: 'glass-1',
    name: '透明玻璃',
    type: 'clear',
    opacity: 0.15,
    color: '#E8F4FF',
    roughness: 0.05,
    pricePerSqm: 180
  },
  {
    id: 'glass-2',
    name: '磨砂玻璃',
    type: 'frosted',
    opacity: 0.5,
    color: '#E0E0E0',
    roughness: 0.6,
    pricePerSqm: 220
  },
  {
    id: 'glass-3',
    name: '蓝色镀膜',
    type: 'tinted',
    opacity: 0.3,
    color: '#4A90A4',
    roughness: 0.1,
    pricePerSqm: 260
  },
  {
    id: 'glass-4',
    name: '茶色玻璃',
    type: 'tinted',
    opacity: 0.35,
    color: '#8B7355',
    roughness: 0.1,
    pricePerSqm: 240
  },
  {
    id: 'glass-5',
    name: '压花玻璃',
    type: 'patterned',
    opacity: 0.4,
    color: '#D4E4F0',
    roughness: 0.4,
    pricePerSqm: 280
  },
  {
    id: 'glass-6',
    name: 'Low-E节能',
    type: 'tinted',
    opacity: 0.25,
    color: '#B8D4E8',
    roughness: 0.08,
    pricePerSqm: 320
  }
];

export const defaultGlass = glasses[0];
