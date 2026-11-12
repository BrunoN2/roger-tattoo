import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle, Check, ArrowUpRight, ChevronDown, Layers } from 'lucide-react';
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
    tagline: 'Geometria sagrada e encaixe muscular',
    description: 'Inspiração polinésia com linhas imponentes e preenchimento preto sólido.',
    highlights: ['Encaixe anatômico', 'Traços de alta precisão', 'Preto sólido duradouro'],
    image: maoriImg,
    badge: 'Maori'
  },
  {
    id: 'Nordica',
    name: 'Nórdica & Viking',
    tagline: 'Runas, nós celtas e mitologia nórdica',
    description: 'Composições rúnicas e nórdicas com contraste profundo para braços e ombros.',
    highlights: ['Runas e nós celtas', 'Contraste dramático', 'Desenho autoral'],
    image: norseVikingImg,
    badge: 'Viking'
  },
  {
    id: 'Grega',
    name: 'Grega & Realismo',
    tagline: 'Estátuas clássicas e Black & Grey',
    description: 'Textura de mármore e sombreamento suave com acabamento escultural.',
    highlights: ['Efeito mármore realista', 'Sombras suaves', 'Pigmentos certificados'],
    image: realismImg,
    badge: 'Realismo'
  },
  {
    id: 'Egipcia',
    name: 'Egípcia Mística',
    tagline: 'Anúbis, Hórus e simbolismo milenar',
    description: 'Divindades egípcias e adornos em preto e cinza ricos em detalhes.',
    highlights: ['Detalhes ornamentais', 'Relevo clássico', 'Composição harmônica'],
    image: egyptianImg,
    badge: 'Egípcia'
  },
  {
    id: 'Flores',
    name: 'Flores & Fineline',
    tagline: 'Traços ultrafinos e leveza botânica',
    description: 'Botânica delicada com agulhas finas que acompanham as curvas do corpo.',
    highlights: ['Traço fino e nítido', 'Movimento orgânico', 'Cicatrização leve'],
    image: floralImg,
    badge: 'Fineline'
  },
  {
    id: 'Anime',
    name: 'Anime & Geek',
    tagline: 'Mangás, games e traço dinâmico',
    description: 'Personagens e cenas de ação com hachuras fiéis e acabamento moderno.',
    highlights: ['Hachuras estilo mangá', 'Enquadramento dinâmico', 'Adaptação na pele'],
    image: animeImg,
    badge: 'Geek'
  },
  {
    id: 'Personalizados',
    name: 'Projetos Autorais',
    tagline: 'Criação exclusiva desenhada do zero',
    description: 'Sua ideia transformada em arte única, planejada para a sua anatomia.',
    highlights: ['100% exclusivo', 'Estudo anatômico', 'Atendimento individual'],
    image: artistWorkingImg,
    badge: 'Autoral'
  },
  {
    id: 'Piercing',
    name: 'Body Piercing',
    tagline: 'Titânio grau implante e biossegurança',
    description: 'Aplicações assépticas com agulha americana e joias biocompatíveis.',
    highlights: ['Titânio ASTM F-136', 'Material 100% estéril', 'Pós-procedimento assistido'],
    image: piercingImg,
    badge: 'Piercing'
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
    <section id="portfolio" className="py-12 sm:py-20 bg-zinc-900 border-t border-zinc-800 scroll-mt-16 sm:scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Title */}
        <div className="text-center mb-5 sm:mb-8">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-2.5 font-cinzel">
            Escolha seu estilo
          </h2>
          <div className="w-14 sm:w-20 h-1 bg-amber-600 mx-auto rounded-full mb-2.5 sm:mb-4"></div>
          <p className="text-zinc-400 max-w-md mx-auto text-xs sm:text-sm">
            Selecione um estilo e envie sua ideia ao Roger.
          </p>
        </div>

        {/* Compact Mobile-First Dropdown Selector */}
        <div className="max-w-[310px] sm:max-w-sm mx-auto mb-5 sm:mb-8 relative z-30" ref={dropdownRef}>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              aria-label="Estilo anterior"
              className="p-2 sm:p-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-zinc-400 hover:text-amber-400 border border-zinc-800 transition-colors shadow-md shrink-0"
              title="Estilo anterior"
            >
              <ChevronLeft size={15} />
            </button>

            {/* Main Dropdown Button */}
            <div className="relative flex-1 min-w-0">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-expanded={isDropdownOpen}
                aria-haspopup="listbox"
                className={`w-full bg-zinc-950 border px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl flex items-center justify-between text-left transition-all duration-200 shadow-lg group ${
                  isDropdownOpen
                    ? 'border-amber-500 ring-2 ring-amber-500/20'
                    : 'border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                    <Layers size={13} />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[8px] sm:text-[9px] uppercase font-bold tracking-widest text-amber-500 block leading-none mb-0.5">
                      Estilo
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white font-cinzel truncate block">
                      {currentStyle.name}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0 pl-1.5">
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400">
                    {currentIndex + 1}/{STYLES_CATALOG.length}
                  </span>
                  <div className={`text-zinc-400 group-hover:text-amber-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-amber-400' : ''}`}>
                    <ChevronDown size={15} />
                  </div>
                </div>
              </button>

              {/* Compact Dropdown Popover List */}
              {isDropdownOpen && (
                <div
                  role="listbox"
                  aria-label="Selecionar estilo"
                  className="absolute top-full left-0 right-0 mt-1.5 bg-zinc-950/98 backdrop-blur-xl border border-zinc-800 rounded-xl shadow-2xl p-1 max-h-80 overflow-y-auto space-y-0.5 z-50"
                >
                  {STYLES_CATALOG.map((st) => {
                    const isSelected = st.id === activeStyleId;
                    return (
                      <button
                        key={st.id}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => handleSelectStyle(st.id)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-all flex items-center justify-between gap-2 group ${
                          isSelected
                            ? 'bg-amber-600/15 border border-amber-500/40 text-white'
                            : 'hover:bg-zinc-900 border border-transparent text-zinc-300 hover:text-white'
                        }`}
                      >
                        <div className="min-w-0 flex items-center gap-2">
                          <span className={`text-[11px] sm:text-xs font-bold font-cinzel truncate ${isSelected ? 'text-amber-400' : 'text-zinc-200 group-hover:text-white'}`}>
                            {st.name}
                          </span>
                        </div>
                        {isSelected && (
                          <Check size={13} className="text-amber-400 shrink-0" />
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
              className="p-2 sm:p-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-zinc-400 hover:text-amber-400 border border-zinc-800 transition-colors shadow-md shrink-0"
              title="Próximo estilo"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>

        {/* Interactive Feature Card (Mobile-first compact layout) */}
        <div className="relative bg-zinc-950 rounded-2xl sm:rounded-3xl border border-zinc-800 overflow-hidden shadow-2xl p-4 sm:p-8 lg:p-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-10 items-center">
            
            {/* Visual Column (7 Cols) */}
            <div className="lg:col-span-7 relative group">
              <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-xl sm:rounded-2xl bg-zinc-900 border border-zinc-800">
                <img
                  src={currentStyle.image}
                  alt={`${currentStyle.name} conceito`}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-75" />
                
                {/* Badge */}
                <div className="absolute top-3 left-3 bg-zinc-900/90 backdrop-blur-md border border-amber-500/30 text-amber-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                  {currentStyle.badge}
                </div>

                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                  <span className="text-amber-500 text-[10px] sm:text-xs font-bold tracking-widest uppercase block mb-0.5">
                    Destaque
                  </span>
                  <h3 className="text-white text-lg sm:text-2xl font-black font-cinzel">
                    {currentStyle.name}
                  </h3>
                </div>
              </div>

              {/* Reference & Desktop Controls */}
              <div className="flex items-center justify-between gap-2 mt-2.5 sm:mt-4">
                <div className="hidden sm:flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    aria-label="Estilo anterior"
                    className="p-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Próximo estilo"
                    className="p-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors"
                  >
                    <ChevronRight size={16} />
                  </button>
                  <span className="text-xs text-zinc-500 ml-1">
                    {currentIndex + 1} de {STYLES_CATALOG.length}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedReference(currentStyle.name)}
                  className={`ml-auto px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-bold flex items-center gap-1.5 transition-colors ${
                    selectedReference === currentStyle.name
                      ? 'bg-amber-500/20 border border-amber-500 text-amber-300'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  <Check size={13} />
                  <span>{selectedReference === currentStyle.name ? 'Base Selecionada' : 'Usar como Base'}</span>
                </button>
              </div>
            </div>

            {/* Concise Description & WhatsApp CTA (5 Cols) */}
            <div className="lg:col-span-5 space-y-3.5 sm:space-y-5">
              <div>
                <span className="text-amber-500 text-[10px] sm:text-xs uppercase tracking-widest font-bold">
                  Design &amp; Anatomia
                </span>
                <h3 className="text-xl sm:text-3xl font-black text-white uppercase tracking-tight mt-0.5 font-cinzel">
                  {currentStyle.name}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1 italic">
                  "{currentStyle.tagline}"
                </p>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {currentStyle.description}
              </p>

              {/* Compact Highlights */}
              <div className="space-y-1.5 sm:space-y-2 pt-2 border-t border-zinc-800">
                {currentStyle.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Direct WhatsApp Call to Action */}
              <div className="pt-2 sm:pt-3">
                <a
                  href={generateStyleWhatsAppLink(currentStyle.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-amber-600 hover:bg-amber-500 text-white py-3 sm:py-3.5 px-5 rounded-xl sm:rounded-2xl font-bold uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(217,119,6,0.3)] hover:shadow-[0_0_30px_rgba(217,119,6,0.5)] transition-all hover:scale-[1.01]"
                >
                  <MessageCircle size={18} />
                  <span>Enviar no WhatsApp</span>
                  <ArrowUpRight size={15} />
                </a>
                <p className="text-[10px] sm:text-[11px] text-zinc-500 text-center mt-2">
                  Alinhe data e detalhes direto com o Roger.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
