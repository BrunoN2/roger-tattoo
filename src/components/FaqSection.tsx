import React, { useState } from 'react';
import { ChevronDown, Search, MessageCircle, HelpCircle } from 'lucide-react';
import { searchFaq, OFFICIAL_PHONE } from '../utils/budget';

export const FaqSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openId, setOpenId] = useState<string | null>('preco-tattoo');

  const filteredFaqs = searchFaq(searchQuery);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-16 lg:py-24 bg-[#0a0b0d]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-xs font-semibold tracking-widest uppercase text-amber-400 mb-2">
            Perguntas Frequentes
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            Tire Suas Dúvidas Sobre Procedimentos e Valores
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-400">
            Respostas transparentes sobre orçamentos, biossegurança, normas sanitárias e cuidados.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por preço, piercing, 16 anos, cicatrização, pagamento..."
            className="w-full pl-11 pr-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center text-zinc-400 bg-zinc-900/50 rounded-xl border border-zinc-800">
              <HelpCircle className="w-8 h-8 text-amber-400/60 mx-auto mb-2" />
              <p className="text-sm font-medium text-zinc-300">Nenhuma pergunta encontrada com este termo.</p>
              <p className="text-xs text-zinc-500 mt-1">Fale diretamente com o Roger para esclarecer qualquer dúvida personalizada.</p>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-zinc-900/70 border border-white/10 rounded-xl overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-zinc-800/40 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-sm sm:text-base text-zinc-100 font-cinzel">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-amber-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-sm text-zinc-300 leading-relaxed border-t border-zinc-800/60 bg-zinc-950/40">
                      <p>{faq.answer}</p>
                      <div className="mt-3 flex items-center gap-2 text-[11px] text-zinc-500">
                        <span>Categoria:</span>
                        <span className="text-amber-400/90 font-medium">{faq.category}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Direct Contact Card */}
        <div className="mt-10 p-6 bg-gradient-to-r from-zinc-900 to-zinc-950 rounded-xl border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-cinzel text-base font-bold text-white">
              Precisa de uma resposta personalizada para o seu caso?
            </h4>
            <p className="text-xs text-zinc-400">
              O Roger responde pessoalmente pelo canal oficial de atendimento.
            </p>
          </div>

          <a
            href={`https://wa.me/${OFFICIAL_PHONE}?text=${encodeURIComponent('Olá Roger! Estava lendo o FAQ no site e gostaria de tirar uma dúvida específica sobre meu projeto.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-2 shrink-0 whitespace-nowrap shadow-md shadow-amber-400/10"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chamar no WhatsApp (+55 48 99694-1990)</span>
          </a>
        </div>

      </div>
    </section>
  );
};
