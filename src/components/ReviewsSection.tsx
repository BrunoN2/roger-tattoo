import React from 'react';
import { Star, Quote, ExternalLink, CheckCircle2 } from 'lucide-react';
import { GOOGLE_MAPS_URL } from '../utils/budget';

interface ReviewItem {
  id: string;
  name: string;
  badge: string;
  isLocalGuide?: boolean;
  timeAgo: string;
  rating: number;
  text: string;
}

const GOOGLE_REVIEWS: ReviewItem[] = [
  {
    id: 'eunice',
    name: 'Eunice Pagani Mayrink',
    badge: 'Local Guide · 280 avaliações · 1.038 fotos',
    isLocalGuide: true,
    timeAgo: '6 anos atrás',
    rating: 5,
    text: 'Situado no Bairro Progresso, perto do Fórum. É um excelente tatuador. Studio muito bem montado e o tatuador é muito paciente, educado e ótimo profissional.'
  },
  {
    id: 'ramon',
    name: 'Ramon Duarte',
    badge: 'Local Guide · 111 avaliações · 98 fotos',
    isLocalGuide: true,
    timeAgo: '6 anos atrás',
    rating: 5,
    text: 'Muito bom já fiz uma E vou fazer mais lá concerteza'
  },
  {
    id: 'manuela',
    name: 'Manuela Barros',
    badge: '3 avaliações · 1 foto',
    isLocalGuide: false,
    timeAgo: '7 anos atrás',
    rating: 5,
    text: 'Amei este lugar !!😍 ...'
  },
  {
    id: 'marcely',
    name: 'marcely Farias',
    badge: '9 avaliações · 2 fotos',
    isLocalGuide: false,
    timeAgo: 'um ano atrás',
    rating: 5,
    text: 'Ótimo'
  }
];

export const ReviewsSection: React.FC = () => {
  return (
    <section id="avaliacoes" className="py-14 sm:py-24 bg-zinc-950 scroll-mt-16 sm:scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Google Reviews Banner with single direct link to Google */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 mb-8 sm:mb-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-6 relative z-10">
            
            {/* Left: Google Brand & Score */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3.5 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white flex items-center justify-center p-2.5 shadow-md shrink-0">
                <svg viewBox="0 0 24 24" className="w-full h-full">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              </div>

              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="text-lg sm:text-2xl font-black text-white font-cinzel">EXCELENTE</span>
                  <div className="flex items-center gap-0.5 sm:gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 mt-1">
                  Nota <strong>5.0 no Google</strong> · Avaliações reais em Laguna – SC
                </p>
                <span className="text-[11px] text-zinc-500 block mt-0.5">
                  Atendimento paciente, higiene e traço impecável
                </span>
              </div>
            </div>

            {/* Right: Single Google Review Link */}
            <div className="w-full sm:w-auto flex justify-center">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 text-white px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(217,119,6,0.3)]"
              >
                <Star size={15} className="fill-white" />
                <span>Avaliar no Google</span>
                <ExternalLink size={14} />
              </a>
            </div>

          </div>
        </div>

        {/* Google Comments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {GOOGLE_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-zinc-900/90 border border-zinc-800 hover:border-amber-600/40 p-5 sm:p-7 rounded-2xl relative transition-all duration-300 flex flex-col justify-between group shadow-lg"
            >
              <Quote className="absolute top-4 right-4 text-zinc-800/80 group-hover:text-amber-500/10 transition-colors" size={32} />
              
              <div>
                {/* Rating and Time */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="fill-amber-400 text-amber-400 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  ))}
                  <span className="text-zinc-500 text-[11px] sm:text-xs ml-2">{review.timeAgo}</span>
                </div>

                {/* Comment Text */}
                <p className="text-zinc-200 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 font-normal">
                  "{review.text}"
                </p>
              </div>

              {/* Author Header */}
              <div className="flex items-center gap-3 pt-3.5 border-t border-zinc-800/90">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-amber-600/20 to-zinc-800 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-sm sm:text-base uppercase shrink-0">
                  {review.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h4 className="text-white font-bold text-sm leading-tight truncate">
                      {review.name}
                    </h4>
                    {review.isLocalGuide && (
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        <CheckCircle2 size={10} /> Local Guide
                      </span>
                    )}
                  </div>
                  <p className="text-zinc-400 text-[11px] sm:text-xs truncate mt-0.5">
                    {review.badge}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
