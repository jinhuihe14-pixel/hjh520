import React, { useState } from 'react';
import { Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { windowTemplates } from '@/data/templates';
import { rooms } from '@/data/rooms';
import { useProjectStore } from '@/store/useProjectStore';
import { cn } from '@/lib/utils';

export const MaterialPanel: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    rooms: true,
    windows: true
  });
  
  const createProject = useProjectStore(state => state.createProject);
  const addWindow = useProjectStore(state => state.addWindow);
  const currentProject = useProjectStore(state => state.currentProject);
  const setRoom = useProjectStore(state => state.setRoom);
  const projects = useProjectStore(state => state.projects);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleRoomSelect = (roomId: string) => {
    if (currentProject) {
      setRoom(roomId);
    } else {
      createProject(roomId);
    }
  };

  return (
    <div className="w-64 bg-gradient-to-b from-slate-900 to-slate-950 text-white h-full flex flex-col border-r border-slate-700/50">
      <div className="p-4 border-b border-slate-700/50">
        <h2 className="text-lg font-bold text-amber-400 flex items-center gap-2" style={{ fontFamily: 'Noto Serif SC, serif' }}>
          <span className="text-2xl">🏠</span>
          素材库
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        <div className="rounded-lg overflow-hidden bg-slate-800/50 border border-slate-700/50">
          <button
            onClick={() => toggleSection('rooms')}
            className="w-full px-3 py-2.5 flex items-center justify-between hover:bg-slate-700/50 transition-colors"
          >
            <span className="font-medium text-sm">户型预设</span>
            {expandedSections.rooms ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          
          {expandedSections.rooms && (
            <div className="p-2 pt-0 space-y-2">
              {rooms.map(room => (
                <button
                  key={room.id}
                  onClick={() => handleRoomSelect(room.id)}
                  className={cn(
                    "w-full p-2.5 rounded-lg flex items-center gap-3 transition-all text-left",
                    currentProject?.room.id === room.id
                      ? "bg-amber-500/20 border border-amber-500/50"
                      : "bg-slate-700/30 hover:bg-slate-700/60 border border-transparent"
                  )}
                >
                  <span className="text-2xl">{room.thumbnail}</span>
                  <div>
                    <div className="font-medium text-sm">{room.name}</div>
                    <div className="text-xs text-slate-400">
                      {room.dimensions.width}×{room.dimensions.depth}m
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-lg overflow-hidden bg-slate-800/50 border border-slate-700/50">
          <button
            onClick={() => toggleSection('windows')}
            className="w-full px-3 py-2.5 flex items-center justify-between hover:bg-slate-700/50 transition-colors"
          >
            <span className="font-medium text-sm">门窗款式</span>
            {expandedSections.windows ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          
          {expandedSections.windows && (
            <div className="p-2 pt-0 space-y-2">
              {windowTemplates.map(template => (
                <button
                  key={template.id}
                  onClick={() => currentProject && addWindow(template.id)}
                  disabled={!currentProject}
                  className={cn(
                    "w-full p-2.5 rounded-lg flex items-center gap-3 transition-all text-left group",
                    currentProject
                      ? "bg-slate-700/30 hover:bg-amber-500/20 hover:border-amber-500/50 border border-transparent"
                      : "bg-slate-800/50 opacity-50 cursor-not-allowed border border-transparent"
                  )}
                >
                  <span className="text-2xl">{template.icon}</span>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{template.name}</div>
                    <div className="text-xs text-slate-400">
                      {template.defaultWidth}×{template.defaultHeight}m
                    </div>
                  </div>
                  {currentProject && (
                    <Plus size={16} className="text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {!currentProject && projects.length > 0 && (
          <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-xs text-blue-300 text-center">
              选择户型开始设计，或从下方方案列表加载已有方案
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
