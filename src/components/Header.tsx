import React, { useState } from 'react';
import { Menu, X, MessageSquare, Calendar } from 'lucide-react';
import { OFFICIAL_PHONE } from '../utils/budget';

interface HeaderProps {
  onOpenAssistant: () => void;
  onScrollTo: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAssistant, onScrollTo }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    onScrollTo(id);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => handleNavClick('home')}>
            <span className="text-xl sm:text-2xl font-black tracking-wider uppercase flex items-center gap-1.5 font-cinzel">
              <span className="text-white">
                ROGER
              </span>
              <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent drop-shadow-[0_0_14px_rgba(245,158,11,0.65)]">
                TATTOO
              </span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 lg:space-x-8">
            <button
              onClick={() => handleNavClick('portfolio')}
              className="text-xs uppercase tracking-widest text-zinc-300 hover:text-amber-500 transition-colors font-semibold"
            >
              Portfólio
            </button>
            <button
              onClick={() => handleNavClick('sobre')}
              className="text-xs uppercase tracking-widest text-zinc-300 hover:text-amber-500 transition-colors font-semibold"
            >
              O Artista
            </button>
            <button
              onClick={() => handleNavClick('localizacao')}
              className="text-xs uppercase tracking-widest text-zinc-300 hover:text-amber-500 transition-colors font-semibold"
            >
              Estúdio
            </button>
            <button
              onClick={() => handleNavClick('avaliacoes')}
              className="text-xs uppercase tracking-widest text-zinc-300 hover:text-amber-500 transition-colors font-semibold"
            >
              Avaliações
            </button>
            <button
              onClick={() => handleNavClick('faq')}
              className="text-xs uppercase tracking-widest text-zinc-300 hover:text-amber-500 transition-colors font-semibold"
            >
              Dúvidas (FAQ)
            </button>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenAssistant}
              className="px-3.5 py-2 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-700/80 rounded-full hover:border-amber-500/60 transition-colors flex items-center gap-1.5 whitespace-nowrap"
              aria-label="Abrir assistente virtual do estúdio"
            >
              <MessageSquare className="w-3.5 h-3.5 text-amber-500" />
              <span>Dúvidas com IA</span>
            </button>

            <a
              href={`https://wa.me/${OFFICIAL_PHONE}?text=${encodeURIComponent('Olá Roger! Vim pelo site oficial e gostaria de agendar um horário com você no estúdio privativo em Laguna.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-600 hover:bg-amber-500 text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(217,119,6,0.3)] hover:shadow-[0_0_25px_rgba(217,119,6,0.5)] flex items-center gap-1.5 whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Agendar</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={onOpenAssistant}
              className="p-2 text-amber-500 hover:text-amber-400"
              aria-label="Assistente IA"
            >
              <MessageSquare size={22} />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-zinc-300 hover:text-white p-2"
              aria-label="Menu principal"
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div className="md:hidden bg-zinc-950 border-b border-zinc-800 px-4 pt-2 pb-6 space-y-2">
          {['Portfólio', 'Sobre', 'Localização', 'Avaliações', 'FAQ', 'Contato'].map((item) => (
            <button
              key={item}
              onClick={() => handleNavClick(item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))}
              className="block w-full px-3 py-3 text-sm font-semibold uppercase tracking-widest text-left text-zinc-300 hover:bg-zinc-900 hover:text-amber-500 rounded-lg transition-colors"
            >
              {item}
            </button>
          ))}
          <div className="pt-3 border-t border-zinc-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setIsMenuOpen(false);
                onOpenAssistant();
              }}
              className="w-full py-2.5 text-xs font-semibold text-zinc-200 bg-zinc-900 rounded-lg flex items-center justify-center gap-2 border border-zinc-800"
            >
              <MessageSquare className="w-4 h-4 text-amber-500" />
              Tirar Dúvidas com IA
            </button>
            <a
              href={`https://wa.me/${OFFICIAL_PHONE}?text=${encodeURIComponent('Olá Roger! Vim pelo site oficial e gostaria de agendar um horário com você no estúdio privativo em Laguna.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-amber-600 hover:bg-amber-500 rounded-lg flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Agendar no WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
