import { WindowTemplate } from '@/types';

export const windowTemplates: WindowTemplate[] = [
  {
    id: 'tpl-1',
    name: '单扇平开窗',
    type: 'casement',
    defaultWidth: 0.8,
    defaultHeight: 1.5,
    defaultPanes: 1,
    icon: '🪟'
  },
  {
    id: 'tpl-2',
    name: '双扇平开窗',
    type: 'casement',
    defaultWidth: 1.5,
    defaultHeight: 1.5,
    defaultPanes: 2,
    icon: '🪟'
  },
  {
    id: 'tpl-3',
    name: '三扇平开窗',
    type: 'casement',
    defaultWidth: 2.2,
    defaultHeight: 1.5,
    defaultPanes: 3,
    icon: '🪟'
  },
  {
    id: 'tpl-4',
    name: '两轨推拉门',
    type: 'sliding',
    defaultWidth: 1.8,
    defaultHeight: 2.1,
    defaultPanes: 2,
    icon: '🚪'
  },
  {
    id: 'tpl-5',
    name: '三轨推拉门',
    type: 'sliding',
    defaultWidth: 2.4,
    defaultHeight: 2.1,
    defaultPanes: 3,
    icon: '🚪'
  },
  {
    id: 'tpl-6',
    name: '折叠门',
    type: 'folding',
    defaultWidth: 3,
    defaultHeight: 2.2,
    defaultPanes: 4,
    icon: '📂'
  },
  {
    id: 'tpl-7',
    name: '阳光房顶',
    type: 'sunroom',
    defaultWidth: 4,
    defaultHeight: 2.5,
    defaultPanes: 6,
    icon: '☀️'
  }
];
