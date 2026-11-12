export const OFFICIAL_PHONE = '5548996941990';
export const DISPLAY_PHONE = '+55 (48) 99694-1990';
export const INSTAGRAM_HANDLE = '@rogertattoolaguna';
export const STUDIO_COORDINATES = {
  lat: -28.4780163,
  lng: -48.7853409,
  formatted: '-28.4780163, -48.7853409'
};
export const GOOGLE_MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=-28.4780163,-48.7853409';
export const GOOGLE_MAPS_DIRECTIONS_URL = 'https://www.google.com/maps/dir/?api=1&destination=-28.4780163,-48.7853409';
export const GOOGLE_MAPS_EMBED_URL = 'https://maps.google.com/maps?q=-28.4780163,-48.7853409&hl=pt-BR&z=16&output=embed';

export interface StyleConcept {
  id: string;
  name: string;
  tagline: string;
  description: string;
  images: string[];
}

export const FAQ_DATA = [
  {
    id: 'preco-tattoo',
    question: 'Quanto custa uma tatuagem?',
    category: 'Valores',
    answer: 'Nossos projetos autorais e exclusivos começam a partir de R$ 300. O valor final depende das dimensões em centímetros, nível de detalhe e anatomia da região. Cada arte é desenvolvida sob medida diretamente pelo Roger.',
    tags: ['preço', 'valor', 'tatuagem', 'orçamento', 'custo', '300']
  },
  {
    id: 'preco-piercing',
    question: 'Quanto custa colocar um piercing?',
    category: 'Valores',
    answer: 'As perfurações com joalheria básica inclusa começam a partir de R$ 80 a R$ 100 (variando conforme a perfuração e o modelo da joia, com opção de upgrade para titânio grau implante biocompatível).',
    tags: ['piercing', 'preço', 'valor', 'titânio', 'aço cirúrgico', '80', '100']
  },
  {
    id: 'menor-idade',
    question: 'Menor de 18 anos pode tatuar ou colocar piercing?',
    category: 'Regulamentação',
    answer: 'Apenas a partir dos 16 anos mediante presença física e autorização formal assinada por pai, mãe ou responsável legal com apresentação de documentos originais com foto.',
    tags: ['menor', 'idade', '16 anos', '18 anos', 'autorização', 'responsável']
  },
  {
    id: 'pagamento',
    question: 'Quais são as formas de pagamento?',
    category: 'Atendimento',
    answer: 'Aceitamos Pix com confirmação instantânea, dinheiro em espécie e todos os cartões de crédito/débito com opção de parcelamento em até 12x.',
    tags: ['pagamento', 'pix', 'cartão', 'parcelamento', '12x', 'débito', 'crédito']
  },
  {
    id: 'acompanhante',
    question: 'Posso levar acompanhante?',
    category: 'Estúdio',
    answer: 'Por normas sanitárias e para garantir a máxima tranquilidade e concentração durante o procedimento, permitimos no máximo 1 acompanhante por cliente na nossa sala de espera privativa.',
    tags: ['acompanhante', 'amigo', 'sala de espera', 'norma', 'estúdio']
  },
  {
    id: 'cicatrizacao',
    question: 'Como funciona o pós-cuidado / cicatrização?',
    category: 'Biossegurança',
    answer: 'Após a sessão, você recebe um guia completo de cuidados pós-procedimento com indicação de pomadas cicatrizantes e sabonete neutro antisséptico. O Roger fornece suporte contínuo via WhatsApp durante todo o período de cicatrização.',
    tags: ['cuidados', 'cicatrização', 'pomada', 'pós-tattoo', 'suporte', 'higiene']
  },
  {
    id: 'localizacao',
    question: 'Onde fica o estúdio em Laguna - SC?',
    category: 'Estúdio',
    answer: 'Nosso estúdio privativo fica localizado no Bairro Progresso (próximo ao Fórum), em Laguna - SC. É um ambiente climatizado, discreto, seguro e com biossegurança hospitalar. Você pode abrir a localização no Google Maps e traçar rota diretamente aqui pelo site!',
    tags: ['endereço', 'laguna', 'progresso', 'fórum', 'onde fica', 'localização', 'google maps']
  },
  {
    id: 'materiais',
    question: 'Como é garantida a biossegurança e higiene?',
    category: 'Biossegurança',
    answer: 'Seguimos protocolos hospitalares rigorosos: materiais 100% descartáveis (agulhas americanas, biqueiras, luvas, batoques), joias esterilizadas em autoclave de grau cirúrgico e desinfecção química completa de superfícies a cada atendimento.',
    tags: ['biossegurança', 'higiene', 'descartável', 'esterilização', 'autoclave']
  }
];

export function generateStyleWhatsAppLink(styleName: string, customNote?: string): string {
  const lines = [
    `Olá Roger! Vim pelo site oficial e me encantei pelo estilo "${styleName}".`,
    customNote ? `• Minha ideia inicial: ${customNote}` : '• Gostaria de levar este estilo como base para meu projeto.',
    '',
    'Podemos trocar uma ideia sobre disponibilidade de horário e como adaptar a arte para a minha anatomia?'
  ].filter(Boolean);

  return `https://wa.me/${OFFICIAL_PHONE}?text=${encodeURIComponent(lines.join('\n'))}`;
}

export const SCHEDULE_TIME_SLOTS = [
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30'
] as const;

export const PT_BR_MONTHS = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
] as const;

export const PT_BR_WEEKDAYS_SHORT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'] as const;

export function toIsoDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export interface CalendarCell {
  iso: string;
  day: number;
}

export function getCalendarDays(year: number, monthIndex: number): Array<CalendarCell | null> {
  const firstWeekday = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const cells: Array<CalendarCell | null> = [];

  for (let i = 0; i < firstWeekday; i++) {
    cells.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const monthStr = String(monthIndex + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    cells.push({
      iso: `${year}-${monthStr}-${dayStr}`,
      day
    });
  }

  return cells;
}

export function formatScheduleDatePtBr(dateIso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateIso);
  if (!match) return dateIso;
  const year = Number(match[1]);
  const monthIndex = Number(match[2]) - 1;
  const day = Number(match[3]);
  const weekdayNames = [
    'domingo',
    'segunda-feira',
    'terça-feira',
    'quarta-feira',
    'quinta-feira',
    'sexta-feira',
    'sábado'
  ];
  const weekday = weekdayNames[new Date(year, monthIndex, day).getDay()];
  return `${match[3]}/${match[2]}/${match[1]} (${weekday})`;
}

export function generateScheduleWhatsAppLink(dateIso: string, time: string): string {
  const formattedDate = formatScheduleDatePtBr(dateIso);
  const lines = [
    'Olá Roger! Vim pelo site oficial e gostaria de solicitar um agendamento.',
    `• Data de preferência: ${formattedDate}`,
    `• Horário de preferência: ${time}`,
    '',
    'Obs.: Sei que o horário desejado pode ou não estar disponível na agenda. Podemos confirmar?'
  ];

  return `https://wa.me/${OFFICIAL_PHONE}?text=${encodeURIComponent(lines.join('\n'))}`;
}

export function searchFaq(query: string) {
  if (!query || !query.trim()) return FAQ_DATA;
  const q = query.toLowerCase().trim();
  return FAQ_DATA.filter(item => 
    item.question.toLowerCase().includes(q) ||
    item.answer.toLowerCase().includes(q) ||
    item.category.toLowerCase().includes(q) ||
    item.tags.some(t => t.toLowerCase().includes(q))
  );
}
