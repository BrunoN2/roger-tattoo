import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

const SYSTEM_INSTRUCTION = `
Você é o assistente virtual exclusivo do "ROGER TATTOO", estúdio privado de alto padrão localizado em Laguna - SC.

Seu Objetivo:
Apresentar os serviços de Tatuagem e Body Piercing, tirar dúvidas frequentes de forma rápida (FAQ), explicar valores base e coletar os dados necessários para direcionar o cliente ao WhatsApp oficial (+55 48 99694-1990) para agendamento. Não há carrinho de compras: cada trabalho é um projeto exclusivo e agendado com horário marcado.

Serviços Oferecidos:
1. TATUAGEM:
- Estilos: Maori/Tribal, Nórdico/Viking, Grego/Realismo (Black & Grey), Egípcio, Fineline/Botânica, Geek/Anime e Projetos Autorais sob medida (estudo anatômico e harmonia na pele).

2. BODY PIERCING:
- Aplicações com joalherias biocompatíveis de alto padrão (Titânio grau implante e Aço Cirúrgico).
- Biossegurança estrita com materiais 100% descartáveis e esterilizados em autoclave hospitalar.

Regras de Atendimento:
- NUNCA feche um valor fechado final de tatuagem sem o Roger avaliar. Diga a base inicial (R$ 300) e peça:
  1. Local do corpo onde deseja tatuar
  2. Tamanho aproximado em centímetros (cm)
  3. Ideia ou imagem de referência
- Para Piercing, informe a base (R$ 80 a R$ 100) e pergunte qual a perfuração desejada (ex: hélice, nostril, septo, conch, umbigo).
- Se o cliente quiser agendar ou fechar data, forneça o link direto do WhatsApp do Roger: https://wa.me/5548996941990 informando que o estúdio trabalha exclusivamente com horário marcado.
- Mantenha um tom profissional, atencioso, elegante e seguro.

Dados do Estúdio:
- WhatsApp Oficial: +55 (48) 99694-1990
- Instagram: @rogertattoolaguna
- Avaliação: 5.0 Estrelas no Google (depoimentos de clientes destacando atendimento paciente, higiene e perfeição no traço)
- Localização: Laguna – SC (Bairro Progresso, próximo ao Fórum). Coordenadas Google Maps: -28.4780163, -48.7853409. Estúdio privativo, climatizado e seguro. O link do mapa pode ser aberto diretamente no site.
- Regra de Idade: Apenas a partir dos 16 anos com presença e autorização dos pais/responsáveis.
- Formas de Pagamento: Pix, dinheiro e cartões em até 12x.
- Acompanhante: No máximo 1 acompanhante na sala de espera privativa por normas sanitárias.
`.trim();

