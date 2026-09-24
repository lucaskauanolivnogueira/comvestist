import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { NewsSlider } from './components/NewsSlider';
import { NewsModal } from './components/NewsModal';
import { SelectiveList } from './components/SelectiveList';
import { SelectiveDetail } from './components/SelectiveDetail';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminSidebar } from './components/admin/AdminSidebar';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminSiteManager } from './components/admin/AdminSiteManager';
import { AdminSqlExport } from './components/admin/AdminSqlExport';
import { AdminCandidateManager } from './components/admin/AdminCandidateManager';
import { Shield, ExternalLink, Calendar, Award, CheckCircle2 } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeView, currentUser, navigateTo, siteSettings } = useApp();
  const [adminTab, setAdminTab] = useState<'dashboard' | 'site' | 'sql' | 'candidatos'>('dashboard');

  // --- Admin View ---
  if (activeView === 'admin') {
    if (!currentUser) {
      return <AdminLogin />;
    }

    return (
      <div className="min-h-screen bg-stone-100 flex flex-col">
        {/* Admin Top Header */}
        <header className="h-18 bg-white border-b border-stone-200 px-6 flex items-center justify-between z-30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-stone-900 text-amber-400 flex items-center justify-center font-serif text-lg font-bold">
              C
            </div>
            <div>
              <span className="font-serif font-bold text-stone-900 text-sm block">
                {siteSettings.commissionAcronym} · Painel Administrativo
              </span>
              <span className="text-xs text-stone-500 block">
                Controle do Portal & Exportador phpMyAdmin
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateTo('home')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors border border-stone-200"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Ver Site Público</span>
            </button>
          </div>
        </header>

        {/* Sidebar + Main Content */}
        <div className="flex-1 flex overflow-hidden">
          <AdminSidebar currentTab={adminTab} onSelectTab={setAdminTab} />
          
          <main className="flex-1 overflow-y-auto p-6 sm:p-8">
            <div className="max-w-6xl mx-auto">
              {adminTab === 'dashboard' && <AdminDashboard onSelectTab={setAdminTab} />}
              {adminTab === 'site' && <AdminSiteManager />}
              {adminTab === 'sql' && <AdminSqlExport />}
              {adminTab === 'candidatos' && <AdminCandidateManager />}
            </div>
          </main>
        </div>
      </div>
    );
  }

  // --- Public Process Detail View ---
  if (activeView === 'process-detail') {
    return (
      <div className="min-h-screen flex flex-col bg-stone-50">
        <Header />
        <main className="flex-1">
          <SelectiveDetail />
        </main>
        <Footer />
        <NewsModal />
      </div>
    );
  }

  // --- Public Home View ---
  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Header />

      <main className="flex-1">
        {/* 1. Slider informando as últimas notícias */}
        <NewsSlider />

        {/* 2. Lista de seletivos, vestibulares e concursos abertos (logo abaixo do slider) */}
        <SelectiveList />

        {/* 3. Institutional Trust & Candidate Support Ribbon */}
        <section className="py-12 bg-white border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-50 text-amber-900 rounded-xl border border-amber-200 shrink-0">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-stone-900">
                    Segurança e Lisura
                  </h4>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    Processos conduzidos com rígidos protocolos de sigilo, biometria e auditoria permanente.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-stone-100 text-stone-900 rounded-xl border border-stone-200 shrink-0">
                  <Calendar className="w-6 h-6 text-stone-800" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-stone-900">
                    Cronogramas Transparentes
                  </h4>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    Acompanhamento público de todas as fases, retificações, gabaritos e convocações oficiais.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-50 text-emerald-900 rounded-xl border border-emerald-200 shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-stone-900">
                    Inclusão e Acessibilidade
                  </h4>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    Reserva legal de vagas para cotas socioeconômicas, raciais e atendimento especializado nos exames.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <NewsModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
