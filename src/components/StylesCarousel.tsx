import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle, Sparkles, Check, ArrowUpRight } from 'lucide-react';
import { generateStyleWhatsAppLink } from '../utils/budget';

// High-fidelity generated studio assets
import realismImg from '../assets/images/showcase_realism_tattoo_1794111576857.jpg';
import maoriVikingImg from '../assets/images/showcase_maori_viking_1794111577455.jpg';
import floralImg from '../assets/images/tattoo_floral_fineline_1794112966551.jpg';
import egyptianImg from '../assets/images/tattoo_egyptian_god_1794112968280.jpg';
import animeImg from '../assets/images/tattoo_anime_geek_1794112967302.jpg';
import artistWorkingImg from '../assets/images/tattoo_artist_working_1794112967211.jpg';
import piercingImg from '../assets/images/showcase_body_piercing_1794111578222.jpg';

export interface StyleCategory {
  id: string;
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  image: string;
  badge: string;
}

export const STYLES_CATALOG: StyleCategory[] = [
  {
    id: 'Maori',
    name: 'Maori & Tribal',
    tagline: 'Geometria sagrada, preenchimento sólido e respeito à musculatura',
    description: 'Projetos de inspiração polinésia que vestem a anatomia corporal com linhas imponentes, curvas dinâmicas e preenchimento preto puro.',
    highlights: ['Encaixe anatômico perfeito', 'Linhas de alta precisão', 'Simbologia de força e proteção'],
    image: maoriVikingImg,
    badge: 'Conceito Maori'
  },
  {
    id: 'Nordica',
    name: 'Nórdica & Viking',
    tagline: 'Runas, nós celtas, elmos e mitologia nórdica',
    description: 'Composições detalhadas com nós entrelaçados, estética rúnica e deuses nórdicos com sombreamento profundo que valorizam ombros, braços e costas.',
    highlights: ['Trabalho de runas e nós entrelaçados', 'Contraste dramático', 'Estudo autoral na pele'],
    image: maoriVikingImg,
    badge: 'Conceito Viking'
  },
  {
    id: 'Grega',
    name: 'Grega & Realismo Black and Grey',
    tagline: 'Sombras ultra-suaves, estátuas clássicas e contraste escultural',
    description: 'Especialidade de alto nível técnico que reproduz a textura de esculturas de mármore clássicas, deuses olímpicos e expressões humanas com transições suaves de cinza.',
    highlights: ['Textura realista de mármore', 'Sombreamento fluído e duradouro', 'Pigmentos certificados de alta pureza'],
    image: realismImg,
    badge: 'Realismo Escultural'
  },
  {
    id: 'Egipcia',
    name: 'Egípcia Mística',
    tagline: 'Anúbis, Hórus, hieróglifos e estética milenar',
    description: 'Artes com divindades do antigo Egito, escaravelhos e adornos dourados em tons de preto e cinza com riqueza de detalhes ornamentais.',
    highlights: ['Precisão nos detalhes iconográficos', 'Textura de baixo-relevo antigo', 'Composição harmoniosa no antebraço ou perna'],
    image: egyptianImg,
    badge: 'Mitologia Egípcia'
  },
  {
    id: 'Flores',
    name: 'Flores & Fineline Botânico',
    tagline: 'Traços ultrafinos, leveza botânica e elegância atemporal',
    description: 'Tatuagens botânicas com agulhas de calibre fino (03RL/05RL), simulando ilustrações botânicas delicadas que acompanham a silhueta com leveza e sutileza.',
    highlights: ['Traço fino e sem expansão excessiva', 'Movimento orgânico nas curvas do corpo', 'Cicatrização rápida e suave'],
    image: floralImg,
    badge: 'Fineline Botânica'
  },
  {
    id: 'Anime',
    name: 'Anime & Geek',
    tagline: 'Mangás, games, traço dinâmico e estética pop contemporânea',
    description: 'Personagens icônicos, hachuras de mangá e enquadramentos de ação desenhados com a energia das animações e games favoritos.',
    highlights: ['Hachuras e traço fiel aos mangás', 'Composição cinética de ação', 'Adaptação do 2D para a tridimensionalidade da pele'],
    image: animeImg,
    badge: 'Cultura Geek & Mangá'
  },
  {
    id: 'Personalizados',
    name: 'Projetos Autorais Sob Medida',
    tagline: 'Criação exclusiva desenhada do zero para você',
    description: 'Você traz a sua ideia, memórias ou referências e o Roger desenvolve uma obra única, estudando diretamente o fluxo visual e a anatomia da região.',
    highlights: ['Projeto 100% exclusivo', 'Estudo anatômico sob medida para o corpo', 'Atendimento 1-a-1 com o artista'],
    image: artistWorkingImg,
    badge: 'Arte Autoral'
  },
  {
    id: 'Piercing',
    name: 'Body Piercing & Titânio',
    tagline: 'Joalheria biocompatível (ASTM F-136) e agulhas americanas',
    description: 'Perfurações com rigor hospitalar, técnica asséptica e joias em titânio grau implante ou aço cirúrgico para uma cicatrização sem traumas.',
    highlights: ['Titânio Grau Implante (Livre de níquel)', 'Perfuração rápida com agulha americana', 'Acompanhamento do pós-procedimento'],
    image: piercingImg,
    badge: 'Body Piercing'
  }
];

