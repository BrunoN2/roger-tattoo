import React from 'react';
import { MapPin, ShieldCheck, Award } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="sobre" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Real Artist Photo with Luxury Border & Signature Card */}
          <div className="relative">
            <div className="absolute -inset-4 border border-amber-600/30 rounded-3xl translate-x-3 translate-y-3 -z-10" />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-zinc-800 bg-zinc-900 group">
              <img
                src="./assets/aistudio/c7d5dd4e-520d-4605-bb71-9b809d5fc13a_a3ab6242.JPG"
                alt="Roger - Tatuador e Body Piercer do ROGER TATTOO em Laguna - SC"
                className="w-full aspect-[4/5] object-cover filter contrast-[1.02] group-hover:scale-102 transition-transform duration-700"
                style={{ objectPosition: '25% 42%' }}
                referrerPolicy="no-referrer"
              />
              
              {/* Dedicated Artist Signature Bar */}
              <div className="p-4 sm:p-5 bg-zinc-950/95 border-t border-zinc-800 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-bold text-lg font-cinzel tracking-wide flex items-center gap-2">
                    <span>Roger</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  </h3>
                  <p className="text-xs text-amber-400 font-medium">Tatuador &amp; Body Piercer Especialista</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-zinc-300 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800 font-medium">
                  <MapPin size={13} className="text-amber-500" />
                  <span>Laguna – SC</span>
                </div>
              </div>
            </div>
          </div>

          {/* Story and Artistry principles */}
          <div>
            <span className="text-amber-500 text-xs uppercase tracking-widest font-bold">
              Autoria &amp; Concepção
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4 font-cinzel mt-1">
              O Artista
            </h2>
            <div className="w-16 h-1 bg-amber-600 rounded-full mb-8"></div>
            
            <div className="space-y-6 text-zinc-300 text-base sm:text-lg leading-relaxed">
              <p>
                Com anos de dedicação à arte corporal, <strong className="text-white">Roger</strong> construiu um estúdio privativo focado em proporcionar uma experiência calma, acolhedora e segura em Laguna – SC.
              </p>
              <p>
                Não somos apenas "fazedores de tatuagem". <strong className="text-amber-400">Cada projeto é desenhado sob medida para você</strong>: estudamos o formato do seu corpo, o fluxo natural dos músculos e a harmonia visual antes de encostar qualquer agulha na pele. Isso garante uma tatuagem com encaixe anatômico perfeito, traço nítido e que envelhece bonita ao longo dos anos.
              </p>
              <p>
                Cada agulhada é pensada. Cada traço é planejado. Nosso estúdio em Laguna - SC é um ambiente tranquilo, com higiene hospitalar e respeito absoluto pela sua história.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-12 pt-10 border-t border-zinc-800">
              <div>
                <h4 className="text-4xl font-black text-white mb-1 font-cinzel">+10</h4>
                <p className="text-zinc-500 uppercase tracking-widest text-xs font-semibold">Anos de Experiência</p>
              </div>
              <div>
                <h4 className="text-4xl font-black text-white mb-1 font-cinzel">+5k</h4>
                <p className="text-zinc-500 uppercase tracking-widest text-xs font-semibold">Artes Finalizadas</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
