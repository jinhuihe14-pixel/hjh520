import { HardwareConfig } from '@/types';

export const hardware: HardwareConfig[] = [
  {
    id: 'hw-1',
    name: '不锈钢执手',
    type: 'handle',
    color: '#C0C0C0',
    pricePerSet: 120
  },
  {
    id: 'hw-2',
    name: '金色执手',
    type: 'handle',
    color: '#FFD700',
    pricePerSet: 180
  },
  {
    id: 'hw-3',
    name: '黑色执手',
    type: 'handle',
    color: '#2C2C2C',
    pricePerSet: 150
  },
  {
    id: 'hw-4',
    name: '古铜执手',
    type: 'handle',
    color: '#B87333',
    pricePerSet: 200
  },
  {
    id: 'hw-5',
    name: '不锈钢合页',
    type: 'hinge',
    color: '#C0C0C0',
    pricePerSet: 80
  },
  {
    id: 'hw-6',
    name: '黑色合页',
    type: 'hinge',
    color: '#2C2C2C',
    pricePerSet: 100
  }
];

export const defaultHardware = hardware[0];
