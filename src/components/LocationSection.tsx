// LocationSection.tsx
import React from 'react';
import { MapPin, MessageCircle, ShieldCheck, Clock, Navigation, ExternalLink } from 'lucide-react';
import { 
  OFFICIAL_PHONE, 
  DISPLAY_PHONE, 
  GOOGLE_MAPS_URL, 
  GOOGLE_MAPS_DIRECTIONS_URL 
} from '../utils/budget';

export const LocationSection: React.FC = () => {
  return (
    <section id="localizacao" className="py-24 bg-zinc-900 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-zinc-950 rounded-3xl p-6 sm:p-10 lg:p-12 border border-zinc-800 flex flex-col lg:flex-row items-stretch justify-between gap-10 shadow-2xl">
          
          {/* Left Info Column */}
          <div className="flex-1 flex flex-col justify-between space-y-6">
            <div>
              <div className="w-14 h-14 bg-amber-600/10 rounded-2xl border border-amber-500/20 flex items-center justify-center mb-4">
                <MapPin className="text-amber-500" size={30} />
              </div>

              <span className="text-amber-500 text-xs uppercase tracking-widest font-bold">
                Localização &amp; Estúdio Privativo
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mt-1 font-cinzel">
                Estúdio em Laguna - SC
              </h2>

              <p className="text-zinc-400 text-base sm:text-lg leading-relaxed mt-4">
                Ambiente 100% climatizado, discreto e estruturado com materiais estéreis de nível hospitalar. Atendimento individual e tranquilo para planejar e realizar sua tatuagem com total segurança.
              </p>
            </div>

            {/* Address Details without raw coordinates numbers */}
            <div className="space-y-3.5 bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800/80 text-zinc-300 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Bairro Progresso (próximo ao Fórum)</span>
                  <span className="text-xs text-zinc-400">Laguna – Santa Catarina</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span><strong>Atendimento:</strong> Exclusivamente com horário marcado</span>
              </div>

              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
                <span><strong>Biossegurança:</strong> Sala privativa (máximo 1 acompanhante)</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-amber-500/80 text-white px-5 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all"
              >
                <ExternalLink size={16} className="text-amber-400" />
                <span>Abrir no Google Maps</span>
              </a>

              <a
                href={GOOGLE_MAPS_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white px-5 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(217,119,6,0.3)]"
              >
                <Navigation size={16} />
                <span>Traçar Rota no GPS</span>
              </a>

              <a
                href={`https://wa.me/${OFFICIAL_PHONE}?text=${encodeURIComponent('Olá Roger! Gostaria de consultar as datas disponíveis e confirmar a localização do estúdio no Bairro Progresso em Laguna.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 px-5 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all border border-zinc-700/50"
              >
                <MessageCircle size={16} className="text-emerald-400" />
                <span>WhatsApp: {DISPLAY_PHONE}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Authentic Studio Facade Photograph */}
          <div className="flex-1 w-full min-h-[380px] sm:min-h-[440px] rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 relative shadow-2xl flex flex-col group">
            
            {/* Top Bar for Studio Facade */}
            <div className="bg-zinc-950 px-4 py-3 border-b border-zinc-800 flex items-center justify-between text-xs text-zinc-300 z-10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-bold font-cinzel">
                  <span className="text-white">ROGER </span>
                  <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">TATTOO</span>
                  <span className="text-zinc-400 font-normal text-xs ml-1">Studio</span>
                </span>
                <span className="text-zinc-500 hidden sm:inline">· Fachada Oficial em Laguna - SC</span>
              </div>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 text-[11px]"
              >
                <span>Ver no Maps</span>
                <ExternalLink size={12} />
              </a>
            </div>

            {/* Studio Facade Image with Luxury Overlays */}
            <div className="relative flex-1 w-full min-h-[300px] overflow-hidden bg-zinc-900">
              <img
                src="./assets/aistudio/Captura_de_Tela_2026-11-08_a_s_13.03.05_8d59e01e.png"
                alt="Fachada oficial do estúdio ROGER TATTOO em Laguna - SC"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                style={{ objectPosition: '50% 50%' }}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80" />
              
              {/* Badge on top of image */}
              <div className="absolute top-4 left-4 bg-zinc-950/85 backdrop-blur-md border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                <MapPin size={13} className="text-amber-400" />
                <span>Fachada Oficial do Estúdio</span>
              </div>

              {/* Informative overlay at bottom of image */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-xs sm:text-sm font-bold font-cinzel text-zinc-100">
                  Estúdio Privativo no Bairro Progresso
                </p>
                <p className="text-[11px] text-zinc-300 mt-0.5">
                  Ao lado do Consultório Odontológico, próximo ao Fórum de Laguna
                </p>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-zinc-950 px-4 py-3 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400 z-10">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                Perto do Fórum de Laguna
              </span>
              <span className="text-emerald-400 font-medium flex items-center gap-1">
                <span>Atendimento 100% Privativo</span>
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
