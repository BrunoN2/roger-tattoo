import React from 'react';
import { MessageCircle, Instagram, ShieldCheck, MapPin } from 'lucide-react';
import { OFFICIAL_PHONE, DISPLAY_PHONE, INSTAGRAM_HANDLE } from '../utils/budget';

export const FooterSection: React.FC = () => {
  return (
    <footer id="contato" className="bg-zinc-900 pt-24 pb-12 border-t border-zinc-800">
      <div className="max-w-4xl mx-auto px-4 text-center">
        
        <span className="text-amber-500 text-xs uppercase tracking-widest font-bold">
          Agendamento Direto
        </span>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-6 font-cinzel mt-2">
          Pronto para <span className="text-amber-500">marcar</span>?
        </h2>

        <p className="text-zinc-400 text-base sm:text-lg mb-12 max-w-2xl mx-auto">
          Entre em contato diretamente para esclarecer dúvidas de projetos, valores e datas. O Roger atende exclusivamente com horário marcado em Laguna - SC.
        </p>

        {/* Big Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-5 mb-20 max-w-xl mx-auto">
          <a
            href={`https://wa.me/${OFFICIAL_PHONE}?text=${encodeURIComponent('Olá Roger! Vim pelo site e gostaria de conversar sobre uma ideia de tatuagem/piercing e consultar datas disponíveis.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-5 rounded-2xl font-bold uppercase tracking-wider transition-all hover:-translate-y-1 shadow-lg shadow-[#25D366]/20 text-base"
          >
            <MessageCircle size={26} />
            <span>Chamar no WhatsApp</span>
          </a>

          <a
            href={`https://instagram.com/${INSTAGRAM_HANDLE.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-90 text-white px-8 py-5 rounded-2xl font-bold uppercase tracking-wider transition-all hover:-translate-y-1 shadow-lg shadow-[#dc2743]/20 text-base"
          >
            <Instagram size={26} />
            <span>{INSTAGRAM_HANDLE}</span>
          </a>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-zinc-800 pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
        <div className="text-xl font-black tracking-tighter text-zinc-400 uppercase flex items-center gap-1.5 font-cinzel">
          <span className="text-amber-500">ROGER</span> TATTOO
        </div>
        <p className="text-center md:text-left">
          &copy; {new Date().getFullYear()} Roger Tattoo Studio. Todos os direitos reservados. Laguna – SC.
        </p>
        <div className="flex items-center gap-2 text-zinc-400">
          <span>Tatuagens Autorais &amp; Encaixe Anatômico</span>
          <span aria-hidden="true">·</span>
          <span>Biossegurança Hospitalar</span>
        </div>
      </div>
    </footer>
  );
};
