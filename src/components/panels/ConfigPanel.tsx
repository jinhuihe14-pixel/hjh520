import React from 'react';
import { Trash2, Copy, X } from 'lucide-react';
import { profiles } from '@/data/profiles';
import { glasses } from '@/data/glasses';
import { hardware } from '@/data/hardware';
import { useProjectStore } from '@/store/useProjectStore';
import { cn } from '@/lib/utils';

export const ConfigPanel: React.FC = () => {
  const currentProject = useProjectStore(state => state.currentProject);
  const selectedWindowId = useProjectStore(state => state.selectedWindowId);
  const updateWindow = useProjectStore(state => state.updateWindow);
  const removeWindow = useProjectStore(state => state.removeWindow);
  const duplicateWindow = useProjectStore(state => state.duplicateWindow);
  const selectWindow = useProjectStore(state => state.selectWindow);

  const selectedWindow = currentProject?.windows.find(w => w.id === selectedWindowId);

  if (!currentProject) {
    return (
      <div className="w-72 bg-gradient-to-b from-slate-900 to-slate-950 text-white h-full flex flex-col border-l border-slate-700/50">
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <div className="text-6xl mb-4">🪟</div>
            <p className="text-slate-400 text-sm">
              选择户型并添加门窗后，<br/>点击门窗进行配置
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedWindow) {
    return (
      <div className="w-72 bg-gradient-to-b from-slate-900 to-slate-950 text-white h-full flex flex-col border-l border-slate-700/50">
        <div className="p-4 border-b border-slate-700/50">
          <h2 className="text-lg font-bold text-amber-400" style={{ fontFamily: 'Noto Serif SC, serif' }}>
            属性配置
          </h2>
        </div>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <div className="text-5xl mb-4 opacity-50">👆</div>
            <p className="text-slate-400 text-sm">点击场景中的门窗进行选择</p>
          </div>
        </div>
      </div>
    );
  }

  const handleSizeChange = (dimension: 'width' | 'height', value: number) => {
    updateWindow(selectedWindowId!, { [dimension]: Math.max(0.5, Math.min(6, value)) });
  };

  const handlePaneChange = (panes: number) => {
    updateWindow(selectedWindowId!, { panes: Math.max(1, Math.min(6, panes)) });
  };

  return (
    <div className="w-72 bg-gradient-to-b from-slate-900 to-slate-950 text-white h-full flex flex-col border-l border-slate-700/50">
      <div className="p-4 border-b border-slate-700/50">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-amber-400" style={{ fontFamily: 'Noto Serif SC, serif' }}>
            属性配置
          </h2>
          <button
            onClick={() => selectWindow(null)}
            className="p-1.5 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        <div className="flex gap-2">
          <button
            onClick={() => duplicateWindow(selectedWindowId!)}
            className="flex-1 py-2 px-3 bg-slate-700/50 hover:bg-slate-700 rounded-lg flex items-center justify-center gap-2 text-sm transition-colors"
          >
            <Copy size={14} />
            复制
          </button>
          <button
            onClick={() => removeWindow(selectedWindowId!)}
            className="flex-1 py-2 px-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg flex items-center justify-center gap-2 text-sm transition-colors"
          >
            <Trash2 size={14} />
            删除
          </button>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-slate-300 flex items-center gap-2">
            <span>📐</span> 尺寸设置
          </h3>
          
          <div className="space-y-3">
            <div>
              <label className="text-xs text-slate-400 mb-1.5 block">宽度 (米)</label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0.5"
                  max="6"
                  step="0.1"
                  value={selectedWindow.width}
                  onChange={(e) => handleSizeChange('width', parseFloat(e.target.value))}
                  className="flex-1 accent-amber-500"
                />
                <span className="w-12 text-right text-sm font-mono bg-slate-800 px-2 py-1 rounded">
                  {selectedWindow.width.toFixed(1)}
                </span>
              </div>
            </div>
            
            <div>
              <label className="text-xs text-slate-400 mb-1.5 block">高度 (米)</label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0.5"
                  max="3.5"
                  step="0.1"
                  value={selectedWindow.height}
                  onChange={(e) => handleSizeChange('height', parseFloat(e.target.value))}
                  className="flex-1 accent-amber-500"
                />
                <span className="w-12 text-right text-sm font-mono bg-slate-800 px-2 py-1 rounded">
                  {selectedWindow.height.toFixed(1)}
                </span>
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 mb-1.5 block">扇数</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <button
                    key={num}
                    onClick={() => handlePaneChange(num)}
                    className={cn(
                      "flex-1 py-1.5 rounded text-sm transition-colors",
                      selectedWindow.panes === num
                        ? "bg-amber-500 text-slate-900 font-medium"
                        : "bg-slate-700/50 hover:bg-slate-700"
                    )}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-slate-300 flex items-center gap-2">
            <span>🎨</span> 型材颜色
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {profiles.map(profile => (
              <button
                key={profile.id}
                onClick={() => updateWindow(selectedWindowId!, { profile })}
                className={cn(
                  "p-2 rounded-lg flex flex-col items-center gap-1 transition-all",
                  selectedWindow.profile.id === profile.id
                    ? "bg-amber-500/20 ring-2 ring-amber-500"
                    : "bg-slate-700/50 hover:bg-slate-700"
                )}
              >
                <div
                  className="w-8 h-8 rounded-full border-2 border-slate-600 shadow-inner"
                  style={{ backgroundColor: profile.color }}
                />
                <span className="text-xs">{profile.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-slate-300 flex items-center gap-2">
            <span>💎</span> 玻璃样式
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {glasses.map(glass => (
              <button
                key={glass.id}
                onClick={() => updateWindow(selectedWindowId!, { glass })}
                className={cn(
                  "p-2 rounded-lg flex items-center gap-2 transition-all text-left",
                  selectedWindow.glass.id === glass.id
                    ? "bg-amber-500/20 ring-2 ring-amber-500"
                    : "bg-slate-700/50 hover:bg-slate-700"
                )}
              >
                <div
                  className="w-8 h-8 rounded border-2 border-slate-600"
                  style={{ 
                    backgroundColor: glass.color,
                    opacity: 1 - glass.opacity * 0.5
                  }}
                />
                <span className="text-xs flex-1">{glass.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-slate-300 flex items-center gap-2">
            <span>🔩</span> 五金配件
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {hardware.filter(h => h.type === 'handle').map(hw => (
              <button
                key={hw.id}
                onClick={() => updateWindow(selectedWindowId!, { hardware: hw })}
                className={cn(
                  "p-2 rounded-lg flex items-center gap-2 transition-all text-left",
                  selectedWindow.hardware.id === hw.id
                    ? "bg-amber-500/20 ring-2 ring-amber-500"
                    : "bg-slate-700/50 hover:bg-slate-700"
                )}
              >
                <div
                  className="w-6 h-6 rounded-full border-2 border-slate-600"
                  style={{ backgroundColor: hw.color }}
                />
                <span className="text-xs flex-1">{hw.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
