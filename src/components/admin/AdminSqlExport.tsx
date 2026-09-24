import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Database,
  Download,
  Copy,
  Check,
  Eye,
  EyeOff,
  Server,
  Key,
  Layers,
  FileCode,
  ExternalLink,
  Save,
} from 'lucide-react';

export const AdminSqlExport: React.FC = () => {
  const {
    sqlConfig,
    updateSqlConfig,
    exportAndDownloadSql,
    getSqlContent,
    selectiveProcesses,
    newsList,
    applications,
  } = useApp();

  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isEditingConfig, setIsEditingConfig] = useState(false);
  const [configForm, setConfigForm] = useState({ ...sqlConfig });
  const [activeTab, setActiveTab] = useState<'preview' | 'instructions'>('preview');

  const sqlCode = getSqlContent();
  const sqlLines = sqlCode.split('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(sqlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateSqlConfig(configForm);
    setIsEditingConfig(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800">
            <Database className="w-4 h-4" />
            <span>Gerador de Dump MySQL para phpMyAdmin</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
            Exportar Banco de Dados ({sqlConfig.database})
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
            Gera o arquivo <code className="font-mono text-amber-900 font-semibold">{sqlConfig.database}.sql</code> contendo a criação das tabelas e todos os dados atuais de seletivos, notícias e inscrições.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs rounded-lg transition-colors border border-stone-300 shadow-sm"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-stone-600" />}
            <span>{copied ? 'Código SQL Copiado!' : 'Copiar Código SQL'}</span>
          </button>

          <button
            onClick={exportAndDownloadSql}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-lg transition-colors shadow-md"
          >
            <Download className="w-4 h-4" />
            <span>Baixar Arquivo .SQL</span>
          </button>
        </div>
      </div>

      {/* Database Credentials Box (InfinityFree info) */}
      <div className="bg-stone-900 text-white rounded-2xl p-6 border border-stone-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-amber-400" />
            <span className="font-semibold text-sm">Credenciais Configuradas no InfinityFree MySQL</span>
          </div>

          <button
            onClick={() => setIsEditingConfig(!isEditingConfig)}
            className="text-xs text-amber-300 hover:underline flex items-center gap-1 font-medium"
          >
            <span>{isEditingConfig ? 'Cancelar Edição' : 'Editar Parâmetros de Conexão'}</span>
          </button>
        </div>

        {isEditingConfig ? (
          <form onSubmit={handleSaveConfig} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block text-stone-400 mb-1">Host do MySQL</label>
              <input
                type="text"
                value={configForm.host}
                onChange={(e) => setConfigForm({ ...configForm, host: e.target.value })}
                className="w-full px-3 py-1.5 bg-stone-800 border border-stone-700 rounded text-stone-100 font-mono"
              />
            </div>
            <div>
              <label className="block text-stone-400 mb-1">Usuário</label>
              <input
                type="text"
                value={configForm.user}
                onChange={(e) => setConfigForm({ ...configForm, user: e.target.value })}
                className="w-full px-3 py-1.5 bg-stone-800 border border-stone-700 rounded text-stone-100 font-mono"
              />
            </div>
            <div>
              <label className="block text-stone-400 mb-1">Senha</label>
              <input
                type="text"
                value={configForm.password}
                onChange={(e) => setConfigForm({ ...configForm, password: e.target.value })}
                className="w-full px-3 py-1.5 bg-stone-800 border border-stone-700 rounded text-stone-100 font-mono"
              />
            </div>
            <div>
              <label className="block text-stone-400 mb-1">Nome do Banco</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={configForm.database}
                  onChange={(e) => setConfigForm({ ...configForm, database: e.target.value })}
                  className="w-full px-3 py-1.5 bg-stone-800 border border-stone-700 rounded text-stone-100 font-mono"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-amber-500 text-stone-950 font-bold rounded flex items-center gap-1"
                >
                  <Save className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-3 bg-stone-800/80 rounded-xl border border-stone-700/60">
              <span className="text-stone-400 block text-[11px] font-sans">Host do Servidor:</span>
              <span className="text-amber-300 font-semibold truncate block mt-0.5">{sqlConfig.host}</span>
            </div>

            <div className="p-3 bg-stone-800/80 rounded-xl border border-stone-700/60">
              <span className="text-stone-400 block text-[11px] font-sans">Usuário phpMyAdmin:</span>
              <span className="text-stone-200 font-semibold truncate block mt-0.5">{sqlConfig.user}</span>
            </div>

            <div className="p-3 bg-stone-800/80 rounded-xl border border-stone-700/60">
              <div className="flex items-center justify-between">
                <span className="text-stone-400 text-[11px] font-sans">Senha:</span>
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-stone-400 hover:text-white p-0.5"
                >
                  {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                </button>
              </div>
              <span className="text-stone-200 font-semibold truncate block mt-0.5">
                {showPassword ? sqlConfig.password : '••••••••••••'}
              </span>
            </div>

            <div className="p-3 bg-stone-800/80 rounded-xl border border-stone-700/60">
              <span className="text-stone-400 block text-[11px] font-sans">Nome do Banco:</span>
              <span className="text-emerald-400 font-semibold truncate block mt-0.5">{sqlConfig.database}</span>
            </div>
          </div>
        )}
      </div>

      {/* Tabs: Preview vs How-To */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
        <div className="flex border-b border-stone-200 bg-stone-50 px-4 pt-3 space-x-4">
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-2 pb-3 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'preview'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>Código SQL Gerado ({sqlLines.length} linhas)</span>
          </button>

          <button
            onClick={() => setActiveTab('instructions')}
            className={`flex items-center gap-2 pb-3 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'instructions'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Como Importar no phpMyAdmin (Passo a Passo)</span>
          </button>
        </div>

        {/* Tab 1: SQL Code Preview */}
        {activeTab === 'preview' && (
          <div>
            <div className="p-3 bg-stone-100 border-b border-stone-200 flex flex-wrap items-center justify-between text-xs text-stone-600 gap-2">
              <div className="flex items-center gap-4">
                <span>Tabelas incluídas: <strong>8 tabelas</strong></span>
                <span>·</span>
                <span>Seletivos: <strong>{selectiveProcesses.length}</strong></span>
                <span>·</span>
                <span>Notícias: <strong>{newsList.length}</strong></span>
                <span>·</span>
                <span>Inscrições: <strong>{applications.length}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="px-2.5 py-1 text-xs font-semibold text-stone-700 hover:text-stone-900 bg-white border border-stone-300 rounded"
                >
                  {copied ? 'Copiado!' : 'Copiar'}
                </button>
                <button
                  onClick={exportAndDownloadSql}
                  className="px-2.5 py-1 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded"
                >
                  Baixar .SQL
                </button>
              </div>
            </div>

            <div className="p-4 bg-stone-950 font-mono text-xs text-stone-300 max-h-[500px] overflow-y-auto leading-relaxed selection:bg-amber-500 selection:text-stone-950">
              <pre className="whitespace-pre overflow-x-auto">
                {sqlCode}
              </pre>
            </div>
          </div>
        )}

        {/* Tab 2: Instructions for InfinityFree phpMyAdmin */}
        {activeTab === 'instructions' && (
          <div className="p-6 sm:p-8 space-y-6 text-sm text-stone-700">
            <h3 className="text-lg font-serif font-bold text-stone-900">
              Instruções para Importação no phpMyAdmin da InfinityFree
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center font-mono">
                    1
                  </span>
                  <h4 className="font-semibold text-stone-900">Acesse o Painel do InfinityFree</h4>
                  <p className="text-xs text-stone-600">
                    Acesse seu painel na InfinityFree (app.infinityfree.com) e entre na sua conta que contém o domínio e o banco de dados.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center font-mono">
                    2
                  </span>
                  <h4 className="font-semibold text-stone-900">Abra o phpMyAdmin</h4>
                  <p className="text-xs text-stone-600">
                    No painel de controle (vPanel), clique no botão <strong>phpMyAdmin</strong> ao lado do banco <code className="font-mono font-bold text-stone-800">{sqlConfig.database}</code> ou acesse diretamente com suas credenciais.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center font-mono">
                    3
                  </span>
                  <h4 className="font-semibold text-stone-900">Selecione o Banco de Dados</h4>
                  <p className="text-xs text-stone-600">
                    Na barra lateral esquerda do phpMyAdmin, clique no banco de dados <code className="font-mono font-bold text-stone-800">{sqlConfig.database}</code>.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center font-mono">
                    4
                  </span>
                  <h4 className="font-semibold text-stone-900">Importar o Arquivo .SQL</h4>
                  <p className="text-xs text-stone-600">
                    Clique na aba superior <strong>&quot;Importar&quot; (Import)</strong>, selecione o arquivo <code className="font-mono font-bold text-stone-800">{sqlConfig.database}.sql</code> baixado e clique no botão <strong>&quot;Executar&quot; (Go)</strong> no final da página.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
              <Key className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block mb-1">Dica Prática para Atualizações Rápidas</span>
                <p>
                  Você também pode simplesmente clicar em <strong>&quot;Copiar Código SQL&quot;</strong> acima, ir na aba <strong>&quot;SQL&quot;</strong> do phpMyAdmin, colar o texto inteiro e clicar em <strong>Executar</strong>! O script já inclui comandos seguros de recriação de tabelas com integridade referencial.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
