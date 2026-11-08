import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle, Sparkles, Check, ArrowUpRight, ChevronDown, Layers } from 'lucide-react';
import { generateStyleWhatsAppLink } from '../utils/budget';

// High-fidelity generated studio assets
import realismImg from '../assets/images/showcase_realism_tattoo_1794111576857.jpg';
import maoriImg from '../assets/images/maori_tribal_tattoo_1794140723982.jpg';
import norseVikingImg from '../assets/images/norse_viking_tattoo_1794140694466.jpg';
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
    image: maoriImg,
    badge: 'Conceito Maori'
  },
  {
    id: 'Nordica',
    name: 'Nórdica & Viking',
    tagline: 'Runas, nós celtas, elmos e mitologia nórdica',
    description: 'Composições detalhadas com nós entrelaçados, estética rúnica e deuses nórdicos com sombreamento profundo que valorizam ombros, braços e costas.',
    highlights: ['Trabalho de runas e nós entrelaçados', 'Contraste dramático', 'Estudo autoral na pele'],
    image: norseVikingImg,
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
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentIndex = STYLES_CATALOG.findIndex(s => s.id === activeStyleId);
  const currentStyle = STYLES_CATALOG[currentIndex] || STYLES_CATALOG[0];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePrev = () => {
    const nextIdx = (currentIndex - 1 + STYLES_CATALOG.length) % STYLES_CATALOG.length;
    setActiveStyleId(STYLES_CATALOG[nextIdx].id);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % STYLES_CATALOG.length;
    setActiveStyleId(STYLES_CATALOG[nextIdx].id);
  };

  const handleSelectStyle = (id: string) => {
    setActiveStyleId(id);
    setIsDropdownOpen(false);
  };

  return (
    <section id="portfolio" className="py-24 bg-zinc-900 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4 font-cinzel">
            Escolha seu estilo
          </h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto rounded-full mb-6"></div>
          <p className="text-zinc-400 max-w-2xl mx-auto text-base sm:text-lg">
            Explore nossos conceitos artísticos e selecione a inspiração perfeita para o seu projeto com o Roger.
          </p>
        </div>

        {/* Clean Luxury Dropdown Menu (Substitui os botões soltos para não poluir a tela) */}
        <div className="max-w-xl mx-auto mb-10 relative z-30" ref={dropdownRef}>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label="Estilo anterior"
              className="p-3.5 rounded-2xl bg-zinc-950 hover:bg-zinc-800 text-zinc-400 hover:text-amber-400 border border-zinc-800 transition-colors shadow-lg shrink-0"
              title="Estilo anterior"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Main Dropdown Button */}
            <div className="relative flex-1">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`w-full bg-zinc-950 border px-5 py-3.5 rounded-2xl flex items-center justify-between text-left transition-all duration-200 shadow-xl group ${
                  isDropdownOpen
                    ? 'border-amber-500 ring-2 ring-amber-500/20'
                    : 'border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-105 transition-transform">
                    <Layers size={18} />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-amber-500 block">
                      Estilo Selecionado
                    </span>
                    <span className="text-base sm:text-lg font-bold text-white font-cinzel truncate block">
                      {currentStyle.name}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0 pl-2">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400">
                    {currentIndex + 1} de {STYLES_CATALOG.length}
                  </span>
                  <div className={`p-1 rounded-lg text-zinc-400 group-hover:text-amber-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-amber-400' : ''}`}>
                    <ChevronDown size={20} />
                  </div>
                </div>
              </button>

              {/* Dropdown Popover List */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-950/98 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-2xl p-2 max-h-96 overflow-y-auto space-y-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-900 flex justify-between items-center">
                    <span>Todos os Estilos &amp; Serviços</span>
                    <span className="text-amber-500">Toque para selecionar</span>
                  </div>
                  {STYLES_CATALOG.map((st, idx) => {
                    const isSelected = st.id === activeStyleId;
                    return (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => handleSelectStyle(st.id)}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between group ${
                          isSelected
                            ? 'bg-amber-600/15 border border-amber-500/40 text-white'
                            : 'hover:bg-zinc-900 border border-transparent text-zinc-300 hover:text-white'
                        }`}
                      >
                        <div className="min-w-0 pr-3">
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-bold font-cinzel ${isSelected ? 'text-amber-400' : 'text-zinc-200 group-hover:text-white'}`}>
                              {st.name}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400">
                              {st.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                            {st.tagline}
                          </p>
                        </div>
                        {isSelected && (
                          <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                            <Check size={14} />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <button
              onClick={handleNext}
              aria-label="Próximo estilo"
              className="p-3.5 rounded-2xl bg-zinc-950 hover:bg-zinc-800 text-zinc-400 hover:text-amber-400 border border-zinc-800 transition-colors shadow-lg shrink-0"
              title="Próximo estilo"
            >
              <ChevronRight size={20} />
            </button>
          </div>
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
