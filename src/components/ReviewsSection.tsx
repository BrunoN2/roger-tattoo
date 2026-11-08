import React, { useState, useEffect } from 'react';
import { Star, Quote, ExternalLink, CheckCircle2, MessageSquarePlus, Send, X, ThumbsUp } from 'lucide-react';
import { GOOGLE_MAPS_URL } from '../utils/budget';

interface ReviewItem {
  id: string;
  name: string;
  badge: string;
  isLocalGuide?: boolean;
  timeAgo: string;
  rating: number;
  text: string;
  isUserSubmitted?: boolean;
}

const DEFAULT_REVIEWS: ReviewItem[] = [
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
  const [reviews, setReviews] = useState<ReviewItem[]>(DEFAULT_REVIEWS);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [userRating, setUserRating] = useState(5);
  const [userComment, setUserComment] = useState('');
  const [serviceTag, setServiceTag] = useState('');
  const [submittedFeedback, setSubmittedFeedback] = useState(false);

  // Load any previously saved user reviews from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('roger_tattoo_user_reviews');
      if (saved) {
        const parsed: ReviewItem[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setReviews([...parsed, ...DEFAULT_REVIEWS]);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userComment.trim()) return;

    const newReview: ReviewItem = {
      id: 'user_' + Date.now(),
      name: userName.trim(),
      badge: serviceTag ? `Cliente Verificado · ${serviceTag}` : 'Cliente Verificado do Estúdio',
      timeAgo: 'Agora mesmo',
      rating: userRating,
      text: userComment.trim(),
      isUserSubmitted: true
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);

    // Save only user reviews to localStorage
    try {
      const userOnly = updated.filter(r => r.isUserSubmitted);
      localStorage.setItem('roger_tattoo_user_reviews', JSON.stringify(userOnly));
    } catch {
      // ignore
    }

    setUserName('');
    setUserComment('');
    setServiceTag('');
    setSubmittedFeedback(true);
    setTimeout(() => {
      setIsFormOpen(false);
      setSubmittedFeedback(false);
    }, 2000);
  };

  return (
    <section id="avaliacoes" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Google Reviews Extension-style Widget Banner */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 mb-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
            
            {/* Left: Google Brand & Score */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
              {/* Google G icon */}
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center p-2.5 shadow-md shrink-0">
                <svg viewBox="0 0 24 24" className="w-full h-full">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              </div>

              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="text-xl sm:text-2xl font-black text-white font-cinzel">EXCELENTE</span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-zinc-300 mt-1">
                  Nota <strong>5.0 no Google</strong> · Avaliações reais de clientes em Laguna – SC
                </p>
                <span className="text-[11px] text-zinc-500">
                  Estúdio privativo reconhecido por paciência, higiene e traço impecável
                </span>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setIsFormOpen(!isFormOpen)}
                className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(217,119,6,0.3)]"
              >
                <MessageSquarePlus size={16} />
                <span>Avaliar pelo Site</span>
              </button>

              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all border border-zinc-700"
              >
                <span>Ver no Google Maps</span>
                <ExternalLink size={14} className="text-amber-400" />
              </a>
            </div>

          </div>
        </div>

        {/* In-Site Review Form Modal / Drawer */}
        {isFormOpen && (
          <div className="bg-zinc-900 border border-amber-500/30 rounded-2xl p-6 sm:p-8 mb-12 shadow-2xl animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-6">
              <div>
                <h3 className="text-lg font-bold text-white font-cinzel">
                  Deixe sua Avaliação para o <span className="text-white">ROGER </span><span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent font-black">TATTOO</span>
                </h3>
                <p className="text-xs text-zinc-400">Compartilhe sua experiência de atendimento e resultado</p>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-zinc-400 hover:text-white p-1 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            {submittedFeedback ? (
              <div className="py-6 text-center text-emerald-400 font-semibold flex items-center justify-center gap-2">
                <CheckCircle2 size={24} />
                <span>Obrigado! Sua avaliação foi publicada com sucesso.</span>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                      Seu Nome *
                    </label>
                    <input
                      type="text"
                      required
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Ex: Amanda Santos"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                      Procedimento Realizado (opcional)
                    </label>
                    <input
                      type="text"
                      value={serviceTag}
                      onChange={(e) => setServiceTag(e.target.value)}
                      placeholder="Ex: Tatuagem Fineline / Piercing no Septo"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Sua Nota
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setUserRating(star)}
                        className="p-1 text-2xl transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            star <= userRating ? 'fill-amber-400 text-amber-400' : 'text-zinc-600'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs text-amber-400 font-bold ml-2">
                      {userRating} de 5 estrelas
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Seu Comentário *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={userComment}
                    onChange={(e) => setUserComment(e.target.value)}
                    placeholder="Conte como foi sua experiência com o Roger, a higiene do estúdio e o resultado..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-5 py-2.5 rounded-full text-xs font-semibold text-zinc-400 hover:text-white"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    <Send size={14} />
                    <span>Publicar Avaliação</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Clean Comments Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className={`bg-zinc-900/90 border ${
                review.isUserSubmitted ? 'border-amber-500/50' : 'border-zinc-800'
              } hover:border-amber-600/40 p-6 sm:p-7 rounded-2xl relative transition-all duration-300 flex flex-col justify-between group shadow-lg`}
            >
              <Quote className="absolute top-5 right-5 text-zinc-800/80 group-hover:text-amber-500/10 transition-colors" size={38} />
              
              <div>
                {/* Rating and Time */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="fill-amber-400 text-amber-400 w-4 h-4" />
                    ))}
                    <span className="text-zinc-500 text-xs ml-2">{review.timeAgo}</span>
                  </div>

                  {review.isUserSubmitted && (
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <ThumbsUp size={10} /> Enviado no Site
                    </span>
                  )}
                </div>

                {/* Comment Text */}
                <p className="text-zinc-200 text-base sm:text-lg leading-relaxed mb-6 font-normal">
                  "{review.text}"
                </p>
              </div>

              {/* Author Header */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-zinc-800/90">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-600/20 to-zinc-800 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-base uppercase shrink-0">
                  {review.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h4 className="text-white font-bold text-sm sm:text-base leading-tight truncate">
                      {review.name}
                    </h4>
                    {review.isLocalGuide && (
                      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        <CheckCircle2 size={10} /> Local Guide
                      </span>
                    )}
                  </div>
                  <p className="text-zinc-400 text-xs truncate mt-0.5">
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
