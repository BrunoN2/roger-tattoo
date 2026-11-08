import React from 'react';
import { ChevronRight, MessageCircle, Star, ShieldCheck } from 'lucide-react';
import studioHeroImg from '../assets/images/hero_tattoo_studio_1794111576826.jpg';
import { OFFICIAL_PHONE } from '../utils/budget';

interface HeroProps {
  onOpenAssistant: () => void;
  onScrollTo: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAssistant, onScrollTo }) => {
  return (
    <section id="home" className="relative min-h-[90vh] sm:min-h-screen flex items-center overflow-hidden pt-24 pb-16">
      
      {/* Background Video - More apparent and cinematic, positioned to highlight action */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={studioHeroImg}
          className="w-full h-full object-cover object-center scale-100 sm:scale-105 opacity-65 sm:opacity-75 brightness-90 filter"
        >
          <source src="./assets/aistudio/gemini_generated_video_244007a4_2c987808.mp4" type="video/mp4" />
        </video>
        
        {/* Directional gradient overlay: darker on left for crisp readability, open on right for video clarity */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-zinc-950/30 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/80 z-10" />
      </div>

      {/* Content Aligned to the Side (Left-aligned) with Concise Rephrased Copy */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl text-left">
          
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 text-xs text-zinc-300 mb-5 bg-zinc-950/80 border border-zinc-800/90 backdrop-blur-md px-3.5 py-1.5 rounded-full">
            <span className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              5.0 no Google
            </span>
            <span className="text-zinc-600">·</span>
            <span>Laguna – SC</span>
            <span className="text-zinc-600 hidden sm:inline">·</span>
            <span className="text-zinc-400 hidden sm:inline">Horário Marcado</span>
          </div>

          <h2 className="text-amber-500 font-bold tracking-[0.2em] uppercase text-xs sm:text-sm mb-3 font-cinzel">
            ROGER TATTOO · Estúdio Privativo
          </h2>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight mb-5 leading-[1.08] font-cinzel">
            Sua ideia,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-100">
              Eternizada na pele.
            </span>
          </h1>

          {/* Shorter, punchier description */}
          <p className="text-base sm:text-lg text-zinc-300 mb-8 max-w-xl font-normal leading-relaxed">
            Traço fino, encaixe anatômico e arte autoral. Atendimento exclusivo em ambiente climatizado e seguro no Bairro Progresso.
          </p>

          {/* Left-aligned Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5">
            <button
              onClick={() => onScrollTo('portfolio')}
              className="bg-amber-600 hover:bg-amber-500 text-white px-7 py-3.5 rounded-full font-bold uppercase tracking-wider transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(217,119,6,0.35)] text-xs sm:text-sm"
            >
              <span>Ver Estilos</span>
              <ChevronRight size={18} />
            </button>

            <a
              href={`https://wa.me/${OFFICIAL_PHONE}?text=${encodeURIComponent('Olá Roger! Vim pelo site oficial e gostaria de conversar sobre meu projeto de tatuagem.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-900/90 hover:bg-zinc-800 text-zinc-100 hover:text-white px-6 py-3.5 rounded-full font-bold uppercase tracking-wider transition-all border border-zinc-700/80 flex items-center justify-center gap-2 text-xs sm:text-sm backdrop-blur-sm"
            >
              <MessageCircle size={18} className="text-[#25D366]" />
              <span>Chamar no WhatsApp</span>
            </a>
          </div>

          {/* Mini highlights */}
          <div className="flex items-center gap-4 text-xs text-zinc-400 mt-8 pt-6 border-t border-zinc-800/70">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              Biossegurança Hospitalar
            </span>
            <span className="text-zinc-700">·</span>
            <span>Ambiente 100% Climatizado</span>
          </div>

        </div>
      </div>

    </section>
  );
};