// Fallback response handler for when GEMINI_API_KEY is not configured or offline
function generateDeterministicReply(userPrompt: string): string {
  const p = userPrompt.toLowerCase();

  // Exemplo 1: Dúvida sobre Piercing / Septo
  if (p.includes('septo')) {
    return 'Olá! Fazemos sim. ✨ Nossas perfurações de septo são realizadas com técnica asséptica, agulhas americanas (que garantem uma perfuração rápida e muito menos dolorosa) e joias biocompatíveis (titânio ou aço cirúrgico). A dor é momentânea e bem tolerável. Nossas aplicações de piercing partem de R$ 80 a R$ 100 já com a joia inicial esterilizada inclusa. Gostaria de agendar um horário para esta semana no estúdio privativo?';
  }

  // Exemplo 2: Pergunta direta de Preço e Agendamento / Leão / Tatuagem
  if (p.includes('leão') || p.includes('leao') || (p.includes('antebraço') && p.includes('quanto'))) {
    return 'Olá! 🖤 Nossos projetos autorais partem de R$ 300. Um projeto no antebraço depende muito se você busca um estilo Grego / Realismo Black & Grey, Geométrico ou Maori, além do tamanho exato em centímetros. Você tem referências visuais da ideia? Como o Roger atende exclusivamente com horário marcado, assim que alinharmos esses detalhes já direciono você para o WhatsApp oficial (+55 48 99694-1990) para reservar sua data! 🖋️';
  }

  if (p.includes('preço') || p.includes('quanto custa') || p.includes('valor')) {
    if (p.includes('piercing') || p.includes('furo') || p.includes('furar') || p.includes('helix') || p.includes('hélice') || p.includes('nostril') || p.includes('conch') || p.includes('umbigo')) {
      return 'Nossas perfurações de Body Piercing partem de R$ 80 a R$ 100 já com a joia básica esterilizada inclusa (com opção de upgrade para Titânio Grau Implante ASTM F-136). Qual perfuração você gostaria de fazer (septo, nostril, hélice, conch, umbigo)? Podemos verificar os horários livres no WhatsApp oficial (+55 48 99694-1990).';
    }
    return 'Nossos projetos de tatuagem autoral e exclusiva começam a partir de R$ 300. O valor final depende das dimensões em centímetros, nível de detalhe e anatomia da região. Para o Roger avaliar a proposta, qual o local do corpo e o tamanho aproximado em cm que você planeja?';
  }

  if (p.includes('menor') || p.includes('idade') || p.includes('16') || p.includes('18')) {
    return 'Atendemos menores apenas a partir dos 16 anos completos, mediante presença física e autorização formal assinada por pai, mãe ou responsável legal com apresentação de documentos originais com foto.';
  }

  if (p.includes('onde') || p.includes('endereço') || p.includes('local') || p.includes('laguna') || p.includes('bairro') || p.includes('coordenad') || p.includes('maps')) {
    return 'Nosso estúdio privativo está localizado no Bairro Progresso (próximo ao Fórum), em Laguna - SC. É um ambiente climatizado, discreto e seguro com atendimento exclusivo com horário marcado. Você pode abrir o Google Maps ou traçar rota diretamente aqui pelo site!';
  }

  if (p.includes('pagamento') || p.includes('cartão') || p.includes('pix') || p.includes('parcel')) {
    return 'Aceitamos Pix com liberação instantânea, dinheiro em espécie e todos os cartões de crédito/débito, com opção de parcelamento em até 12x.';
  }

  if (p.includes('acompanhante')) {
    return 'Por normas sanitárias e para garantir a tranquilidade e a concentração durante o procedimento, permitimos no máximo 1 acompanhante por cliente na nossa sala de espera privativa.';
  }

  if (p.includes('cuidado') || p.includes('cicatriz') || p.includes('pomada')) {
    return 'Após o procedimento, você recebe um guia completo de cuidados e recomendação de pomada cicatrizante e sabonete neutro antisséptico. O Roger também fornece suporte contínuo via WhatsApp durante todo o período de cicatrização!';
  }

  return 'Olá! Sou o assistente virtual exclusivo do ROGER TATTOO em Laguna - SC. Trabalhamos com projetos autorais exclusivos (Maori, Viking, Grego/Realismo Black & Grey, Fineline, Egípcio e Geek) e Body Piercing com joias em titânio e aço cirúrgico. Gostaria de tirar dúvidas de valores, agendar horário ou falar com o Roger no WhatsApp oficial (+55 48 99694-1990)?';
}

// API Route for AI Chat
app.post('/api/chat', async (req: Request, res: Response) => {
  console.log('POST /api/chat received body:', req.body);
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Nenhuma mensagem enviada.' });
    }

    const lastMessage = messages[messages.length - 1];
    const userText = lastMessage?.content || '';

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
      const fallbackReply = generateDeterministicReply(userText);
      return res.json({
        reply: fallbackReply,
        source: 'smart-fallback'
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    // Format chat history for generateContent
    const formattedContents = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    // Promise.race to guarantee fast response even if external API is slow
    const generatePromise = async () => {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: formattedContents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });
      return response.text;
    };

    const timeoutPromise = new Promise<null>((resolve) => {
      setTimeout(() => resolve(null), 4000);
    });

    const replyText = await Promise.race([generatePromise(), timeoutPromise]);
    const reply = replyText || generateDeterministicReply(userText);

    return res.json({
      reply,
      source: replyText ? 'gemini-3.8-flash' : 'smart-fallback'
    });
  } catch (error: any) {
    const lastMessage = req.body?.messages?.[req.body.messages.length - 1]?.content || '';
    return res.json({
      reply: generateDeterministicReply(lastMessage),
      source: 'smart-fallback'
    });
  }
});

// Production or Vite Dev server mounting
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
