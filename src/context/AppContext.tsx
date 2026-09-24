import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SelectiveProcess,
  NewsItem,
  SiteSettings,
  AdminUser,
  CandidateApplication,
  SqlConfig,
} from '../types';
import {
  initialSiteSettings,
  initialNews,
  initialSelectiveProcesses,
  initialSqlConfig,
} from '../data/initialData';
import { generatePhpMyAdminSql, downloadSqlFile } from '../utils/sqlGenerator';

interface AppContextType {
  siteSettings: SiteSettings;
  newsList: NewsItem[];
  selectiveProcesses: SelectiveProcess[];
  applications: CandidateApplication[];
  currentUser: AdminUser | null;
  sqlConfig: SqlConfig;
  activeView: 'home' | 'process-detail' | 'admin' | 'all-news';
  selectedProcessId: string | null;
  selectedNewsId: string | null;
  
  // Navigation actions
  navigateTo: (view: 'home' | 'process-detail' | 'admin' | 'all-news', processId?: string) => void;
  openProcessDetail: (processId: string) => void;
  openNewsModal: (newsId: string) => void;
  closeNewsModal: () => void;

  // Process management
  saveSelectiveProcess: (process: SelectiveProcess) => void;
  deleteSelectiveProcess: (id: string) => void;

  // News management
  saveNewsItem: (news: NewsItem) => void;
  deleteNewsItem: (id: string) => void;

  // Settings & DB
  updateSiteSettings: (settings: SiteSettings) => void;
  updateSqlConfig: (config: SqlConfig) => void;
  exportAndDownloadSql: () => void;
  getSqlContent: () => string;

  // Candidate enrollments
  addApplication: (application: Omit<CandidateApplication, 'id' | 'registrationDate' | 'protocolNumber'>) => CandidateApplication;

  // Auth
  login: (email: string, pass: string) => boolean;
  registerUser: (name: string, email: string, pass: string) => boolean;
  logout: () => void;
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  SETTINGS: 'covest_site_settings',
  NEWS: 'covest_news_list',
  PROCESSES: 'covest_selective_processes',
  APPLICATIONS: 'covest_applications',
  SQL_CONFIG: 'covest_sql_config',
  ADMIN_USER: 'covest_admin_session',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return saved ? JSON.parse(saved) : initialSiteSettings;
  });

  const [newsList, setNewsList] = useState<NewsItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NEWS);
    return saved ? JSON.parse(saved) : initialNews;
  });

  const [selectiveProcesses, setSelectiveProcesses] = useState<SelectiveProcess[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROCESSES);
    return saved ? JSON.parse(saved) : initialSelectiveProcesses;
  });

  const [applications, setApplications] = useState<CandidateApplication[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    return saved ? JSON.parse(saved) : [];
  });

  const [sqlConfig, setSqlConfig] = useState<SqlConfig>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SQL_CONFIG);
    return saved ? JSON.parse(saved) : initialSqlConfig;
  });

  const [currentUser, setCurrentUser] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ADMIN_USER);
    return saved ? JSON.parse(saved) : null;
  });

  const [activeView, setActiveView] = useState<'home' | 'process-detail' | 'admin' | 'all-news'>('home');
  const [selectedProcessId, setSelectedProcessId] = useState<string | null>(null);
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(siteSettings));
  }, [siteSettings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(newsList));
  }, [newsList]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROCESSES, JSON.stringify(selectiveProcesses));
  }, [selectiveProcesses]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SQL_CONFIG, JSON.stringify(sqlConfig));
  }, [sqlConfig]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_USER);
    }
  }, [currentUser]);

  const navigateTo = (view: 'home' | 'process-detail' | 'admin' | 'all-news', processId?: string) => {
    setActiveView(view);
    if (processId) {
      setSelectedProcessId(processId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openProcessDetail = (processId: string) => {
    setSelectedProcessId(processId);
    setActiveView('process-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openNewsModal = (newsId: string) => {
    setSelectedNewsId(newsId);
  };

  const closeNewsModal = () => {
    setSelectedNewsId(null);
  };

  const saveSelectiveProcess = (process: SelectiveProcess) => {
    setSelectiveProcesses((prev) => {
      const idx = prev.findIndex((p) => p.id === process.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = process;
        return next;
      }
      return [process, ...prev];
    });
  };

  const deleteSelectiveProcess = (id: string) => {
    setSelectiveProcesses((prev) => prev.filter((p) => p.id !== id));
  };

  const saveNewsItem = (news: NewsItem) => {
    setNewsList((prev) => {
      const idx = prev.findIndex((n) => n.id === news.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = news;
        return next;
      }
      return [news, ...prev];
    });
  };

  const deleteNewsItem = (id: string) => {
    setNewsList((prev) => prev.filter((n) => n.id !== id));
  };

  const updateSiteSettings = (settings: SiteSettings) => {
    setSiteSettings(settings);
  };

  const updateSqlConfig = (config: SqlConfig) => {
    setSqlConfig(config);
  };

  const getSqlContent = (): string => {
    return generatePhpMyAdminSql(sqlConfig, siteSettings, newsList, selectiveProcesses, applications);
  };

  const exportAndDownloadSql = () => {
    const sql = getSqlContent();
    downloadSqlFile(sql, `${sqlConfig.database}.sql`);
  };

  const addApplication = (appData: Omit<CandidateApplication, 'id' | 'registrationDate' | 'protocolNumber'>) => {
    const now = new Date();
    const dateStr = now.toLocaleDateString('pt-BR') + ' ' + now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const randomCode = Math.floor(10000 + Math.random() * 90000);
    const protocolNumber = `COVEST-${now.getFullYear()}-${randomCode}`;

    const newApp: CandidateApplication = {
      ...appData,
      id: 'app-' + Date.now(),
      registrationDate: dateStr,
      protocolNumber,
    };

    setApplications((prev) => [newApp, ...prev]);
    return newApp;
  };

  const login = (email: string, _pass: string): boolean => {
    // Simple authentication for admin portal
    if (email) {
      const user: AdminUser = {
        id: 'user-' + Date.now(),
        name: email.split('@')[0].toUpperCase(),
        email: email,
        role: 'Administrador Geral',
        lastLogin: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      };
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const registerUser = (name: string, email: string, _pass: string): boolean => {
    if (name && email) {
      const user: AdminUser = {
        id: 'user-' + Date.now(),
        name,
        email,
        role: 'Administrador Geral',
        lastLogin: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      };
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const resetAllData = () => {
    setSiteSettings(initialSiteSettings);
    setNewsList(initialNews);
    setSelectiveProcesses(initialSelectiveProcesses);
    setApplications([]);
    setSqlConfig(initialSqlConfig);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.NEWS);
    localStorage.removeItem(STORAGE_KEYS.PROCESSES);
    localStorage.removeItem(STORAGE_KEYS.APPLICATIONS);
    localStorage.removeItem(STORAGE_KEYS.SQL_CONFIG);
  };

  return (
    <AppContext.Provider
      value={{
        siteSettings,
        newsList,
        selectiveProcesses,
        applications,
        currentUser,
        sqlConfig,
        activeView,
        selectedProcessId,
        selectedNewsId,
        navigateTo,
        openProcessDetail,
        openNewsModal,
        closeNewsModal,
        saveSelectiveProcess,
        deleteSelectiveProcess,
        saveNewsItem,
        deleteNewsItem,
        updateSiteSettings,
        updateSqlConfig,
        exportAndDownloadSql,
        getSqlContent,
        addApplication,
        login,
        registerUser,
        logout,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
