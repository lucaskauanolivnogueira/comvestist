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
        {/* Method 1: GitHub via Vercel Web Dashboard (100% Online) */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 space-y-5 shadow-sm">
          <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-lg">
            <Github className="w-5 h-5 text-stone-900" />
            <span>Opção 1: Vercel Online via GitHub (Sem Terminal)</span>
          </div>

          <p className="text-xs text-stone-600 leading-relaxed">
            Você faz tudo pelo navegador diretamente no painel da Vercel (<a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-amber-900 font-semibold underline">vercel.com</a>):
          </p>

          <ol className="space-y-3.5 text-xs text-stone-700">
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center justify-center shrink-0 mt-0.5 font-mono">
                1
              </span>
              <div>
                <strong>Entre no Vercel Online:</strong> Faça login no site <a href="https://vercel.com/login" target="_blank" rel="noopener noreferrer" className="text-amber-900 font-semibold underline">vercel.com/login</a> com a sua conta GitHub.
              </div>
            </li>

            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center justify-center shrink-0 mt-0.5 font-mono">
                2
              </span>
              <div>
                <strong>Importar Projeto:</strong> Na tela inicial do painel da Vercel, clique no botão azul <strong>&quot;Add New...&quot;</strong> e escolha <strong>&quot;Project&quot;</strong>.
              </div>
            </li>

            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center justify-center shrink-0 mt-0.5 font-mono">
                3
              </span>
              <div>
                <strong>Selecione o Repositório:</strong> Ao lado do nome do seu repositório deste site, clique no botão <strong>&quot;Import&quot;</strong>.
              </div>
            </li>

            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center justify-center shrink-0 mt-0.5 font-mono">
                4
              </span>
              <div>
                <strong>Confirmar e Deploy:</strong> O painel da Vercel já reconhece tudo sozinho:
                <div className="mt-1.5 p-2.5 bg-stone-50 rounded-lg font-mono text-[11px] text-stone-800 space-y-1 border border-stone-200">
                  <div>Framework Preset: <span className="text-emerald-700 font-bold">Vite</span></div>
                  <div>Root Directory: <code>./</code></div>
                  <div>Build Command: <code>npm run build</code></div>
                  <div>Output Directory: <code>dist</code></div>
                </div>
                <p className="mt-1 text-stone-500 text-[11px]">Basta clicar no botão azul <strong>&quot;Deploy&quot;</strong>!</p>
              </div>
            </li>
          </ol>
        </div>

        {/* Method 2: Explaining Online Drag & Drop vs Git */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 space-y-5 shadow-sm">
          <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-lg">
            <Sparkles className="w-5 h-5 text-amber-700" />
            <span>O que acontece no Painel Online da Vercel</span>
          </div>

          <p className="text-xs text-stone-600 leading-relaxed">
            Ao conectar seu projeto na versão web da Vercel:
          </p>

          <div className="space-y-3 text-xs text-stone-700">
            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
              <span className="font-bold text-stone-900 block flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Compilação Automática na Nuvem</span>
              </span>
              <p className="text-[11px] text-stone-600">
                Os servidores da Vercel rodam o build automaticamente e já geram o site otimizado na nuvem, sem você precisar compilar nada no seu computador.
              </p>
            </div>

            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
              <span className="font-bold text-stone-900 block flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Roteamento com vercel.json</span>
              </span>
              <p className="text-[11px] text-stone-600">
                A Vercel lê automaticamente o arquivo <code className="font-mono text-stone-800 font-semibold">/vercel.json</code> que já criamos no seu projeto, garantindo que o slider, os seletivos e o painel ADM funcionem perfeitamente.
              </p>
            </div>

            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
              <span className="font-bold text-stone-900 block flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Link Imediato e Grátis</span>
              </span>
              <p className="text-[11px] text-stone-600">
                Assim que termina a barra de progresso, a Vercel gera na hora um link como <code className="font-mono text-amber-900 font-bold">https://seu-projeto.vercel.app</code> que você já pode enviar para os candidatos.
              </p>
            </div>
          </div>

          <a
            href="https://vercel.com/new"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs rounded-lg transition-colors shadow-sm"
          >
            <span>Ir para a Página de Criação de Projetos na Vercel</span>
            <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
          </a>
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
  "headers": [
    {
      "source": "/(.*)\\\\.js",
      "headers": [
        { "key": "Content-Type", "value": "text/javascript; charset=utf-8" }
      ]
    },
    {
      "source": "/(.*)\\\\.css",
      "headers": [
        { "key": "Content-Type", "value": "text/css; charset=utf-8" }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/((?!.*\\\\.[a-zA-Z0-9]+$).*)",
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
