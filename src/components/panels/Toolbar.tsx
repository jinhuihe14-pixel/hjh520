import React, { useState } from 'react';
import { Sun, Moon, Download, Save, Trash2, Plus, FileText, Percent } from 'lucide-react';
import { useProjectStore } from '@/store/useProjectStore';
import { formatPrice, formatArea } from '@/utils/calculator';
import { cn } from '@/lib/utils';

export const Toolbar: React.FC = () => {
  const [showQuote, setShowQuote] = useState(false);
  
  const currentProject = useProjectStore(state => state.currentProject);
  const projects = useProjectStore(state => state.projects);
  const createProject = useProjectStore(state => state.createProject);
  const loadProject = useProjectStore(state => state.loadProject);
  const deleteProject = useProjectStore(state => state.deleteProject);
  const setLighting = useProjectStore(state => state.setLighting);
  const calculateQuote = useProjectStore(state => state.calculateQuote);
  const renameProject = useProjectStore(state => state.renameProject);
  const setDiscount = useProjectStore(state => state.setDiscount);
  
  const [showProjects, setShowProjects] = useState(false);
  const [editingName, setEditingName] = useState<string | null>(null);
  const [editNameValue, setEditNameValue] = useState('');

  const quote = calculateQuote();
  const discount = currentProject?.discount ?? 100;

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setDiscount(100);
      return;
    }
    const num = parseFloat(value);
    if (!isNaN(num)) {
      setDiscount(num);
    }
  };

  const handleDiscountBlur = () => {
    if (discount < 0) setDiscount(0);
    if (discount > 100) setDiscount(100);
  };

  const handleExport = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = `门窗效果图-${currentProject?.name || '方案'}-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  const startRename = (projectId: string, currentName: string) => {
    setEditingName(projectId);
    setEditNameValue(currentName);
  };

  const finishRename = (projectId: string) => {
    if (editNameValue.trim()) {
      renameProject(projectId, editNameValue.trim());
    }
    setEditingName(null);
  };

  return (
    <div className="h-16 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-t border-slate-700/50 flex items-center px-4 gap-4">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowProjects(!showProjects)}
          className="px-4 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg flex items-center gap-2 text-white text-sm transition-colors"
        >
          <FileText size={16} />
          方案列表
          <span className="px-1.5 py-0.5 bg-amber-500/20 text-amber-400 rounded text-xs">
            {projects.length}
          </span>
        </button>

        <button
          onClick={() => createProject()}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium rounded-lg flex items-center gap-2 text-sm transition-colors"
        >
          <Plus size={16} />
          新建方案
        </button>

        {showProjects && (
          <div className="absolute bottom-16 left-4 w-64 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 overflow-hidden">
            <div className="p-3 border-b border-slate-700">
              <h4 className="font-medium text-white text-sm">我的方案</h4>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {projects.length === 0 ? (
                <div className="p-4 text-center text-slate-400 text-sm">
                  暂无方案，点击新建开始设计
                </div>
              ) : (
                projects.map(project => (
                  <div
                    key={project.id}
                    className={cn(
                      "p-3 border-b border-slate-700/50 flex items-center gap-2 group",
                      currentProject?.id === project.id && "bg-amber-500/10"
                    )}
                  >
                    <button
                      onClick={() => {
                        loadProject(project.id);
                        setShowProjects(false);
                      }}
                      className="flex-1 text-left"
                    >
                      {editingName === project.id ? (
                        <input
                          type="text"
                          value={editNameValue}
                          onChange={(e) => setEditNameValue(e.target.value)}
                          onBlur={() => finishRename(project.id)}
                          onKeyDown={(e) => e.key === 'Enter' && finishRename(project.id)}
                          className="w-full bg-slate-700 px-2 py-1 rounded text-sm text-white"
                          autoFocus
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        <>
                          <div className="font-medium text-sm text-white">{project.name}</div>
                          <div className="text-xs text-slate-400">
                            {project.windows.length} 个门窗 · {new Date(project.createdAt).toLocaleDateString()}
                          </div>
                        </>
                      )}
                    </button>
                    {editingName !== project.id && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            startRename(project.id, project.name);
                          }}
                          className="p-1.5 opacity-0 group-hover:opacity-100 hover:bg-slate-700 rounded transition-opacity"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteProject(project.id);
                          }}
                          className="p-1.5 opacity-0 group-hover:opacity-100 hover:bg-red-500/20 text-red-400 rounded transition-opacity"
                        >
                          <Trash2 size={14} />
                        </button>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex-1" />

      {currentProject && (
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-700/50 rounded-lg p-1">
            <button
              onClick={() => setLighting('day')}
              className={cn(
                "px-3 py-1.5 rounded-md flex items-center gap-1.5 text-sm transition-all",
                currentProject.lighting === 'day'
                  ? "bg-amber-500 text-slate-900"
                  : "text-slate-300 hover:text-white"
              )}
            >
              <Sun size={14} />
              白天
            </button>
            <button
              onClick={() => setLighting('evening')}
              className={cn(
                "px-3 py-1.5 rounded-md flex items-center gap-1.5 text-sm transition-all",
                currentProject.lighting === 'evening'
                  ? "bg-amber-500 text-slate-900"
                  : "text-slate-300 hover:text-white"
              )}
            >
              <Moon size={14} />
              傍晚
            </button>
          </div>

          <button
            onClick={() => setShowQuote(!showQuote)}
            className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors"
          >
            <span>💰</span>
            <span>{formatPrice(quote.discountedTotal)}</span>
            {discount !== 100 && (
              <span className="text-xs text-green-300/70 line-through">
                {formatPrice(quote.totalCost)}
              </span>
            )}
          </button>

          {showQuote && (
            <div className="absolute bottom-16 right-40 w-80 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 overflow-hidden">
              <div className="p-4 border-b border-slate-700">
                <h4 className="font-medium text-white">报价明细</h4>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">总面积</span>
                  <span className="text-white font-mono">{formatArea(quote.totalArea)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">型材费用</span>
                  <span className="text-white font-mono">{formatPrice(quote.profileCost)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">玻璃费用</span>
                  <span className="text-white font-mono">{formatPrice(quote.glassCost)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">五金费用</span>
                  <span className="text-white font-mono">{formatPrice(quote.hardwareCost)}</span>
                </div>
                
                <div className="border-t border-slate-700 pt-3 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-slate-400 text-sm flex items-center gap-1">
                      <Percent size={14} />
                      折扣
                    </span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={discount === 100 ? '' : discount}
                        onChange={handleDiscountChange}
                        onBlur={handleDiscountBlur}
                        placeholder="100"
                        className="w-20 bg-slate-700 border border-slate-600 rounded px-2 py-1 text-right text-white text-sm font-mono focus:outline-none focus:border-amber-500"
                      />
                      <span className="text-slate-400 text-sm">%</span>
                    </div>
                  </div>
                  
                  {discount !== 100 && quote.savings > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-400">已优惠</span>
                      <span className="text-green-400 font-mono font-medium">-{formatPrice(quote.savings)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">原价</span>
                    <span className={cn(
                      "font-mono",
                      discount !== 100 ? "text-slate-500 line-through text-sm" : "text-amber-400 font-bold text-lg"
                    )}>
                      {formatPrice(quote.totalCost)}
                    </span>
                  </div>
                  
                  {discount !== 100 && (
                    <div className="flex justify-between items-center border-t border-slate-700 pt-3">
                      <span className="text-white font-medium">折后总价</span>
                      <span className="text-amber-400 font-bold text-lg font-mono">
                        {formatPrice(quote.discountedTotal)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <button
        onClick={handleExport}
        disabled={!currentProject}
        className={cn(
          "px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors",
          currentProject
            ? "bg-blue-500 hover:bg-blue-600 text-white"
            : "bg-slate-700/50 text-slate-500 cursor-not-allowed"
        )}
      >
        <Download size={16} />
        导出图片
      </button>
    </div>
  );
};
