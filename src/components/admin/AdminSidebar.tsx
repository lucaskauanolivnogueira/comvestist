import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Globe,
  Database,
  Users,
  ExternalLink,
  Download,
  LogOut,
  Shield,
  Rocket,
} from 'lucide-react';

interface Props {
  currentTab: 'dashboard' | 'site' | 'sql' | 'candidatos' | 'vercel';
  onSelectTab: (tab: 'dashboard' | 'site' | 'sql' | 'candidatos' | 'vercel') => void;
}

export const AdminSidebar: React.FC<Props> = ({ currentTab, onSelectTab }) => {
  const { currentUser, logout, navigateTo, exportAndDownloadSql, sqlConfig, selectiveProcesses, applications } = useApp();

  return (
    <aside className="w-64 bg-stone-900 text-stone-300 flex flex-col justify-between shrink-0 border-r border-stone-800 min-h-[calc(100vh-73px)]">
      <div>
        {/* Header inside sidebar */}
        <div className="p-5 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-stone-950 flex items-center justify-center font-serif font-bold text-sm">
              C
            </div>
            <div>
              <span className="text-sm font-bold text-white font-serif block">
                Painel Administrativo
              </span>
              <span className="text-[11px] text-stone-400 block truncate">
                Gestão da Comissão
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-3 space-y-1">
          <button
            onClick={() => onSelectTab('dashboard')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
              currentTab === 'dashboard'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'text-stone-300 hover:bg-stone-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <LayoutDashboard className="w-4 h-4" />
              <span>Visão Geral</span>
            </div>
          </button>

          {/* Menu item "Site" as requested in the user brief */}
          <button
            onClick={() => onSelectTab('site')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
              currentTab === 'site'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'text-stone-300 hover:bg-stone-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Globe className="w-4 h-4" />
              <span>Site</span>
            </div>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                currentTab === 'site' ? 'bg-stone-950/20 text-stone-950 font-bold' : 'bg-stone-800 text-amber-400'
              }`}
            >
              Editar Tudo
            </span>
          </button>

          <button
            onClick={() => onSelectTab('sql')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
              currentTab === 'sql'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'text-stone-300 hover:bg-stone-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Database className="w-4 h-4" />
              <span>Banco & phpMyAdmin</span>
            </div>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                currentTab === 'sql' ? 'bg-stone-950/20 text-stone-950 font-bold' : 'bg-stone-800 text-emerald-400'
              }`}
            >
              .SQL
            </span>
          </button>

          <button
            onClick={() => onSelectTab('candidatos')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
              currentTab === 'candidatos'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'text-stone-300 hover:bg-stone-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4" />
              <span>Inscrições Recebidas</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-800 text-stone-300 font-mono tabular-nums">
              {applications.length}
            </span>
          </button>

          <button
            onClick={() => onSelectTab('vercel')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
              currentTab === 'vercel'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'text-stone-300 hover:bg-stone-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Rocket className="w-4 h-4" />
              <span>Deploy na Vercel</span>
            </div>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                currentTab === 'vercel' ? 'bg-stone-950/20 text-stone-950 font-bold' : 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60'
              }`}
            >
              Ativo
            </span>
          </button>
        </nav>

        {/* Database Credentials Summary Box */}
        <div className="p-3 mx-3 mt-4 bg-stone-950/60 rounded-xl border border-stone-800 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-stone-400">
            <span className="flex items-center gap-1.5 font-semibold text-stone-200">
              <Database className="w-3.5 h-3.5 text-amber-400" />
              <span>InfinityFree MySQL</span>
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
          </div>
          <p className="text-[10px] text-stone-400 font-mono truncate">
            BD: {sqlConfig.database}
          </p>
          <p className="text-[10px] text-stone-500 font-mono truncate">
            Host: {sqlConfig.host}
          </p>
          <button
            onClick={exportAndDownloadSql}
            className="w-full mt-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-stone-200 text-[11px] font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar Arquivo .SQL</span>
          </button>
        </div>
      </div>

      {/* Footer in Sidebar */}
      <div className="p-4 border-t border-stone-800 space-y-3">
        {/* Link back to public website */}
        <button
          onClick={() => navigateTo('home')}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-stone-300 bg-stone-800/80 hover:bg-stone-800 hover:text-white rounded-lg transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Ver Site Público</span>
        </button>

        {/* User profile row */}
        <div className="pt-2 flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <div className="w-7 h-7 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center font-bold text-xs">
              <Shield className="w-3.5 h-3.5" />
            </div>
            <div className="truncate">
              <span className="text-xs font-medium text-white block truncate">
                {currentUser?.name || 'Administrador'}
              </span>
              <span className="text-[10px] text-stone-400 block truncate">
                {currentUser?.email || 'admin@vestibular.com'}
              </span>
            </div>
          </div>

          <button
            onClick={logout}
            className="p-1.5 rounded text-stone-400 hover:text-rose-400 hover:bg-stone-800 transition-colors"
            title="Sair do painel"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
