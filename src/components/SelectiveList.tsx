import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProcessCategory, SelectiveProcess } from '../types';
import {
  Calendar,
  DollarSign,
  Users,
  ArrowRight,
  Search,
  BookOpen,
  GraduationCap,
  Briefcase,
  Laptop,
} from 'lucide-react';

export const SelectiveList: React.FC = () => {
  const { selectiveProcesses, openProcessDetail } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<'all' | ProcessCategory>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter processes
  const filteredProcesses = selectiveProcesses.filter((proc) => {
    const matchesCategory = selectedCategory === 'all' || proc.category === selectedCategory;
    const matchesSearch =
      proc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proc.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (proc.badgeTag && proc.badgeTag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getStatusLabel = (status: SelectiveProcess['status']) => {
    switch (status) {
      case 'inscricoes_abertas':
        return { text: 'Inscrições Abertas', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' };
      case 'em_andamento':
        return { text: 'Em Andamento', color: 'bg-blue-50 text-blue-800 border-blue-200' };
      case 'encerrado':
        return { text: 'Encerrado', color: 'bg-stone-100 text-stone-700 border-stone-200' };
      case 'em_breve':
        return { text: 'Em Breve', color: 'bg-amber-50 text-amber-800 border-amber-200' };
      default:
        return { text: status, color: 'bg-stone-50 text-stone-700 border-stone-200' };
    }
  };

  return (
    <section id="seletivos" className="py-16 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-stone-200 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">
              <BookOpen className="w-4 h-4" />
              <span>Oportunidades Oficiais</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              Processos Seletivos, Vestibulares & Concursos
            </h2>
            <p className="mt-2 text-stone-600 text-sm sm:text-base max-w-2xl">
              Consulte os editais vigentes, cronogramas de provas, quadro de vagas e acesse a página pública oficial de cada certame.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar seletivo ou curso..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all text-stone-900"
            />
          </div>
        </div>

        {/* Filter Tabs (Interactive segmented control per guidelines) */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              selectedCategory === 'all'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            Todos os Seletivos ({selectiveProcesses.length})
          </button>
          <button
            onClick={() => setSelectedCategory('vestibular')}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              selectedCategory === 'vestibular'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Vestibulares</span>
          </button>
          <button
            onClick={() => setSelectedCategory('concurso')}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              selectedCategory === 'concurso'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Concursos Públicos</span>
          </button>
          <button
            onClick={() => setSelectedCategory('seletivo_ead')}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              selectedCategory === 'seletivo_ead'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>Seleções EAD</span>
          </button>
        </div>

        {/* Grid of Selective Processes */}
        {filteredProcesses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProcesses.map((proc) => {
              const statusInfo = getStatusLabel(proc.status);

              return (
                <div
                  key={proc.id}
                  className="bg-white rounded-xl border border-stone-200/90 overflow-hidden flex flex-col hover:border-amber-400/80 hover:shadow-md transition-all duration-200 group"
                >
                  {/* Card Image */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                    <img
                      src={proc.image}
                      alt={proc.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />

                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded border shadow-sm ${statusInfo.color}`}>
                        {statusInfo.text}
                      </span>
                    </div>

                    {/* Category kicker */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                        {proc.badgeTag || proc.category}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Name of Selective Process */}
                      <h3 className="text-lg font-serif font-bold text-stone-900 group-hover:text-amber-900 transition-colors leading-snug line-clamp-2">
                        {proc.title}
                      </h3>

                      {/* Brief description */}
                      <p className="mt-2.5 text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed">
                        {proc.summary}
                      </p>

                      {/* Key facts unboxed metadata */}
                      <div className="mt-4 pt-4 border-t border-stone-100 space-y-2 text-xs text-stone-600">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-stone-500">
                            <Calendar className="w-3.5 h-3.5 text-stone-400" />
                            <span>Inscrições até:</span>
                          </span>
                          <span className="font-semibold text-stone-800 font-mono">
                            {new Date(proc.registrationEnd).toLocaleDateString('pt-BR')}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-stone-500">
                            <DollarSign className="w-3.5 h-3.5 text-stone-400" />
                            <span>Taxa de inscrição:</span>
                          </span>
                          <span className="font-semibold text-stone-800 font-mono">
                            {proc.fee === 0 ? 'Gratuito' : `R$ ${proc.fee.toFixed(2)}`}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-stone-500">
                            <Users className="w-3.5 h-3.5 text-stone-400" />
                            <span>Vagas ofertadas:</span>
                          </span>
                          <span className="font-semibold text-stone-800 font-mono tabular-nums">
                            {proc.vacancies} vagas
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Button that leads to public page */}
                    <div className="mt-6 pt-3">
                      <button
                        onClick={() => openProcessDetail(proc.id)}
                        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-stone-900 hover:bg-amber-600 text-white font-semibold text-xs tracking-wide transition-colors shadow-sm group-hover:bg-stone-950"
                      >
                        <span>Acessar Página do Seletivo</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-stone-200 p-12 text-center max-w-lg mx-auto">
            <Search className="w-10 h-10 text-stone-400 mx-auto mb-3" />
            <h4 className="text-base font-serif font-bold text-stone-900">Nenhum processo seletivo localizado</h4>
            <p className="text-xs text-stone-500 mt-1">
              Não encontramos seletivos com os termos pesquisados. Tente limpar o filtro de busca.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchTerm('');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
            >
              Ver todos os seletivos
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