export const StylesCarousel: React.FC = () => {
  const [activeStyleId, setActiveStyleId] = useState<string>('Maori');
  const [selectedReference, setSelectedReference] = useState<string>('Maori');

  const currentIndex = STYLES_CATALOG.findIndex(s => s.id === activeStyleId);
  const currentStyle = STYLES_CATALOG[currentIndex] || STYLES_CATALOG[0];

  const handlePrev = () => {
    const nextIdx = (currentIndex - 1 + STYLES_CATALOG.length) % STYLES_CATALOG.length;
    setActiveStyleId(STYLES_CATALOG[nextIdx].id);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % STYLES_CATALOG.length;
    setActiveStyleId(STYLES_CATALOG[nextIdx].id);
  };

  return (
    <section id="portfolio" className="py-24 bg-zinc-900 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4 font-cinzel">
            Escolha seu estilo
          </h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto rounded-full mb-6"></div>
          <p className="text-zinc-400 max-w-2xl mx-auto text-base sm:text-lg">
            Explore nossos conceitos artísticos e selecione a inspiração perfeita para o seu projeto com o Roger.
          </p>
        </div>

        {/* Style Selector Buttons (Tabs) */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {STYLES_CATALOG.map((st) => (
            <button
              key={st.id}
              onClick={() => setActiveStyleId(st.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                activeStyleId === st.id
                  ? 'bg-amber-600 text-white shadow-[0_0_20px_rgba(217,119,6,0.4)] scale-105'
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
              }`}
            >
              {st.name.split('&')[0].trim()}
            </button>
          ))}
        </div>

        {/* Interactive Feature Carousel Card */}
        <div className="relative bg-zinc-950 rounded-3xl border border-zinc-800 overflow-hidden shadow-2xl p-6 sm:p-10 lg:p-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Visual Column (7 Cols) */}
            <div className="lg:col-span-7 relative group">
              <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800">
                <img
                  src={currentStyle.image}
                  alt={`${currentStyle.name} conceito`}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-70 group-hover:opacity-85 transition-opacity" />
                
                {/* Badge */}
                <div className="absolute top-4 left-4 bg-zinc-900/90 backdrop-blur-md border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                  {currentStyle.badge}
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-amber-500 text-xs font-bold tracking-widest uppercase block mb-1">
                    Conceito em Destaque
                  </span>
                  <h3 className="text-white text-xl sm:text-2xl font-black font-cinzel">
                    {currentStyle.name}
                  </h3>
                </div>
              </div>

              {/* Prev / Next controls */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    aria-label="Estilo anterior"
                    className="p-3 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Próximo estilo"
                    className="p-3 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                  <span className="text-xs text-zinc-500 ml-2">
                    {currentIndex + 1} de {STYLES_CATALOG.length} estilos
                  </span>
                </div>

                <button
                  onClick={() => setSelectedReference(currentStyle.name)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors ${
                    selectedReference === currentStyle.name
                      ? 'bg-amber-500/20 border border-amber-500 text-amber-300'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  <Check size={14} />
                  <span>{selectedReference === currentStyle.name ? 'Base Selecionada' : 'Definir como Base'}</span>
                </button>
              </div>
            </div>

            {/* Description & WhatsApp Reference Trigger (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-amber-500 text-xs uppercase tracking-widest font-bold">
                  Design &amp; Anatomia
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mt-1 font-cinzel">
                  {currentStyle.name}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 mt-2 italic">
                  "{currentStyle.tagline}"
                </p>
              </div>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                {currentStyle.description}
              </p>

              {/* Highlights */}
              <div className="space-y-2.5 pt-2 border-t border-zinc-800">
                {currentStyle.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-zinc-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Direct WhatsApp Call to Action */}
              <div className="pt-4">
                <a
                  href={generateStyleWhatsAppLink(currentStyle.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-amber-600 hover:bg-amber-500 text-white py-4 px-6 rounded-2xl font-bold uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(217,119,6,0.3)] hover:shadow-[0_0_30px_rgba(217,119,6,0.5)] transition-all hover:scale-[1.02]"
                >
                  <MessageCircle size={20} />
                  <span>Levar esta Base para o WhatsApp</span>
                  <ArrowUpRight size={16} />
                </a>
                <p className="text-[11px] text-zinc-500 text-center mt-2">
                  Você envia o estilo escolhido diretamente ao Roger para alinhar data e detalhes anatômicos.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
