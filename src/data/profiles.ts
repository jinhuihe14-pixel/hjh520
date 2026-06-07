import { ProfileConfig } from '@/types';

export const profiles: ProfileConfig[] = [
  {
    id: 'profile-1',
    name: '砂灰',
    color: '#8B8B8B',
    metalness: 0.3,
    roughness: 0.6,
    pricePerSqm: 680
  },
  {
    id: 'profile-2',
    name: '咖啡棕',
    color: '#6B4423',
    metalness: 0.2,
    roughness: 0.7,
    pricePerSqm: 720
  },
  {
    id: 'profile-3',
    name: '香槟金',
    color: '#D4AF37',
    metalness: 0.8,
    roughness: 0.3,
    pricePerSqm: 880
  },
  {
    id: 'profile-4',
    name: '墨黑',
    color: '#1A1A1A',
    metalness: 0.4,
    roughness: 0.5,
    pricePerSqm: 750
  },
  {
    id: 'profile-5',
    name: '珍珠白',
    color: '#F5F5F5',
    metalness: 0.2,
    roughness: 0.6,
    pricePerSqm: 700
  },
  {
    id: 'profile-6',
    name: '黄花梨',
    color: '#A0522D',
    metalness: 0.1,
    roughness: 0.8,
    pricePerSqm: 820
  }
];

export const defaultProfile = profiles[0];
