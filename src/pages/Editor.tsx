import React from 'react';
import { Scene3D } from '@/components/editor/Scene3D';
import { MaterialPanel } from '@/components/panels/MaterialPanel';
import { ConfigPanel } from '@/components/panels/ConfigPanel';
import { Toolbar } from '@/components/panels/Toolbar';
import { useProjectStore } from '@/store/useProjectStore';

export const Editor: React.FC = () => {
  const currentProject = useProjectStore(state => state.currentProject);

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-950 overflow-hidden">
      <header className="h-14 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50 flex items-center px-6">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🪟</span>
          <div>
            <h1 className="text-xl font-bold text-amber-400" style={{ fontFamily: 'Noto Serif SC, serif' }}>
              门窗3D预览工具
            </h1>
            <p className="text-xs text-slate-400">断桥铝门窗 · 实时渲染 · 智能报价</p>
          </div>
        </div>
        
        <div className="flex-1" />
        
        <div className="flex items-center gap-4 text-sm text-slate-400">
          {currentProject && (
            <div className="flex items-center gap-2">
              <span className="text-slate-500">当前方案:</span>
              <span className="text-white font-medium">{currentProject.name}</span>
              <span className="text-slate-600">·</span>
              <span>{currentProject.room.name}</span>
              <span className="text-slate-600">·</span>
              <span>{currentProject.windows.length} 个门窗</span>
            </div>
          )}
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <MaterialPanel />
        
        <div className="flex-1 relative">
          <Scene3D className="w-full h-full" />
          
          {!currentProject && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm">
              <div className="text-center max-w-md">
                <div className="text-8xl mb-6 animate-pulse">🏠</div>
                <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'Noto Serif SC, serif' }}>
                  开始您的门窗设计
                </h2>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  从左侧素材库选择户型预设，然后添加门窗款式，
                  <br />实时预览3D效果并生成专业报价
                </p>
                <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🖱️</span>
                    <span>左键旋转</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🖱️</span>
                    <span>右键平移</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🔍</span>
                    <span>滚轮缩放</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <ConfigPanel />
      </div>

      <Toolbar />
    </div>
  );
};
