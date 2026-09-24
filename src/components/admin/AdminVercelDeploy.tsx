import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Rocket,
  CheckCircle2,
  Copy,
  ExternalLink,
  Terminal,
  Github,
  ArrowRight,
  Sparkles,
  FileCode,
  ShieldCheck,
  Globe,
  Database
} from 'lucide-react';

export const AdminVercelDeploy: React.FC = () => {
  const { siteSettings, sqlConfig } = useApp();
  const [copiedStep, setCopiedStep] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(id);
    setTimeout(() => setCopiedStep(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800">
            <Rocket className="w-4 h-4" />
            <span>Guia Oficial de Publicação na Vercel</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
            Implantar Portal COVEST na Vercel
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1.5 max-w-2xl">
            A Vercel é a plataforma nativa e recomendada para aplicações React/Vite. Ela oferece hospedagem global ultra rápida (Edge CDN), SSL automático grátis (HTTPS) e suporte direto a SPA com o arquivo <code className="font-mono text-amber-900 font-semibold">vercel.json</code> já configurado.
          </p>
        </div>

        <a
          href="https://vercel.com/new"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-xl transition-all shadow-md shrink-0"
        >
          <span>Abrir Vercel Dashboard</span>
          <ExternalLink className="w-4 h-4 text-amber-300" />
        </a>
      </div>

      {/* Configuration Status Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-bold text-emerald-950 block">vercel.json Configurado</span>
            <p className="text-[11px] text-emerald-800 mt-0.5">
              Regras de roteamento SPA (rewrites para index.html) prontas para evitar erros 404 ao atualizar a página.
            </p>
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-4 flex items-start gap-3 shadow-sm">
          <Globe className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-bold text-stone-900 block">Deploy 100% Gratuito</span>
            <p className="text-[11px] text-stone-600 mt-0.5">
              Você ganha domínio grátis <code className="font-mono text-stone-800">.vercel.app</code> com certificado de segurança SSL.
            </p>
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-4 flex items-start gap-3 shadow-sm">
          <Database className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-bold text-stone-900 block">Banco phpMyAdmin Mantido</span>
            <p className="text-[11px] text-stone-600 mt-0.5">
              O banco <code className="font-mono text-stone-800">{sqlConfig.database}</code> continua funcionando normalmente com o exportador .SQL.
            </p>
          </div>
        </div>
      </div>

      {/* Two Methods to Deploy */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Method 1: GitHub / GitLab (Recommended) */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 space-y-5 shadow-sm">
          <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-lg">
            <Github className="w-5 h-5 text-stone-900" />
            <span>Método 1: Pelo GitHub (Recomendado)</span>
          </div>

          <p className="text-xs text-stone-600 leading-relaxed">
            Se o seu projeto estiver em um repositório no GitHub ou GitLab, a Vercel atualiza o site automaticamente a cada commit:
          </p>

          <ol className="space-y-3.5 text-xs text-stone-700">
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center justify-center shrink-0 mt-0.5 font-mono">
                1
              </span>
              <div>
                <strong>Acesse a Vercel:</strong> Entre em <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-amber-900 font-semibold underline">vercel.com</a> e faça login com sua conta do GitHub.
              </div>
            </li>

            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center justify-center shrink-0 mt-0.5 font-mono">
                2
              </span>
              <div>
                <strong>Importe o Repositório:</strong> Clique em <strong>&quot;Add New...&quot; &gt; &quot;Project&quot;</strong> e selecione este repositório.
              </div>
            </li>

            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center justify-center shrink-0 mt-0.5 font-mono">
                3
              </span>
              <div>
                <strong>Configurações de Build:</strong> A Vercel detecta automaticamente Vite. Caso peça confirmação:
                <div className="mt-1.5 p-2.5 bg-stone-50 rounded-lg font-mono text-[11px] text-stone-800 space-y-1">
                  <div>Framework Preset: <strong>Vite</strong></div>
                  <div>Build Command: <code className="text-amber-800">npm run build</code></div>
                  <div>Output Directory: <code className="text-amber-800">dist</code></div>
                </div>
              </div>
            </li>

            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center justify-center shrink-0 mt-0.5 font-mono">
                4
              </span>
              <div>
                <strong>Clique em &quot;Deploy&quot;:</strong> Em cerca de 30 segundos seu site estará no ar com link público ativo!
              </div>
            </li>
          </ol>
        </div>

        {/* Method 2: Vercel CLI (Direto do Terminal) */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 space-y-5 shadow-sm">
          <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-lg">
            <Terminal className="w-5 h-5 text-amber-700" />
            <span>Método 2: Pelo Terminal com Vercel CLI</span>
          </div>

          <p className="text-xs text-stone-600 leading-relaxed">
            Você também pode publicar diretamente do terminal com apenas dois comandos rápidos:
          </p>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-[11px] font-semibold text-stone-700 mb-1">
                <span>1. Instale a Vercel CLI globalmente:</span>
                <button
                  onClick={() => copyToClipboard('npm i -g vercel', 'c1')}
                  className="text-stone-500 hover:text-stone-900 flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedStep === 'c1' ? 'Copiado!' : 'Copiar'}</span>
                </button>
              </div>
              <pre className="p-3 bg-stone-900 text-amber-300 rounded-lg font-mono text-xs">
                npm i -g vercel
              </pre>
            </div>

            <div>
              <div className="flex items-center justify-between text-[11px] font-semibold text-stone-700 mb-1">
                <span>2. Faça o deploy em produção:</span>
                <button
                  onClick={() => copyToClipboard('vercel --prod', 'c2')}
                  className="text-stone-500 hover:text-stone-900 flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedStep === 'c2' ? 'Copiado!' : 'Copiar'}</span>
                </button>
              </div>
              <pre className="p-3 bg-stone-900 text-amber-300 rounded-lg font-mono text-xs">
                vercel --prod
              </pre>
            </div>

            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 space-y-1">
              <span className="font-semibold text-stone-900 block">Respostas do assistente no terminal:</span>
              <p>• Set up and deploy? Digite <strong>Y</strong> (Enter)</p>
              <p>• Which scope? Selecione sua conta (Enter)</p>
              <p>• Link to existing project? Digite <strong>N</strong> (Enter)</p>
              <p>• Project name? Pressione <strong>Enter</strong> para manter o padrão</p>
              <p>• Directory? Pressione <strong>Enter</strong> (./)</p>
            </div>
          </div>
        </div>
      </div>

      {/* vercel.json File Verification Box */}
      <div className="bg-stone-900 text-white rounded-2xl p-6 sm:p-7 border border-stone-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
            <FileCode className="w-4 h-4" />
            <span>Arquivo /vercel.json configurado na raiz do projeto</span>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
            Ativo & Pronto
          </span>
        </div>

        <pre className="p-4 bg-stone-950 rounded-xl font-mono text-xs text-stone-300 overflow-x-auto">
{`{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}`}
        </pre>
        <p className="text-[11px] text-stone-400">
          Este arquivo garante que qualquer URL do portal (página inicial, detalhe de concurso, painel administrativo) seja carregada perfeitamente na Vercel sem erro 404.
        </p>
      </div>
    </div>
  );
};
