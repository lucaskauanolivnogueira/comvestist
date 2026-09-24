import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Globe,
  Database,
  Users,
  BookOpen,
  ArrowRight,
  Download,
  Calendar,
  DollarSign,
  Newspaper,
  CheckCircle2,
} from 'lucide-react';

interface Props {
  onSelectTab: (tab: 'dashboard' | 'site' | 'sql' | 'candidatos') => void;
}

export const AdminDashboard: React.FC<Props> = ({ onSelectTab }) => {
  const {
    selectiveProcesses,
    newsList,
    applications,
    sqlConfig,
    exportAndDownloadSql,
    siteSettings,
    currentUser,
  } = useApp();

  const activeProcessesCount = selectiveProcesses.filter((p) => p.status === 'inscricoes_abertas').length;
  const sliderNewsCount = newsList.filter((n) => n.featuredInSlider).length;

  return (
    <div className="space-y-8">
      {/* Top Welcome Card */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-800">
            Painel de Controle Oficial
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
            Olá, {currentUser?.name || 'Administrador'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1.5 max-w-2xl">
            Gerencie o portal da {siteSettings.commissionAcronym}, publique novos editais, notícias para o slider e exporte a estrutura SQL atualizada para o phpMyAdmin.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onSelectTab('site')}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs rounded-lg transition-colors shadow-sm"
          >
            <Globe className="w-4 h-4 text-amber-400" />
            <span>Editar Conteúdo do Site</span>
          </button>

          <button
            onClick={exportAndDownloadSql}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs rounded-lg transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Exportar .SQL phpMyAdmin</span>
          </button>
        </div>
      </div>

      {/* Metrics Row with tabular figures */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Metric 1 */}
        <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-stone-500">Seletivos & Vestibulares</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-800">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-stone-900 tabular-nums">
              {selectiveProcesses.length}
            </div>
            <p className="text-[11px] text-stone-500 mt-1">
              {activeProcessesCount} com inscrições abertas
            </p>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-stone-500">Notícias no Slider</span>
            <div className="p-2 rounded-lg bg-stone-100 text-stone-800">
              <Newspaper className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-stone-900 tabular-nums">
              {sliderNewsCount}
            </div>
            <p className="text-[11px] text-stone-500 mt-1">
              Total de {newsList.length} artigos no portal
            </p>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-stone-500">Inscrições Recebidas</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-stone-900 tabular-nums">
              {applications.length}
            </div>
            <p className="text-[11px] text-emerald-700 mt-1 flex items-center gap-1 font-medium">
              <CheckCircle2 className="w-3 h-3" />
              <span>Candidatos registrados</span>
            </p>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-stone-500">Banco phpMyAdmin</span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-800">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-sm font-bold font-mono text-stone-900 truncate">
              {sqlConfig.database}
            </div>
            <p className="text-[11px] text-stone-500 mt-1 truncate">
              Host: {sqlConfig.host}
            </p>
          </div>
        </div>
      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Quick Management of Selective Processes */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Seletivos e Concursos Cadastrados
              </h3>
              <p className="text-xs text-stone-500">
                Exibidos na lista pública abaixo do slider
              </p>
            </div>
            <button
              onClick={() => onSelectTab('site')}
              className="text-xs font-semibold text-amber-900 hover:underline flex items-center gap-1"
            >
              <span>Gerenciar no menu Site</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-stone-100">
            {selectiveProcesses.map((proc) => (
              <div key={proc.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 truncate">
                  <img
                    src={proc.image}
                    alt={proc.title}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-lg object-cover shrink-0 border border-stone-200"
                  />
                  <div className="truncate">
                    <h4 className="text-sm font-semibold text-stone-900 truncate">
                      {proc.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-stone-500">
                      <span className="capitalize">{proc.category.replace('_', ' ')}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono">Inscrições até {new Date(proc.registrationEnd).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${
                      proc.status === 'inscricoes_abertas'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-stone-100 text-stone-700 border-stone-200'
                    }`}
                  >
                    {proc.status === 'inscricoes_abertas' ? 'Aberto' : 'Encerrado'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: phpMyAdmin Quick sync card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-stone-900 text-white rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
              <Database className="w-4 h-4" />
              <span>Sincronização phpMyAdmin</span>
            </div>

            <h3 className="font-serif font-bold text-lg text-white">
              Exportar para InfinityFree
            </h3>

            <p className="text-xs text-stone-300 leading-relaxed">
              Toda alteração feita no site atualiza os dados em memória. Baixe o arquivo <code className="font-mono text-amber-300">.sql</code> e importe no seu phpMyAdmin para persistir no servidor.
            </p>

            <div className="p-3 bg-stone-800/80 rounded-xl space-y-1.5 text-xs text-stone-300 font-mono">
              <div className="flex justify-between">
                <span className="text-stone-400">Banco:</span>
                <span className="text-amber-300 font-semibold">{sqlConfig.database}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Host:</span>
                <span className="text-stone-200">{sqlConfig.host}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Usuário:</span>
                <span className="text-stone-200">{sqlConfig.user}</span>
              </div>
            </div>

            <button
              onClick={exportAndDownloadSql}
              className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Baixar Arquivo .SQL Completo</span>
            </button>

            <button
              onClick={() => onSelectTab('sql')}
              className="w-full py-2 px-4 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium rounded-lg transition-colors text-center"
            >
              Ver Instruções & Código SQL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
