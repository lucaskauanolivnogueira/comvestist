import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CandidateRegistrationModal } from './CandidateRegistrationModal';
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  Users,
  FileText,
  Clock,
  Download,
  AlertCircle,
  HelpCircle,
  Mail,
  GraduationCap,
} from 'lucide-react';

export const SelectiveDetail: React.FC = () => {
  const { selectedProcessId, selectiveProcesses, navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState<'sobre' | 'cronograma' | 'documentos' | 'suporte'>('sobre');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [downloadSuccessMsg, setDownloadSuccessMsg] = useState('');

  const process = selectiveProcesses.find((p) => p.id === selectedProcessId);

  if (!process) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-serif font-bold text-stone-900">Processo Seletivo não encontrado</h2>
        <p className="text-stone-600 mt-2">O certame solicitado pode ter sido encerrado ou o link é inválido.</p>
        <button
          onClick={() => navigateTo('home')}
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para a página inicial</span>
        </button>
      </div>
    );
  }

  const handleSimulatedDownload = (docTitle: string) => {
    // Generate simulated document download for demo
    const content = `PUBLICAÇÃO OFICIAL - COMISSÃO ORGANIZADORA DO VESTIBULAR (COVEST)
================================================================================
DOCUMENTO: ${docTitle}
PROCESSO SELETIVO: ${process.title}
DATA DE PUBLICAÇÃO: ${new Date().toLocaleDateString('pt-BR')}
CÓDIGO DE AUTENTICIDADE: COVEST-DOC-${Date.now()}
================================================================================

1. DAS DISPOSIÇÕES PRELIMINARES
A Comissão Organizadora, no uso de suas atribuições legais e regimentais, torna pública a presente norma integrante do processo seletivo supracitado.

2. REQUISITOS E CRONOGRAMA
Os candidatos devem observar rigorosamente as datas limites de inscrição, homologação e recursos constantes no cronograma oficial do certame.

3. DA HOMOLOGAÇÃO
Este documento possui fé pública e sua autenticidade pode ser atestada no Portal da Comissão Organizadora.

Comissão Permanente de Seleções e Concursos
Campus Universitário Central`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${docTitle.toLowerCase().replace(/[^a-z0-9]/gi, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccessMsg(`Download de "${docTitle}" iniciado com sucesso.`);
    setTimeout(() => setDownloadSuccessMsg(''), 3500);
  };

  const getStatusBadge = () => {
    switch (process.status) {
      case 'inscricoes_abertas':
        return <span className="px-3 py-1 text-xs font-semibold rounded bg-emerald-100 text-emerald-900 border border-emerald-300">Inscrições Abertas</span>;
      case 'em_andamento':
        return <span className="px-3 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-900 border border-blue-300">Em Andamento</span>;
      case 'encerrado':
        return <span className="px-3 py-1 text-xs font-semibold rounded bg-stone-200 text-stone-800 border border-stone-300">Encerrado</span>;
      case 'em_breve':
        return <span className="px-3 py-1 text-xs font-semibold rounded bg-amber-100 text-amber-900 border border-amber-300">Em Breve</span>;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-24">
      {/* Top Breadcrumb navigation */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-2 truncate">
            <button
              onClick={() => navigateTo('home')}
              className="hover:text-stone-900 transition-colors flex items-center gap-1 font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Início</span>
            </button>
            <span aria-hidden="true">/</span>
            <span className="text-stone-600">Processos Seletivos</span>
            <span aria-hidden="true">/</span>
            <span className="text-stone-900 font-semibold truncate max-w-xs">{process.title}</span>
          </div>

          <div className="hidden sm:block">
            Página Pública Oficial
          </div>
        </div>
      </div>

      {/* Main Process Banner Header */}
      <div className="relative bg-stone-900 text-white overflow-hidden border-b border-stone-800">
        <div className="absolute inset-0 z-0">
          <img
            src={process.image}
            alt={process.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/90 to-stone-900/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                {getStatusBadge()}
                <span className="text-amber-400 font-semibold text-xs uppercase tracking-wider">
                  {process.badgeTag || process.category}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
                {process.title}
              </h1>

              <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-3xl">
                {process.summary}
              </p>

              {/* Key metadata banner */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-stone-800 text-xs">
                <div>
                  <span className="text-stone-400 block mb-1">Período de Inscrição</span>
                  <div className="flex items-center gap-1.5 font-semibold text-stone-100 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{new Date(process.registrationStart).toLocaleDateString('pt-BR')} a {new Date(process.registrationEnd).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>

                <div>
                  <span className="text-stone-400 block mb-1">Data da Prova</span>
                  <div className="flex items-center gap-1.5 font-semibold text-stone-100 font-mono">
                    <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{new Date(process.examDate).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>

                <div>
                  <span className="text-stone-400 block mb-1">Taxa de Inscrição</span>
                  <div className="flex items-center gap-1.5 font-semibold text-stone-100 font-mono">
                    <DollarSign className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{process.fee === 0 ? 'Gratuito' : `R$ ${process.fee.toFixed(2)}`}</span>
                  </div>
                </div>

                <div>
                  <span className="text-stone-400 block mb-1">Total de Vagas</span>
                  <div className="flex items-center gap-1.5 font-semibold text-stone-100 font-mono tabular-nums">
                    <Users className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{process.vacancies} vagas</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card / CTA */}
            <div className="lg:col-span-4 bg-white text-stone-900 rounded-xl p-6 shadow-xl border border-stone-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 block mb-1">
                Inscrições Online
              </span>
              <h3 className="text-lg font-serif font-bold text-stone-900">
                Participe deste certame
              </h3>
              <p className="text-xs text-stone-600 mt-1 mb-5">
                Preencha o formulário eletrônico para emitir seu protocolo e garantir sua participação.
              </p>

              <button
                onClick={() => setIsRegisterModalOpen(true)}
                className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm rounded-lg transition-colors shadow-md flex items-center justify-center gap-2 mb-3"
              >
                <span>Fazer Inscrição Agora</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('documentos');
                  document.getElementById('detalhes-seletivo')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <FileText className="w-3.5 h-3.5 text-stone-600" />
                <span>Consultar Edital Completo</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div id="detalhes-seletivo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {downloadSuccessMsg && (
          <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
            <Download className="w-4 h-4 text-emerald-600" />
            <span>{downloadSuccessMsg}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex border-b border-stone-200 space-x-2 sm:space-x-8 overflow-x-auto pb-px">
          <button
            onClick={() => setActiveTab('sobre')}
            className={`py-3 px-2 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'sobre'
                ? 'border-amber-600 text-amber-900'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            Apresentação & Vagas
          </button>
          <button
            onClick={() => setActiveTab('cronograma')}
            className={`py-3 px-2 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'cronograma'
                ? 'border-amber-600 text-amber-900'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            Cronograma Oficial ({process.schedule.length})
          </button>
          <button
            onClick={() => setActiveTab('documentos')}
            className={`py-3 px-2 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'documentos'
                ? 'border-amber-600 text-amber-900'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            Editais & Documentos ({process.documents.length})
          </button>
          <button
            onClick={() => setActiveTab('suporte')}
            className={`py-3 px-2 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'suporte'
                ? 'border-amber-600 text-amber-900'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            Fale com a Comissão
          </button>
        </div>

        {/* Tab 1: Apresentação & Vagas */}
        {activeTab === 'sobre' && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <section className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 space-y-4">
                <h3 className="text-xl font-serif font-bold text-stone-900">
                  Visão Geral do Processo Seletivo
                </h3>
                <div className="prose prose-stone max-w-none text-stone-700 text-sm sm:text-base leading-relaxed space-y-4">
                  {process.description.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </section>

              {/* Requirements */}
              <section className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 space-y-4">
                <h3 className="text-xl font-serif font-bold text-stone-900">
                  Requisitos para Participação
                </h3>
                <ul className="space-y-3 text-sm text-stone-700">
                  {process.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 font-mono">
                        {idx + 1}
                      </span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Course & Vacancy Table */}
              {process.courses && process.courses.length > 0 && (
                <section className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-serif font-bold text-stone-900">
                      Quadro de Vagas & Cursos
                    </h3>
                    <span className="text-xs text-stone-500">
                      Total: {process.vacancies} vagas
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-stone-200 bg-stone-50 text-stone-600 uppercase text-[11px] tracking-wider font-semibold">
                          <th className="py-3 px-4">Curso / Cargo</th>
                          <th className="py-3 px-4">Turno</th>
                          <th className="py-3 px-4">Campus / Unidade</th>
                          <th className="py-3 px-4 text-right">Vagas</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {process.courses.map((course) => (
                          <tr key={course.id} className="hover:bg-stone-50/80 transition-colors">
                            <td className="py-3.5 px-4 font-semibold text-stone-900">
                              {course.name}
                            </td>
                            <td className="py-3.5 px-4 text-stone-600">
                              {course.shift}
                            </td>
                            <td className="py-3.5 px-4 text-stone-600">
                              {course.campus}
                            </td>
                            <td className="py-3.5 px-4 text-right font-mono font-semibold text-amber-950 tabular-nums">
                              {course.vacancies}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar quick actions */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-4">
                <h4 className="font-serif font-bold text-base text-stone-900">
                  Resumo das Datas
                </h4>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between pb-2 border-b border-stone-100">
                    <span className="text-stone-500">Abertura:</span>
                    <span className="font-semibold text-stone-800 font-mono">
                      {new Date(process.registrationStart).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-stone-100">
                    <span className="text-stone-500">Encerramento Inscrições:</span>
                    <span className="font-semibold text-amber-800 font-mono">
                      {new Date(process.registrationEnd).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-stone-100">
                    <span className="text-stone-500">Aplicação da Prova:</span>
                    <span className="font-semibold text-stone-800 font-mono">
                      {new Date(process.examDate).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsRegisterModalOpen(true)}
                  className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs rounded-lg transition-colors shadow-sm"
                >
                  Realizar Inscrição Online
                </button>
              </div>

              {/* Commission card */}
              <div className="bg-stone-100/70 rounded-xl border border-stone-200 p-6 text-xs text-stone-700 space-y-2">
                <div className="flex items-center gap-2 font-bold text-stone-900">
                  <GraduationCap className="w-4 h-4 text-amber-800" />
                  <span>Comissão Permanente do Vestibular</span>
                </div>
                <p className="text-stone-600">
                  Dúvidas sobre o certame devem ser direcionadas formalmente por meio do e-mail oficial:
                </p>
                <div className="pt-2">
                  <a
                    href={`mailto:${process.contactEmail}`}
                    className="font-mono text-amber-900 hover:underline font-semibold block truncate"
                  >
                    {process.contactEmail}
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Cronograma Oficial */}
        {activeTab === 'cronograma' && (
          <div className="mt-8 max-w-4xl space-y-6">
            <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8">
              <h3 className="text-xl font-serif font-bold text-stone-900 mb-2">
                Linha do Tempo & Etapas do Certame
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mb-8">
                Fique atento aos prazos regimentais. O não cumprimento de qualquer etapa elimina o candidato do processo.
              </p>

              <div className="relative border-l-2 border-stone-200 ml-4 space-y-8 pl-6 pb-2">
                {process.schedule.map((step, idx) => (
                  <div key={step.id} className="relative group">
                    {/* Circle marker */}
                    <div
                      className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 bg-white transition-colors ${
                        step.status === 'concluido'
                          ? 'border-emerald-600 bg-emerald-600'
                          : step.status === 'atual'
                          ? 'border-amber-500 bg-amber-500 ring-4 ring-amber-100'
                          : 'border-stone-400'
                      }`}
                    />

                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <h4 className="font-semibold text-stone-900 text-sm sm:text-base">
                        {step.title}
                      </h4>
                      <span className="text-xs font-mono font-semibold text-stone-600 shrink-0">
                        {step.date}
                      </span>
                    </div>

                    {step.description && (
                      <p className="text-xs text-stone-500 mt-1">
                        {step.description}
                      </p>
                    )}

                    <div className="mt-2">
                      <span
                        className={`inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded ${
                          step.status === 'concluido'
                            ? 'bg-emerald-50 text-emerald-800'
                            : step.status === 'atual'
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-stone-100 text-stone-600'
                        }`}
                      >
                        {step.status === 'concluido' ? 'Etapa Concluída' : step.status === 'atual' ? 'Etapa em Andamento' : 'Etapa Futura'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Editais & Documentos */}
        {activeTab === 'documentos' && (
          <div className="mt-8 max-w-4xl space-y-6">
            <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8">
              <h3 className="text-xl font-serif font-bold text-stone-900 mb-2">
                Publicações Oficiais, Editais & Anexos
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mb-6">
                Todos os editais têm validade legal e devem ser lidos integralmente antes da realização da prova.
              </p>

              <div className="space-y-3">
                {process.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-4 rounded-lg border border-stone-200 hover:border-amber-300 hover:bg-stone-50/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-lg bg-amber-50 text-amber-800 shrink-0 mt-0.5">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-stone-900 text-sm">
                          {doc.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
                          <span>Publicado em {doc.publishDate}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono">{doc.fileSize}</span>
                          <span aria-hidden="true">·</span>
                          <span className="uppercase text-[10px] font-bold text-amber-800">{doc.type}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleSimulatedDownload(doc.title)}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs rounded-lg transition-colors shrink-0"
                    >
                      <Download className="w-3.5 h-3.5 text-amber-300" />
                      <span>Baixar Documento</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Suporte & Fale com a Comissão */}
        {activeTab === 'suporte' && (
          <div className="mt-8 max-w-4xl space-y-6">
            <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 space-y-6">
              <h3 className="text-xl font-serif font-bold text-stone-900">
                Atendimento Oficial ao Candidato
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border border-stone-200 bg-stone-50 space-y-2">
                  <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
                    <Mail className="w-4 h-4 text-amber-800" />
                    <span>E-mail da Comissão do Seletivo</span>
                  </div>
                  <p className="text-xs text-stone-600">
                    Respostas em até 24 horas úteis para dúvidas editalícias.
                  </p>
                  <a
                    href={`mailto:${process.contactEmail}`}
                    className="text-xs font-mono font-bold text-amber-900 hover:underline block"
                  >
                    {process.contactEmail}
                  </a>
                </div>

                <div className="p-4 rounded-lg border border-stone-200 bg-stone-50 space-y-2">
                  <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
                    <HelpCircle className="w-4 h-4 text-amber-800" />
                    <span>Recursos Administrativos</span>
                  </div>
                  <p className="text-xs text-stone-600">
                    O formulário de recurso deve ser submetido dentro da janela prevista no cronograma oficial.
                  </p>
                </div>
              </div>

              {/* FAQs */}
              <div className="pt-4 border-t border-stone-200 space-y-4">
                <h4 className="font-serif font-bold text-base text-stone-900">
                  Perguntas Frequentes
                </h4>

                <div className="space-y-3 text-xs text-stone-700">
                  <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                    <p className="font-semibold text-stone-900 mb-1">Como solicito atendimento especializado para a prova?</p>
                    <p className="text-stone-600">O candidato com necessidades específicas deve preencher o formulário específico e anexar laudo médico até a data final das inscrições.</p>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                    <p className="font-semibold text-stone-900 mb-1">Quando e onde será divulgado o local de prova?</p>
                    <p className="text-stone-600">O Cartão de Confirmação de Inscrição (CCI) contendo o prédio e sala de prova estará disponível para consulta individual aproximadamente 10 dias antes da prova.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Registration Modal */}
      <CandidateRegistrationModal
        process={process}
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
    </div>
  );
};
