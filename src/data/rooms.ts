import { RoomPreset } from '@/types';

export const rooms: RoomPreset[] = [
  {
    id: 'room-1',
    name: '卧室',
    type: 'bedroom',
    dimensions: { width: 5, depth: 4, height: 2.8 },
    wallColor: '#F5F0E8',
    floorColor: '#8B7355',
    thumbnail: '🛏️'
  },
  {
    id: 'room-2',
    name: '阳台',
    type: 'balcony',
    dimensions: { width: 6, depth: 2.5, height: 2.8 },
    wallColor: '#E8E8E8',
    floorColor: '#A0A0A0',
    thumbnail: '🌿'
  },
  {
    id: 'room-3',
    name: '客厅',
    type: 'living',
    dimensions: { width: 7, depth: 5, height: 3 },
    wallColor: '#FAFAFA',
    floorColor: '#C4A77D',
    thumbnail: '🛋️'
  }
];

export const defaultRoom = rooms[0];
