import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Menu, X, User, ArrowRight, AlertTriangle, Info, Bell } from 'lucide-react';

export const Header: React.FC = () => {
  const { siteSettings, navigateTo, activeView, currentUser } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const banner = siteSettings.alertBanner;

  return (
    <header className="w-full bg-white border-b border-stone-200 sticky top-0 z-40 transition-colors">
      {/* Alert banner if active */}
      {banner && banner.active && (
        <div className="bg-amber-50 border-b border-amber-200/80 px-4 py-2 text-xs text-amber-900 font-medium">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 truncate">
              {banner.type === 'warning' ? (
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
              ) : banner.type === 'urgent' ? (
                <Bell className="w-4 h-4 text-rose-700 shrink-0" />
              ) : (
                <Info className="w-4 h-4 text-amber-700 shrink-0" />
              )}
              <span className="truncate">{banner.text}</span>
            </div>
            {banner.linkText && (
              <a
                href={banner.linkUrl || '#seletivos'}
                onClick={(e) => {
                  if (banner.linkUrl?.startsWith('#')) {
                    e.preventDefault();
                    if (activeView !== 'home') navigateTo('home');
                    const target = document.querySelector(banner.linkUrl);
                    if (target) target.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="shrink-0 flex items-center gap-1 font-semibold text-amber-950 underline hover:text-amber-800 transition-colors"
              >
                <span>{banner.linkText}</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      )}

      {/* Top Bar 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single Brand Wordmark */}
        <button
          onClick={() => navigateTo('home')}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-lg bg-stone-900 text-amber-400 flex items-center justify-center font-serif text-xl font-bold tracking-tight shadow-sm group-hover:bg-amber-950 transition-colors">
            C
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-stone-900 font-serif block group-hover:text-amber-900 transition-colors">
              {siteSettings.commissionAcronym} · Portal de Seleções
            </span>
            <span className="text-xs text-stone-700 block truncate max-w-[240px] sm:max-w-xs">
              {siteSettings.institutionName}
            </span>
          </div>
        </button>

        {/* Zone 2: Clean Text Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <button
            onClick={() => navigateTo('home')}
            className={`hover:text-stone-900 transition-colors py-1 ${
              activeView === 'home' ? 'text-stone-900 font-semibold border-b-2 border-stone-900' : ''
            }`}
          >
            Início
          </button>
          <button
            onClick={() => {
              if (activeView !== 'home') {
                navigateTo('home');
                setTimeout(() => {
                  document.getElementById('seletivos')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              } else {
                document.getElementById('seletivos')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="hover:text-stone-900 transition-colors py-1"
          >
            Seletivos & Concursos
          </button>
          <button
            onClick={() => {
              if (activeView !== 'home') {
                navigateTo('home');
                setTimeout(() => {
                  document.getElementById('noticias')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              } else {
                document.getElementById('noticias')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="hover:text-stone-900 transition-colors py-1"
          >
            Notícias
          </button>
          <button
            onClick={() => {
              if (activeView !== 'home') {
                navigateTo('home');
                setTimeout(() => {
                  document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              } else {
                document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="hover:text-stone-900 transition-colors py-1"
          >
            Atendimento
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (activeView !== 'home') navigateTo('home');
              const el = document.getElementById('seletivos');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
          >
            <User className="w-4 h-4 text-stone-500" />
            <span>Área do Candidato</span>
          </button>

          <button
            onClick={() => navigateTo('admin')}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors shadow-sm"
          >
            <Shield className="w-3.5 h-3.5 text-amber-300" />
            <span>{currentUser ? 'Painel ADM' : 'Acesso ADM'}</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-600 hover:text-stone-900 focus:outline-none"
            aria-label="Menu Principal"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-stone-50 px-4 pt-3 pb-5 space-y-2">
          <button
            onClick={() => {
              navigateTo('home');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-200/60 rounded-md"
          >
            Início
          </button>
          <button
            onClick={() => {
              navigateTo('home');
              setMobileMenuOpen(false);
              setTimeout(() => {
                document.getElementById('seletivos')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="w-full text-left px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-200/60 rounded-md"
          >
            Seletivos & Concursos Abertos
          </button>
          <button
            onClick={() => {
              navigateTo('home');
              setMobileMenuOpen(false);
              setTimeout(() => {
                document.getElementById('noticias')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="w-full text-left px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-200/60 rounded-md"
          >
            Notícias do Vestibular
          </button>
          <button
            onClick={() => {
              navigateTo('home');
              setMobileMenuOpen(false);
              setTimeout(() => {
                document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="w-full text-left px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-200/60 rounded-md"
          >
            Canais de Atendimento
          </button>
          <div className="pt-2 border-t border-stone-200 flex flex-col gap-2">
            <button
              onClick={() => {
                navigateTo('admin');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-white bg-stone-900 rounded-md"
            >
              <Shield className="w-3.5 h-3.5 text-amber-300" />
              <span>{currentUser ? 'Painel Administrativo' : 'Acesso ao Painel ADM'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
