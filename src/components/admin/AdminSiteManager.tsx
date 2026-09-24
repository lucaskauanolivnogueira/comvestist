import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SelectiveProcess, NewsItem, SiteSettings, ProcessCategory, ProcessStatus } from '../../types';
import {
  Globe,
  Plus,
  Edit2,
  Trash2,
  Save,
  Check,
  X,
  Download,
  AlertCircle,
  Image as ImageIcon,
  Newspaper,
  BookOpen,
  Settings,
} from 'lucide-react';

const PRESET_IMAGES = [
  { label: 'Campus & Biblioteca Central', url: '/src/assets/images/hero_vestibular_slider_1790277221192.jpg' },
  { label: 'Secretaria de Admissões & Documentos', url: '/src/assets/images/news_isencao_taxa_1790277232243.jpg' },
  { label: 'Medicina, Saúde & Laboratórios', url: '/src/assets/images/card_vestibular_medicina_1790277241917.jpg' },
  { label: 'Concurso Docentes & Biblioteca Clássica', url: '/src/assets/images/card_concurso_docentes_1790277251257.jpg' },
  { label: 'Tecnologias, EAD & Inovação', url: '/src/assets/images/card_seletivo_ead_tech_1790277260973.jpg' },
];

export const AdminSiteManager: React.FC = () => {
  const {
    selectiveProcesses,
    saveSelectiveProcess,
    deleteSelectiveProcess,
    newsList,
    saveNewsItem,
    deleteNewsItem,
    siteSettings,
    updateSiteSettings,
    exportAndDownloadSql,
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'seletivos' | 'noticias' | 'configuracoes'>('seletivos');
  const [successMessage, setSuccessMessage] = useState('');

  // Process modal / edit states
  const [editingProcess, setEditingProcess] = useState<SelectiveProcess | null>(null);
  const [isProcessModalOpen, setIsProcessModalOpen] = useState(false);

  // News modal / edit states
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);

  // Site Settings form state
  const [settingsForm, setSettingsForm] = useState<SiteSettings>({ ...siteSettings });

  const notifySuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 4500);
  };

  // --- Handlers for Process ---
  const handleOpenNewProcess = () => {
    const newProc: SelectiveProcess = {
      id: 'proc-' + Date.now(),
      title: '',
      slug: 'seletivo-' + Date.now(),
      category: 'vestibular',
      status: 'inscricoes_abertas',
      image: PRESET_IMAGES[0].url,
      badgeTag: 'Novo Seletivo',
      registrationStart: new Date().toISOString().substring(0, 10),
      registrationEnd: new Date(Date.now() + 30 * 86400000).toISOString().substring(0, 10),
      examDate: new Date(Date.now() + 50 * 86400000).toISOString().substring(0, 10),
      fee: 100.0,
      vacancies: 50,
      summary: '',
      description: '',
      requirements: ['Ensino Médio completo', 'Documento de identificação oficial'],
      schedule: [
        { id: 'sch-1', title: 'Publicação do Edital', date: new Date().toLocaleDateString('pt-BR'), status: 'concluido' },
        { id: 'sch-2', title: 'Período de Inscrições', date: 'Período online', status: 'atual' },
        { id: 'sch-3', title: 'Realização das Provas', date: 'Em breve', status: 'futuro' },
      ],
      documents: [
        { id: 'doc-1', title: 'Edital de Abertura', type: 'edital', publishDate: new Date().toLocaleDateString('pt-BR'), fileSize: '1.2 MB', downloadUrl: '#' },
      ],
      courses: [
        { id: 'c-1', name: 'Curso Geral', shift: 'Matutino', vacancies: 50, campus: 'Campus Principal' },
      ],
      contactEmail: siteSettings.contactEmail,
      featured: true,
      createdAt: new Date().toISOString().substring(0, 10),
    };
    setEditingProcess(newProc);
    setIsProcessModalOpen(true);
  };

  const handleEditProcess = (proc: SelectiveProcess) => {
    setEditingProcess({ ...proc });
    setIsProcessModalOpen(true);
  };

  const handleSaveProcess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProcess) return;
    if (!editingProcess.title.trim()) {
      alert('Por favor, informe o título do seletivo.');
      return;
    }
    saveSelectiveProcess(editingProcess);
    setIsProcessModalOpen(false);
    setEditingProcess(null);
    notifySuccess('Processo seletivo salvo com sucesso no portal!');
  };

  const handleDeleteProcess = (id: string, title: string) => {
    if (window.confirm(`Tem certeza que deseja remover o seletivo "${title}" do site?`)) {
      deleteSelectiveProcess(id);
      notifySuccess('Processo seletivo removido do site.');
    }
  };

  // --- Handlers for News ---
  const handleOpenNewNews = () => {
    const newN: NewsItem = {
      id: 'noticia-' + Date.now(),
      title: '',
      subtitle: '',
      summary: '',
      content: '',
      image: PRESET_IMAGES[0].url,
      publishDate: new Date().toLocaleDateString('pt-BR'),
      author: 'Comissão de Comunicação',
      category: 'Vestibular Geral',
      featuredInSlider: true,
      sliderOrder: newsList.length + 1,
      readTime: '3 min de leitura',
    };
    setEditingNews(newN);
    setIsNewsModalOpen(true);
  };

  const handleEditNews = (item: NewsItem) => {
    setEditingNews({ ...item });
    setIsNewsModalOpen(true);
  };

  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNews) return;
    if (!editingNews.title.trim()) {
      alert('Informe o título da notícia.');
      return;
    }
    saveNewsItem(editingNews);
    setIsNewsModalOpen(false);
    setEditingNews(null);
    notifySuccess('Notícia/Slider salvo com sucesso no portal!');
  };

  const handleDeleteNews = (id: string, title: string) => {
    if (window.confirm(`Remover a notícia "${title}"?`)) {
      deleteNewsItem(id);
      notifySuccess('Notícia removida do site.');
    }
  };

  // --- Handlers for Settings ---
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings(settingsForm);
    notifySuccess('Configurações gerais do portal atualizadas!');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with SQL Reminder */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800">
            <Globe className="w-4 h-4" />
            <span>Gerenciador Completo do Site</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-stone-900 mt-1">
            Editar Conteúdo Público do Portal
          </h2>
          <p className="text-xs text-stone-600 mt-1">
            Altere qualquer elemento exibido no site: lista de seletivos, notícias do slider e dados de contato.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportAndDownloadSql}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs rounded-lg transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Baixar .SQL com as Alterações</span>
          </button>
        </div>
      </div>

      {/* Success Notification Alert */}
      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl flex items-center justify-between gap-3 text-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold">{successMessage}</span>
          </div>
          <button
            onClick={exportAndDownloadSql}
            className="px-2.5 py-1 bg-emerald-600 text-white rounded font-medium hover:bg-emerald-700"
          >
            Baixar .SQL agora
          </button>
        </div>
      )}

      {/* Sub-tabs Navigation */}
      <div className="flex border-b border-stone-200 space-x-2 sm:space-x-4 bg-white p-2 rounded-xl border">
        <button
          onClick={() => setActiveSubTab('seletivos')}
          className={`flex items-center gap-2 py-2.5 px-4 rounded-lg text-xs font-semibold transition-all ${
            activeSubTab === 'seletivos'
              ? 'bg-stone-900 text-white shadow-sm'
              : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Seletivos & Concursos ({selectiveProcesses.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('noticias')}
          className={`flex items-center gap-2 py-2.5 px-4 rounded-lg text-xs font-semibold transition-all ${
            activeSubTab === 'noticias'
              ? 'bg-stone-900 text-white shadow-sm'
              : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
          }`}
        >
          <Newspaper className="w-4 h-4" />
          <span>Slider & Notícias ({newsList.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('configuracoes')}
          className={`flex items-center gap-2 py-2.5 px-4 rounded-lg text-xs font-semibold transition-all ${
            activeSubTab === 'configuracoes'
              ? 'bg-stone-900 text-white shadow-sm'
              : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Configurações & Contatos</span>
        </button>
      </div>

      {/* ---------------------------------------------------- */}
      {/* SUB-TAB 1: SELETIVOS, VESTIBULARES E CONCURSOS       */}
      {/* ---------------------------------------------------- */}
      {activeSubTab === 'seletivos' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-stone-200">
            <div>
              <h3 className="font-serif font-bold text-base text-stone-900">
                Lista de Seletivos Exibidos no Portal
              </h3>
              <p className="text-xs text-stone-500">
                Cada item possui imagem, título e botão que direciona para a página pública dedicada.
              </p>
            </div>
            <button
              onClick={handleOpenNewProcess}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs rounded-lg transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span>Adicionar Novo Seletivo</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectiveProcesses.map((proc) => (
              <div
                key={proc.id}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden flex flex-col justify-between hover:border-amber-400/80 transition-colors"
              >
                <div className="p-4 flex gap-4">
                  <img
                    src={proc.image}
                    alt={proc.title}
                    referrerPolicy="no-referrer"
                    className="w-24 h-24 rounded-lg object-cover border border-stone-200 shrink-0"
                  />
                  <div className="truncate flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                        {proc.badgeTag || proc.category}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                          proc.status === 'inscricoes_abertas'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-stone-100 text-stone-700 border-stone-200'
                        }`}
                      >
                        {proc.status === 'inscricoes_abertas' ? 'Inscrições Abertas' : 'Encerrado'}
                      </span>
                    </div>

                    <h4 className="font-serif font-bold text-sm text-stone-900 leading-snug line-clamp-2">
                      {proc.title}
                    </h4>

                    <p className="text-xs text-stone-500 line-clamp-2">
                      {proc.summary}
                    </p>

                    <div className="text-[11px] text-stone-600 font-mono flex items-center gap-3 pt-1">
                      <span>R$ {proc.fee.toFixed(2)}</span>
                      <span>·</span>
                      <span>{proc.vacancies} vagas</span>
                      <span>·</span>
                      <span>Até {new Date(proc.registrationEnd).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-stone-50 px-4 py-2.5 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] text-stone-500 font-mono truncate max-w-[200px]">
                    ID: {proc.id}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditProcess(proc)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-stone-100 text-stone-700 text-xs font-semibold rounded border border-stone-200 transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-stone-600" />
                      <span>Editar</span>
                    </button>
                    <button
                      onClick={() => handleDeleteProcess(proc.id, proc.title)}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded transition-colors"
                      title="Excluir do site"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* SUB-TAB 2: SLIDER & NOTÍCIAS                         */}
      {/* ---------------------------------------------------- */}
      {activeSubTab === 'noticias' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-stone-200">
            <div>
              <h3 className="font-serif font-bold text-base text-stone-900">
                Notícias e Slides em Destaque
              </h3>
              <p className="text-xs text-stone-500">
                Notícias marcadas como &quot;Slider Ativo&quot; aparecem automaticamente no topo da página inicial.
              </p>
            </div>
            <button
              onClick={handleOpenNewNews}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs rounded-lg transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span>Nova Notícia / Slide</span>
            </button>
          </div>

          <div className="space-y-3">
            {newsList.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-stone-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 truncate">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-20 h-16 rounded-lg object-cover border border-stone-200 shrink-0"
                  />
                  <div className="truncate space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                      {item.featuredInSlider && (
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Slider Ativo #{item.sliderOrder}
                        </span>
                      )}
                      <span className="text-xs text-stone-400">{item.publishDate}</span>
                    </div>
                    <h4 className="font-serif font-bold text-sm text-stone-900 truncate">
                      {item.title}
                    </h4>
                    <p className="text-xs text-stone-500 truncate max-w-xl">
                      {item.summary}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleEditNews(item)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Editar</span>
                  </button>
                  <button
                    onClick={() => handleDeleteNews(item.id, item.title)}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded transition-colors"
                    title="Excluir notícia"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* SUB-TAB 3: CONFIGURAÇÕES GERAIS DO SITE              */}
      {/* ---------------------------------------------------- */}
      {activeSubTab === 'configuracoes' && (
        <form onSubmit={handleSaveSettings} className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="font-serif font-bold text-xl text-stone-900">
              Identidade & Dados da Comissão Organizadora
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Estes dados são exibidos no cabeçalho, rodapé e nos documentos oficiais do portal.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Nome Completo da Instituição / Comissão *
              </label>
              <input
                type="text"
                required
                value={settingsForm.institutionName}
                onChange={(e) => setSettingsForm({ ...settingsForm, institutionName: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Sigla da Comissão *
              </label>
              <input
                type="text"
                required
                value={settingsForm.commissionAcronym}
                onChange={(e) => setSettingsForm({ ...settingsForm, commissionAcronym: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Slogan / Subtítulo Institucional
            </label>
            <input
              type="text"
              value={settingsForm.slogan}
              onChange={(e) => setSettingsForm({ ...settingsForm, slogan: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                E-mail Geral de Contato
              </label>
              <input
                type="email"
                value={settingsForm.contactEmail}
                onChange={(e) => setSettingsForm({ ...settingsForm, contactEmail: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Telefones de Atendimento
              </label>
              <input
                type="text"
                value={settingsForm.contactPhone}
                onChange={(e) => setSettingsForm({ ...settingsForm, contactPhone: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Endereço Físico
              </label>
              <input
                type="text"
                value={settingsForm.address}
                onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Horário de Atendimento
              </label>
              <input
                type="text"
                value={settingsForm.operationalHours}
                onChange={(e) => setSettingsForm({ ...settingsForm, operationalHours: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
              />
            </div>
          </div>

          {/* Alert Banner settings */}
          <div className="pt-4 border-t border-stone-200 space-y-4">
            <h4 className="font-serif font-bold text-base text-stone-900">
              Faixa de Aviso / Comunicado no Topo do Site
            </h4>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="alertActive"
                checked={settingsForm.alertBanner.active}
                onChange={(e) =>
                  setSettingsForm({
                    ...settingsForm,
                    alertBanner: { ...settingsForm.alertBanner, active: e.target.checked },
                  })
                }
                className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
              />
              <label htmlFor="alertActive" className="text-xs font-semibold text-stone-700">
                Ativar comunicado urgente no topo da página
              </label>
            </div>

            {settingsForm.alertBanner.active && (
              <div className="space-y-3 p-4 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Texto do Aviso
                  </label>
                  <input
                    type="text"
                    value={settingsForm.alertBanner.text}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        alertBanner: { ...settingsForm.alertBanner, text: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Texto do Link / Botão
                    </label>
                    <input
                      type="text"
                      value={settingsForm.alertBanner.linkText || ''}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          alertBanner: { ...settingsForm.alertBanner, linkText: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Tipo de Aviso
                    </label>
                    <select
                      value={settingsForm.alertBanner.type}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          alertBanner: { ...settingsForm.alertBanner, type: e.target.value as any },
                        })
                      }
                      className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg"
                    >
                      <option value="warning">Atenção (Amarelo / Alerta)</option>
                      <option value="urgent">Urgente (Vermelho)</option>
                      <option value="info">Informativo (Neutro)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs rounded-lg transition-colors shadow-sm"
            >
              <Save className="w-4 h-4 text-amber-400" />
              <span>Salvar Alterações Gerais</span>
            </button>
          </div>
        </form>
      )}

      {/* ---------------------------------------------------- */}
      {/* MODAL: EDIT / CREATE SELECTIVE PROCESS               */}
      {/* ---------------------------------------------------- */}
      {isProcessModalOpen && editingProcess && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-stone-200 shadow-2xl p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="text-xl font-serif font-bold text-stone-900">
                {editingProcess.title ? 'Editar Processo Seletivo' : 'Cadastrar Novo Processo Seletivo'}
              </h3>
              <button
                onClick={() => setIsProcessModalOpen(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProcess} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Nome do Seletivo / Concurso *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Vestibular Tradicional 2026/1 - Edital nº 02/2026"
                  value={editingProcess.title}
                  onChange={(e) => setEditingProcess({ ...editingProcess, title: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Categoria
                  </label>
                  <select
                    value={editingProcess.category}
                    onChange={(e) =>
                      setEditingProcess({ ...editingProcess, category: e.target.value as ProcessCategory })
                    }
                    className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg"
                  >
                    <option value="vestibular">Vestibular Tradicional</option>
                    <option value="concurso">Concurso Público</option>
                    <option value="seletivo_ead">Processo Seletivo EAD</option>
                    <option value="residencia">Residência / Especialização</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Status Atual
                  </label>
                  <select
                    value={editingProcess.status}
                    onChange={(e) =>
                      setEditingProcess({ ...editingProcess, status: e.target.value as ProcessStatus })
                    }
                    className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg"
                  >
                    <option value="inscricoes_abertas">Inscrições Abertas</option>
                    <option value="em_andamento">Em Andamento</option>
                    <option value="encerrado">Encerrado</option>
                    <option value="em_breve">Em Breve</option>
                  </select>
                </div>
              </div>

              {/* Image Selection with Presets */}
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Imagem de Apresentação (Card & Banner)
                </label>
                <div className="space-y-2">
                  <select
                    value={editingProcess.image}
                    onChange={(e) => setEditingProcess({ ...editingProcess, image: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg"
                  >
                    {PRESET_IMAGES.map((preset, idx) => (
                      <option key={idx} value={preset.url}>
                        Preset: {preset.label}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Ou cole uma URL personalizada da imagem"
                    value={editingProcess.image}
                    onChange={(e) => setEditingProcess({ ...editingProcess, image: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Início das Inscrições
                  </label>
                  <input
                    type="date"
                    required
                    value={editingProcess.registrationStart}
                    onChange={(e) => setEditingProcess({ ...editingProcess, registrationStart: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Fim das Inscrições
                  </label>
                  <input
                    type="date"
                    required
                    value={editingProcess.registrationEnd}
                    onChange={(e) => setEditingProcess({ ...editingProcess, registrationEnd: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Data da Prova
                  </label>
                  <input
                    type="date"
                    required
                    value={editingProcess.examDate}
                    onChange={(e) => setEditingProcess({ ...editingProcess, examDate: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Taxa de Inscrição (R$)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={editingProcess.fee}
                    onChange={(e) => setEditingProcess({ ...editingProcess, fee: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Total de Vagas
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={editingProcess.vacancies}
                    onChange={(e) => setEditingProcess({ ...editingProcess, vacancies: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Tag em Destaque
                  </label>
                  <input
                    type="text"
                    value={editingProcess.badgeTag}
                    onChange={(e) => setEditingProcess({ ...editingProcess, badgeTag: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Resumo Curto (Exibido no card da página inicial)
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingProcess.summary}
                  onChange={(e) => setEditingProcess({ ...editingProcess, summary: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Descrição Completa (Exibida na página pública do seletivo)
                </label>
                <textarea
                  rows={4}
                  required
                  value={editingProcess.description}
                  onChange={(e) => setEditingProcess({ ...editingProcess, description: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  E-mail da Comissão Responsável
                </label>
                <input
                  type="email"
                  value={editingProcess.contactEmail}
                  onChange={(e) => setEditingProcess({ ...editingProcess, contactEmail: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg"
                />
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsProcessModalOpen(false)}
                  className="px-4 py-2 text-stone-700 hover:bg-stone-100 rounded-lg font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg font-semibold shadow-sm"
                >
                  Salvar Seletivo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* MODAL: EDIT / CREATE NEWS / SLIDER ITEM              */}
      {/* ---------------------------------------------------- */}
      {isNewsModalOpen && editingNews && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-stone-200 shadow-2xl p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="text-xl font-serif font-bold text-stone-900">
                {editingNews.title ? 'Editar Notícia / Slide' : 'Nova Notícia para o Slider'}
              </h3>
              <button
                onClick={() => setIsNewsModalOpen(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNews} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Título da Notícia (Manchete do Slider) *
                </label>
                <input
                  type="text"
                  required
                  value={editingNews.title}
                  onChange={(e) => setEditingNews({ ...editingNews, title: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Subtítulo / Linha Fina
                </label>
                <input
                  type="text"
                  value={editingNews.subtitle}
                  onChange={(e) => setEditingNews({ ...editingNews, subtitle: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Categoria da Notícia
                  </label>
                  <input
                    type="text"
                    value={editingNews.category}
                    onChange={(e) => setEditingNews({ ...editingNews, category: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Data de Publicação
                  </label>
                  <input
                    type="text"
                    value={editingNews.publishDate}
                    onChange={(e) => setEditingNews({ ...editingNews, publishDate: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg"
                  />
                </div>
              </div>

              {/* Slider Toggle */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-stone-900 block text-xs">
                    Exibir no Slider Principal da Página Inicial?
                  </span>
                  <span className="text-[11px] text-stone-600">
                    Se marcado, esta notícia aparecerá no carrossel de notícias do topo.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={editingNews.featuredInSlider}
                  onChange={(e) => setEditingNews({ ...editingNews, featuredInSlider: e.target.checked })}
                  className="w-5 h-5 rounded text-amber-600"
                />
              </div>

              {/* Image Preset selection */}
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Imagem de Fundo do Slide
                </label>
                <div className="space-y-2">
                  <select
                    value={editingNews.image}
                    onChange={(e) => setEditingNews({ ...editingNews, image: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg"
                  >
                    {PRESET_IMAGES.map((preset, idx) => (
                      <option key={idx} value={preset.url}>
                        Preset: {preset.label}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={editingNews.image}
                    onChange={(e) => setEditingNews({ ...editingNews, image: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Resumo do Slide (Texto que aparece sobre a imagem)
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingNews.summary}
                  onChange={(e) => setEditingNews({ ...editingNews, summary: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Conteúdo Completo do Artigo (Exibido ao clicar em &quot;Ler Notícia&quot;)
                </label>
                <textarea
                  rows={5}
                  required
                  value={editingNews.content}
                  onChange={(e) => setEditingNews({ ...editingNews, content: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg"
                />
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsNewsModalOpen(false)}
                  className="px-4 py-2 text-stone-700 hover:bg-stone-100 rounded-lg font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg font-semibold shadow-sm"
                >
                  Salvar Notícia
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
