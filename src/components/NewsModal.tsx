import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Calendar, Clock, User, Share2, ArrowLeft, FileText, Check } from 'lucide-react';

export const NewsModal: React.FC = () => {
  const { selectedNewsId, closeNewsModal, newsList } = useApp();
  const [copied, setCopied] = React.useState(false);

  if (!selectedNewsId) return null;

  const news = newsList.find((n) => n.id === selectedNewsId);
  if (!news) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header with image */}
        <div className="relative h-64 sm:h-72 w-full">
          <img
            src={news.image}
            alt={news.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={closeNewsModal}
            className="absolute top-4 right-4 p-2 rounded-full bg-stone-900/70 text-stone-200 hover:text-white hover:bg-stone-900 transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="inline-block px-2.5 py-1 text-xs font-semibold bg-amber-500 text-stone-950 rounded mb-2">
              {news.category}
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight">
              {news.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-200 text-xs sm:text-sm text-stone-500">
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1.5 text-stone-700">
                <Calendar className="w-4 h-4 text-stone-400" />
                <span>Publicado em {news.publishDate}</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5 text-stone-600">
                <Clock className="w-4 h-4 text-stone-400" />
                <span>{news.readTime}</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5 text-stone-600">
                <User className="w-4 h-4 text-stone-400" />
                <span>{news.author}</span>
              </span>
            </div>

            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-700 hover:text-stone-900 px-3 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-100 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copiado!' : 'Compartilhar'}</span>
            </button>
          </div>

          {/* Subtitle */}
          {news.subtitle && (
            <p className="text-base sm:text-lg font-medium text-stone-800 italic leading-relaxed border-l-3 border-amber-500 pl-4">
              {news.subtitle}
            </p>
          )}

          {/* Long Article Content */}
          <div className="prose prose-stone max-w-none text-stone-700 text-sm sm:text-base leading-relaxed space-y-4">
            {news.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Official Seal / Notice Box */}
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 flex items-start gap-3">
            <FileText className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs text-stone-600 space-y-1">
              <span className="font-semibold text-stone-900 block">
                Comunicação Oficial da Comissão Permanente do Vestibular
              </span>
              <p>
                Este documento é uma publicação informativa do Portal de Seleções. Para efeitos jurídicos e editalícios, consulte sempre a íntegra dos editais publicados no Diário Oficial.
              </p>
            </div>
          </div>

          {/* Footer actions */}
          <div className="pt-4 flex items-center justify-between border-t border-stone-200">
            <button
              onClick={closeNewsModal}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-stone-700 hover:text-stone-950 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar ao portal</span>
            </button>

            <button
              onClick={closeNewsModal}
              className="px-5 py-2 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors"
            >
              Concluir Leitura
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
