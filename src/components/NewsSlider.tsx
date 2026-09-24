import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronLeft, ChevronRight, Calendar, Clock, ArrowUpRight, Newspaper } from 'lucide-react';

export const NewsSlider: React.FC = () => {
  const { newsList, openNewsModal } = useApp();
  const sliderItems = newsList.filter((n) => n.featuredInSlider);
  const items = sliderItems.length > 0 ? sliderItems : newsList;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto slide every 6 seconds if not paused
  useEffect(() => {
    if (isPaused || items.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, items.length]);

  if (!items || items.length === 0) {
    return null;
  }

  const currentItem = items[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  return (
    <section 
      id="noticias-slider" 
      className="relative w-full bg-stone-900 text-white overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Decorative subtle background pattern */}
      <div className="relative min-h-[460px] md:min-h-[520px] lg:min-h-[560px] flex items-center">
        {/* Active slide image with measured contrast scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src={currentItem.image}
            alt={currentItem.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-all duration-700 ease-out transform scale-105"
          />
          {/* Measured Scrim for WCAG AA compliance */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/75 to-stone-900/40" />
          <div className="absolute inset-0 bg-stone-950/30 backdrop-blur-[0.5px]" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            {/* Left Main Article Info */}
            <div className="lg:col-span-8 space-y-4">
              {/* Unboxed metadata line */}
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-stone-300 font-medium">
                <span className="text-amber-400 font-semibold tracking-wide uppercase text-xs">
                  {currentItem.category}
                </span>
                <span aria-hidden="true" className="text-stone-500">·</span>
                <span className="flex items-center gap-1.5 text-stone-300">
                  <Calendar className="w-3.5 h-3.5 text-stone-400" />
                  <span>{currentItem.publishDate}</span>
                </span>
                <span aria-hidden="true" className="text-stone-500">·</span>
                <span className="flex items-center gap-1.5 text-stone-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{currentItem.readTime}</span>
                </span>
              </div>

              {/* Title with balanced text wrap */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif font-bold text-white tracking-tight leading-tight max-w-3xl">
                {currentItem.title}
              </h1>

              {/* Summary */}
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl line-clamp-3">
                {currentItem.summary}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => openNewsModal(currentItem.id)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-sm rounded-lg transition-colors shadow-lg shadow-amber-950/40"
                >
                  <span>Ler Notícia Completa</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <div className="text-xs text-stone-400 px-2 py-1">
                  Publicado por: {currentItem.author}
                </div>
              </div>
            </div>

            {/* Right Thumbnail Switcher (desktop) */}
            <div className="hidden lg:block lg:col-span-4 bg-stone-900/80 backdrop-blur-md rounded-xl p-4 border border-stone-800">
              <div className="flex items-center justify-between pb-3 border-b border-stone-800 mb-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                  <Newspaper className="w-4 h-4" />
                  <span>Últimos Comunicados</span>
                </div>
                <span className="text-xs text-stone-400 font-mono tabular-nums">
                  {currentIndex + 1} de {items.length}
                </span>
              </div>

              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {items.map((news, idx) => (
                  <button
                    key={news.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-full text-left p-2.5 rounded-lg transition-all text-xs flex items-start gap-3 ${
                      currentIndex === idx
                        ? 'bg-stone-800/90 text-white border-l-2 border-amber-400'
                        : 'text-stone-400 hover:bg-stone-800/50 hover:text-stone-200'
                    }`}
                  >
                    <span className="font-mono text-stone-500 shrink-0 mt-0.5">0{idx + 1}</span>
                    <div className="truncate">
                      <p className="font-medium text-stone-200 truncate">{news.title}</p>
                      <span className="text-[11px] text-stone-500">{news.publishDate}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Carousel controls: Previous and Next */}
        {items.length > 1 && (
          <div className="absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-3 sm:px-6 pointer-events-none">
            <button
              onClick={handlePrev}
              className="pointer-events-auto p-2.5 rounded-full bg-stone-900/60 hover:bg-stone-900 text-stone-200 hover:text-white border border-stone-700/60 transition-all backdrop-blur-sm"
              aria-label="Slide anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="pointer-events-auto p-2.5 rounded-full bg-stone-900/60 hover:bg-stone-900 text-stone-200 hover:text-white border border-stone-700/60 transition-all backdrop-blur-sm"
              aria-label="Próximo slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Carousel Indicator Dots */}
        {items.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 transition-all rounded-full ${
                  currentIndex === idx ? 'w-8 bg-amber-400' : 'w-2 bg-stone-600 hover:bg-stone-400'
                }`}
                aria-label={`Ir para notícia ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
