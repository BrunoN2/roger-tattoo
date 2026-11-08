import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, MessageCircle, Sparkles, RefreshCw } from 'lucide-react';
import { OFFICIAL_PHONE } from '../utils/budget';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface VirtualAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_PROMPTS = [
  'Vocês furam o septo? Quanto custa e dói muito?',
  'Tem horário para amanhã? Quanto sai um leão no antebraço?',
  'Menor de 18 anos pode tatuar ou colocar piercing?',
  'Quais as formas de pagamento e onde fica o estúdio?'
];

export const VirtualAssistantModal: React.FC<VirtualAssistantModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Olá! Sou o assistente virtual exclusivo do ROGER TATTOO em Laguna - SC. 🖋️✨\n\nPosso te ajudar com dúvidas sobre estilos, valores base (tatuagens autorais a partir de R$ 300 e piercings a partir de R$ 80 a R$ 100), biossegurança ou direcionar para o agendamento no WhatsApp oficial. O que você gostaria de saber hoje?'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const getLocalReply = (prompt: string): string => {
    const p = prompt.toLowerCase();
    if (p.includes('septo')) {
      return 'Olá! Fazemos sim. ✨ Nossas perfurações de septo são realizadas com agulhas americanas estéreis e joias biocompatíveis (titânio grau implante ou aço cirúrgico). A dor é rápida e bem tolerável. Nossas aplicações de piercing partem de R$ 80 a R$ 100 já com a joia inicial inclusa. Deseja agendar pelo WhatsApp?';
    }
    if (p.includes('leão') || p.includes('leao') || (p.includes('antebraço') && p.includes('quanto'))) {
      return 'Olá! 🖤 Nossos projetos autorais partem de R$ 300. Um projeto no antebraço depende do estilo escolhido (Grego/Realismo, Maori ou Geométrico) e do tamanho em centímetros. Como o Roger atende exclusivamente com horário marcado, você pode mandar sua referência no WhatsApp oficial (+55 48 99694-1990) para o Roger avaliar!';
    }
    if (p.includes('preço') || p.includes('quanto custa') || p.includes('valor')) {
      if (p.includes('piercing') || p.includes('furo') || p.includes('furar') || p.includes('helix') || p.includes('hélice') || p.includes('nostril') || p.includes('septo')) {
        return 'Nossas perfurações de Body Piercing partem de R$ 80 a R$ 100 já com a joia básica esterilizada inclusa (com opção de titânio grau implante). Qual perfuração você gostaria de fazer? Podemos consultar os horários no WhatsApp!';
      }
      return 'Nossos projetos de tatuagem autoral e exclusiva começam a partir de R$ 300. O valor final depende das dimensões em cm, nível de detalhe e local do corpo. Você pode alinhar sua ideia diretamente no WhatsApp do Roger!';
    }
    if (p.includes('onde') || p.includes('endereço') || p.includes('local') || p.includes('laguna') || p.includes('bairro') || p.includes('maps')) {
      return 'Nosso estúdio privativo fica no Bairro Progresso (próximo ao Fórum), em Laguna - SC. É um ambiente climatizado, seguro e com horário marcado. Você pode abrir o Google Maps ou traçar rota diretamente pelo mapa no site!';
    }
    if (p.includes('menor') || p.includes('idade') || p.includes('16') || p.includes('18')) {
      return 'Atendemos menores apenas a partir dos 16 anos completos, mediante presença física e autorização formal assinada pelos pais/responsáveis com documentos originais com foto.';
    }
    if (p.includes('pagamento') || p.includes('cartão') || p.includes('pix') || p.includes('parcel')) {
      return 'Aceitamos Pix com liberação instantânea, dinheiro em espécie e todos os cartões de crédito/débito com parcelamento em até 12x.';
    }
    return 'Olá! Sou o assistente do ROGER TATTOO em Laguna - SC. Nossos projetos autorais começam a partir de R$ 300 e piercings a partir de R$ 80 a R$ 100. Trabalhamos exclusivamente com horário marcado. Gostaria de tirar dúvidas ou falar com o Roger no WhatsApp oficial (+55 48 99694-1990)?';
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('Fallback imediato');
      }

      const data = await response.json();
      const reply = data.reply || getLocalReply(text);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      // Fast instant client reply without external API blocking
      const reply = getLocalReply(text);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#101216] border border-white/10 rounded-2xl shadow-2xl flex flex-col h-[600px] max-h-[92vh] overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-cinzel text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
                <span>Assistente Virtual</span>
                <span className="text-white">ROGER </span>
                <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">TATTOO</span>
              </h3>
              <p className="text-[11px] text-zinc-400">
                Atendimento Inteligente 24h · Laguna - SC
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
            aria-label="Fechar assistente"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2.5 bg-zinc-900/70 border-b border-zinc-800/80 overflow-x-auto flex items-center gap-2 text-xs scrollbar-none">
          <span className="text-[11px] text-zinc-500 whitespace-nowrap shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            Sugestões:
          </span>
          {QUICK_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              disabled={isLoading}
              onClick={() => handleSendMessage(prompt)}
              className="px-2.5 py-1 rounded bg-zinc-800/90 text-zinc-300 hover:text-amber-300 hover:bg-zinc-700/80 text-[11px] transition-colors whitespace-nowrap shrink-0 border border-zinc-700/50"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((m, index) => {
            const isUser = m.role === 'user';
            return (
              <div
                key={index}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-amber-400 text-zinc-950 font-medium'
                      : 'bg-zinc-900 text-zinc-200 border border-zinc-800/90 shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-line">{m.content}</p>

                  {/* If assistant response mentions WhatsApp or scheduling, offer a direct WhatsApp CTA button inside message bubble */}
                  {!isUser && (
                    <div className="mt-3 pt-2.5 border-t border-zinc-800/60 flex items-center justify-between">
                      <a
                        href={`https://wa.me/${OFFICIAL_PHONE}?text=${encodeURIComponent('Olá Roger! Estava conversando com o assistente virtual no site e gostaria de agendar uma data para meu projeto.')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Abrir WhatsApp do Roger</span>
                      </a>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 justify-start items-center text-xs text-zinc-400">
              <div className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-amber-400 shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-zinc-900 px-4 py-2.5 rounded-xl border border-zinc-800 flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
                <span>Consultando informações do estúdio...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-zinc-950 border-t border-zinc-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Digite sua dúvida sobre tatuagem, piercing ou agendamento..."
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 bg-zinc-900 border border-zinc-700/80 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-zinc-950 font-semibold rounded-xl text-sm transition-colors flex items-center justify-center"
              aria-label="Enviar mensagem"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
