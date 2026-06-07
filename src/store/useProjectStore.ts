import { create } from 'zustand';
import { Project, WindowInstance, QuoteResult, RoomPreset } from '@/types';
import { defaultRoom, rooms } from '@/data/rooms';
import { defaultProfile } from '@/data/profiles';
import { defaultGlass } from '@/data/glasses';
import { defaultHardware } from '@/data/hardware';
import { windowTemplates } from '@/data/templates';

interface ProjectState {
  currentProject: Project | null;
  projects: Project[];
  selectedWindowId: string | null;
  compareProjects: string[];
  
  createProject: (roomId?: string) => void;
  loadProject: (projectId: string) => void;
  saveProject: () => void;
  deleteProject: (projectId: string) => void;
  renameProject: (projectId: string, name: string) => void;
  
  addWindow: (templateId: string) => void;
  updateWindow: (id: string, updates: Partial<WindowInstance>) => void;
  removeWindow: (id: string) => void;
  selectWindow: (id: string | null) => void;
  duplicateWindow: (id: string) => void;
  
  setLighting: (mode: 'day' | 'evening') => void;
  setRoom: (roomId: string) => void;
  
  calculateQuote: () => QuoteResult;
  toggleCompare: (projectId: string) => void;
}

const generateId = () => `win-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const loadProjectsFromStorage = (): Project[] => {
  try {
    const saved = localStorage.getItem('window-projects');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveProjectsToStorage = (projects: Project[]) => {
  try {
    localStorage.setItem('window-projects', JSON.stringify(projects));
  } catch {
    console.error('Failed to save projects');
  }
};

export const useProjectStore = create<ProjectState>((set, get) => ({
  currentProject: null,
  projects: loadProjectsFromStorage(),
  selectedWindowId: null,
  compareProjects: [],

  createProject: (roomId?: string) => {
    const room = roomId 
      ? rooms.find(r => r.id === roomId) || defaultRoom
      : defaultRoom;
    
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      name: `方案 ${get().projects.length + 1}`,
      room,
      windows: [],
      lighting: 'day',
      createdAt: Date.now()
    };
    
    set(state => ({
      currentProject: newProject,
      projects: [...state.projects, newProject],
      selectedWindowId: null
    }));
    
    saveProjectsToStorage([...get().projects, newProject]);
  },

  loadProject: (projectId: string) => {
    const project = get().projects.find(p => p.id === projectId);
    if (project) {
      set({ currentProject: project, selectedWindowId: null });
    }
  },

  saveProject: () => {
    const { currentProject, projects } = get();
    if (!currentProject) return;
    
    const updatedProjects = projects.map(p => 
      p.id === currentProject.id ? currentProject : p
    );
    
    set({ projects: updatedProjects });
    saveProjectsToStorage(updatedProjects);
  },

  deleteProject: (projectId: string) => {
    const { currentProject, projects } = get();
    const updatedProjects = projects.filter(p => p.id !== projectId);
    
    set({
      projects: updatedProjects,
      currentProject: currentProject?.id === projectId 
        ? (updatedProjects[0] || null) 
        : currentProject,
      selectedWindowId: currentProject?.id === projectId ? null : get().selectedWindowId
    });
    
    saveProjectsToStorage(updatedProjects);
  },

  renameProject: (projectId: string, name: string) => {
    const { currentProject, projects } = get();
    const updatedProjects = projects.map(p =>
      p.id === projectId ? { ...p, name } : p
    );
    
    set({
      projects: updatedProjects,
      currentProject: currentProject?.id === projectId
        ? { ...currentProject, name }
        : currentProject
    });
    
    saveProjectsToStorage(updatedProjects);
  },

  addWindow: (templateId: string) => {
    const template = windowTemplates.find(t => t.id === templateId);
    if (!template) return;

    const { currentProject } = get();
    if (!currentProject) return;

    const newWindow: WindowInstance = {
      id: generateId(),
      type: template.type,
      width: template.defaultWidth,
      height: template.defaultHeight,
      position: [0, template.defaultHeight / 2, -currentProject.room.dimensions.depth / 2 + 0.1],
      rotation: [0, 0, 0],
      profile: defaultProfile,
      glass: defaultGlass,
      hardware: defaultHardware,
      panes: template.defaultPanes
    };

    const updatedProject = {
      ...currentProject,
      windows: [...currentProject.windows, newWindow]
    };

    set({
      currentProject: updatedProject,
      selectedWindowId: newWindow.id
    });
    
    get().saveProject();
  },

  updateWindow: (id: string, updates: Partial<WindowInstance>) => {
    const { currentProject } = get();
    if (!currentProject) return;

    const updatedProject = {
      ...currentProject,
      windows: currentProject.windows.map(w =>
        w.id === id ? { ...w, ...updates } : w
      )
    };

    set({ currentProject: updatedProject });
    get().saveProject();
  },

  removeWindow: (id: string) => {
    const { currentProject, selectedWindowId } = get();
    if (!currentProject) return;

    const updatedProject = {
      ...currentProject,
      windows: currentProject.windows.filter(w => w.id !== id)
    };

    set({
      currentProject: updatedProject,
      selectedWindowId: selectedWindowId === id ? null : selectedWindowId
    });
    
    get().saveProject();
  },

  selectWindow: (id: string | null) => {
    set({ selectedWindowId: id });
  },

  duplicateWindow: (id: string) => {
    const { currentProject } = get();
    if (!currentProject) return;

    const sourceWindow = currentProject.windows.find(w => w.id === id);
    if (!sourceWindow) return;

    const newWindow: WindowInstance = {
      ...sourceWindow,
      id: generateId(),
      position: [
        sourceWindow.position[0] + sourceWindow.width + 0.5,
        sourceWindow.position[1],
        sourceWindow.position[2]
      ]
    };

    const updatedProject = {
      ...currentProject,
      windows: [...currentProject.windows, newWindow]
    };

    set({
      currentProject: updatedProject,
      selectedWindowId: newWindow.id
    });
    
    get().saveProject();
  },

  setLighting: (mode: 'day' | 'evening') => {
    const { currentProject } = get();
    if (!currentProject) return;

    set({
      currentProject: { ...currentProject, lighting: mode }
    });
    
    get().saveProject();
  },

  setRoom: (roomId: string) => {
    const { currentProject } = get();
    if (!currentProject) return;

    const room = rooms.find(r => r.id === roomId);
    if (!room) return;

    set({
      currentProject: { ...currentProject, room }
    });
    
    get().saveProject();
  },

  calculateQuote: (): QuoteResult => {
    const { currentProject } = get();
    if (!currentProject) {
      return {
        totalArea: 0,
        profileCost: 0,
        glassCost: 0,
        hardwareCost: 0,
        totalCost: 0
      };
    }

    let totalArea = 0;
    let profileCost = 0;
    let glassCost = 0;
    let hardwareCost = 0;

    currentProject.windows.forEach(window => {
      const area = window.width * window.height;
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
  },

  toggleCompare: (projectId: string) => {
    set(state => {
      const isInCompare = state.compareProjects.includes(projectId);
      return {
        compareProjects: isInCompare
          ? state.compareProjects.filter(id => id !== projectId)
          : [...state.compareProjects, projectId].slice(0, 4)
      };
    });
  }
}));
