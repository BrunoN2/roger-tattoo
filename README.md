# Roger Tattoo & Piercing ⚡ Laguna - SC

> Site oficial e plataforma de apresentação de projetos exclusivos de Tatuagem e Body Piercing do estúdio privado **Roger Tattoo**, localizado no Bairro Progresso em Laguna - SC.

---

## ✨ Destaques & Funcionalidades

- **Design Premium & Cinematográfico**: Hero section imersiva com vídeo de fundo atmosférico, tipografia impactante e estética dark moderna.
- **Galeria de Estilos**: Portfólio dividido por estilos autorais:
  - Maori / Tribal
  - Nórdica / Viking
  - Grega / Realismo Black & Grey
  - Egípcia
  - Fineline & Flores
  - Geek & Anime
  - Projetos Personalizados sob medida
- **Body Piercing & Biossegurança**: Aplicação com joias biocompatíveis (Titânio e Aço Cirúrgico), materiais 100% esterilizados e descartáveis.
- **Assistente Virtual & Simulador de Orçamento**:
  - Dúvidas frequentes instantâneas (FAQ).
  - Cálculo de estimativa base de orçamento (tamanho em cm, estilo, local do corpo).
  - Encaminhamento com mensagem pronta e estruturada direto para o **WhatsApp oficial do Roger** (+55 48 99694-1990).
- **Avaliações Reais do Google (5.0 ★)**:
  - Depoimentos reais de clientes do Google Maps.
  - Formulário interativo para deixar feedback diretamente pelo site com salvamento local e botão para avaliar no Google Maps.
- **Localização Privativa com Mapa Dark**:
  - Mapa integrado com tema escuro personalizado.
  - Botão de rota direta via GPS (Google Maps / Waze / Apple Maps).
  - Estúdio privativo, climatizado e com atendimento exclusivo com horário marcado no Bairro Progresso, perto do Fórum.
- **Sobre o Artista**: Perfil e foto autêntica do Roger, destacando precisão anatômica, biossegurança e dedicação à arte na pele.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Backend / Servidor**: [Express](https://expressjs.com/) (`server.ts` com SSR/Vite dev middleware)
- **Ícones**: [Lucide React](https://lucide.dev/)
- **Efeitos**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Testes**: Node.js Native Test Runner (`node:test`)

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) versão 18+ ou superior
- [npm](https://www.npmjs.com/) ou [bun](https://bun.sh/)

### 1. Clonar o repositório
```bash
git clone https://github.com/<SEU-USUARIO>/roger-tattoo.git
cd roger-tattoo
```

### 2. Instalar as dependências
```bash
npm install
```

### 3. Rodar em modo de desenvolvimento
```bash
npm run dev
```
O servidor estará rodando em: `http://localhost:3000`

### 4. Build para produção
```bash
npm run build
npm start
```

### 5. Executar testes unitários
```bash
npm test
```

---

## 📁 Estrutura do Projeto

```text
├── public/
│   └── assets/aistudio/      # Imagens e vídeos do estúdio (foto do Roger, clipe do hero)
├── src/
│   ├── components/
│   │   ├── Header.tsx                 # Barra de navegação com branding ROGER TATTOO
│   │   ├── Hero.tsx                   # Seção inicial com vídeo de fundo e chamada rápida
│   │   ├── GallerySection.tsx         # Portfólio de tatuagens por estilos
│   │   ├── PiercingSection.tsx        # Seção de Body Piercing e biossegurança
│   │   ├── AboutSection.tsx           # Foto autêntica e biografia do artista Roger
│   │   ├── ReviewsSection.tsx         # Avaliações 5.0 Google + widget de avaliação direta
│   │   ├── FaqSection.tsx             # Perguntas frequentes (preços, cuidados, agendamento)
│   │   ├── LocationSection.tsx        # Mapa dark e orientações de acesso ao estúdio
│   │   ├── FooterSection.tsx          # Rodapé com contatos, WhatsApp e redes sociais
│   │   └── VirtualAssistantModal.tsx  # Assistente interativo com simulador de orçamento
│   ├── utils/
│   │   ├── budget.ts                  # Lógica de cálculo de estimativa de orçamento
│   │   └── budget.test.ts             # Testes unitários da lógica de orçamento
│   ├── App.tsx                        # Componente principal
│   ├── index.css                      # Configurações globais e import Tailwind
│   └── main.tsx                       # Ponto de entrada React
├── server.ts                          # Servidor Express Full-Stack
├── package.json
└── vite.config.ts
```

---

## 📍 Contato & Agendamentos

- **WhatsApp Oficial**: [+55 (48) 99694-1990](https://wa.me/5548996941990)
- **Instagram**: [@rogertattoolaguna](https://www.instagram.com/rogertattoolaguna/)
- **Localização**: Bairro Progresso (próximo ao Fórum), Laguna – SC
- **Atendimento**: Exclusivamente com horário agendado.

---

Feito com dedicação para **Roger Tattoo & Piercing**. 🖋️
