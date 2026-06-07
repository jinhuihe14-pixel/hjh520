import { WindowInstance, QuoteResult } from '@/types';

export const calculateWindowArea = (window: WindowInstance): number => {
  return window.width * window.height;
};

export const calculateTotalArea = (windows: WindowInstance[]): number => {
  return windows.reduce((total, win) => total + calculateWindowArea(win), 0);
};

export const calculateQuote = (windows: WindowInstance[]): QuoteResult => {
  let totalArea = 0;
  let profileCost = 0;
  let glassCost = 0;
  let hardwareCost = 0;

  windows.forEach(window => {
    const area = calculateWindowArea(window);
    totalArea += area;
    profileCost += area * window.profile.pricePerSqm;
    glassCost += area * window.glass.pricePerSqm;
    hardwareCost += window.hardware.pricePerSet * window.panes;
  });

  return {
    totalArea: Math.round(totalArea * 100) / 100,
    profileCost: Math.round(profileCost),
    glassCost: Math.round(glassCost),
    hardwareCost: Math.round(hardwareCost),
    totalCost: Math.round(profileCost + glassCost + hardwareCost)
  };
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

export const formatArea = (area: number): string => {
  return `${area.toFixed(2)} ㎡`;
};
