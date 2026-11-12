import React, { useState } from 'react';
import { Menu, X, Calendar } from 'lucide-react';

interface HeaderProps {
  onScrollTo: (id: string) => void;
  onOpenSchedule: () => void;
}

const NAV_ITEMS = [
  { label: 'Portfólio', target: 'portfolio' },
  { label: 'O Artista', target: 'sobre' },
  { label: 'Estúdio', target: 'localizacao' },
  { label: 'Avaliações', target: 'avaliacoes' },
  { label: 'Dúvidas (FAQ)', target: 'faq' },
];

export const Header: React.FC<HeaderProps> = ({ onScrollTo, onOpenSchedule }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    onScrollTo(id);
    setIsMenuOpen(false);
  };

  const handleScheduleClick = () => {
    setIsMenuOpen(false);
    onOpenSchedule();
  };

  return (
    <nav className="fixed w-full z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          
          {/* Logo */}
          <button
            type="button"
            className="flex-shrink-0 cursor-pointer text-left"
            onClick={() => handleNavClick('home')}
          >
            <span className="text-lg sm:text-2xl font-black tracking-wider uppercase flex items-center gap-1.5 font-cinzel">
              <span className="text-white">
                ROGER
              </span>
              <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent drop-shadow-[0_0_14px_rgba(245,158,11,0.65)]">
                TATTOO
              </span>
            </span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 lg:space-x-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.target}
                onClick={() => handleNavClick(item.target)}
                className="text-xs uppercase tracking-widest text-zinc-300 hover:text-amber-500 transition-colors font-semibold"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              onClick={handleScheduleClick}
              className="bg-amber-600 hover:bg-amber-500 text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(217,119,6,0.3)] hover:shadow-[0_0_25px_rgba(217,119,6,0.5)] flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Agendar</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={handleScheduleClick}
              className="sm:hidden bg-amber-600 hover:bg-amber-500 text-white px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
            >
              <Calendar className="w-3 h-3" />
              <span>Agendar</span>
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-zinc-300 hover:text-white p-2"
              aria-label="Menu principal"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div className="md:hidden bg-zinc-950/95 backdrop-blur-lg border-b border-zinc-800 px-4 pt-2 pb-5 space-y-1">
          {[...NAV_ITEMS, { label: 'Contato', target: 'contato' }].map((item) => (
            <button
              key={item.target}
              onClick={() => handleNavClick(item.target)}
              className="block w-full px-3 py-2.5 text-xs font-semibold uppercase tracking-widest text-left text-zinc-300 hover:bg-zinc-900 hover:text-amber-500 rounded-lg transition-colors"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2.5 border-t border-zinc-800">
            <button
              type="button"
              onClick={handleScheduleClick}
              className="w-full py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-amber-600 hover:bg-amber-500 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              Agendar Horário
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
