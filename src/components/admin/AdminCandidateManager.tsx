import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Search, Download, CheckCircle2, Clock, Filter, FileSpreadsheet } from 'lucide-react';

export const AdminCandidateManager: React.FC = () => {
  const { applications, selectiveProcesses } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProcess, setFilterProcess] = useState<string>('all');

  const filtered = applications.filter((app) => {
    const matchesProcess = filterProcess === 'all' || app.processId === filterProcess;
    const matchesSearch =
      app.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.cpf.includes(searchTerm) ||
      app.protocolNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesProcess && matchesSearch;
  });

  const exportCsv = () => {
    if (applications.length === 0) {
      alert('Nenhuma inscrição registrada para exportar.');
      return;
    }

    const headers = ['Protocolo', 'Candidato', 'CPF', 'E-mail', 'Telefone', 'Processo Seletivo', 'Opção de Curso', 'Status', 'Data Inscrição'];
    const rows = applications.map((a) => [
      a.protocolNumber,
      `"${a.candidateName.replace(/"/g, '""')}"`,
      a.cpf,
      a.email,
      a.phone,
      `"${a.processTitle.replace(/"/g, '""')}"`,
      `"${a.chosenCourse.replace(/"/g, '""')}"`,
      a.status,
      a.registrationDate,
    ]);

    const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map((r) => r.join(';'))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `inscricoes_candidatos_${new Date().toISOString().substring(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800">
            <Users className="w-4 h-4" />
            <span>Gestão de Inscrições</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-stone-900 mt-1">
            Candidatos Inscritos nos Seletivos
          </h2>
          <p className="text-xs text-stone-600 mt-1">
            Consulte a lista de protocolos gerados pela ficha online pública do portal.
          </p>
        </div>

        <button
          onClick={exportCsv}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs rounded-lg transition-colors shadow-sm"
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
          <span>Exportar Planilha (CSV)</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-stone-200 p-4 flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nome, CPF ou protocolo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
          />
        </div>

        <div className="w-full sm:w-72">
          <select
            value={filterProcess}
            onChange={(e) => setFilterProcess(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 text-stone-900"
          >
            <option value="all">Filtrar por todos os certames</option>
            {selectiveProcesses.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table of candidates */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold uppercase text-[11px] tracking-wider">
                <th className="py-3 px-4">Protocolo</th>
                <th className="py-3 px-4">Candidato</th>
                <th className="py-3 px-4">Processo Seletivo</th>
                <th className="py-3 px-4">Curso / Opção</th>
                <th className="py-3 px-4">Data & Horário</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.length > 0 ? (
                filtered.map((app) => (
                  <tr key={app.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-amber-900">
                      {app.protocolNumber}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-stone-900 block">{app.candidateName}</span>
                      <span className="text-[11px] text-stone-500 font-mono">CPF: {app.cpf}</span>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs truncate text-stone-700">
                      {app.processTitle}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-stone-900">
                      {app.chosenCourse}
                    </td>
                    <td className="py-3.5 px-4 text-stone-500 font-mono">
                      {app.registrationDate}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-semibold border ${
                          app.status === 'Inscrição Confirmada'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}
                      >
                        {app.status === 'Inscrição Confirmada' ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Clock className="w-3 h-3 text-amber-600" />
                        )}
                        <span>{app.status}</span>
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-stone-500">
                    Nenhuma inscrição encontrada com os filtros selecionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
