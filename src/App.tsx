import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StylesCarousel } from './components/StylesCarousel';
import { AboutSection } from './components/AboutSection';
import { LocationSection } from './components/LocationSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { FooterSection } from './components/FooterSection';
import { VirtualAssistantModal } from './components/VirtualAssistantModal';
import { MessageCircle, Bot } from 'lucide-react';
import { OFFICIAL_PHONE } from './utils/budget';

export default function App() {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  // Smooth scroll handler
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans selection:bg-amber-600 selection:text-white">
      
      {/* Navbar */}
      <Header
        onOpenAssistant={() => setIsAssistantOpen(true)}
        onScrollTo={scrollTo}
      />

      {/* Main Sections */}
      <main>
        {/* Hero Section */}
        <Hero
          onOpenAssistant={() => setIsAssistantOpen(true)}
          onScrollTo={scrollTo}
        />

        {/* Portfolio / Carousel of Styles (Maori, Nórdica, Grega, Egípcia, Flores, Anime, Personalizados, Piercing) */}
        <StylesCarousel />

        {/* Sobre o Artista (Arte Autoral e Encaixe Anatômico) */}
        <AboutSection />

        {/* Localização & Estrutura do Estúdio em Laguna - SC */}
        <LocationSection />

        {/* Avaliações dos Clientes */}
        <ReviewsSection />

        {/* FAQ & Respostas Rápidas */}
        <FaqSection />
      </main>

      {/* Contato & Footer */}
      <FooterSection />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {/* Virtual Assistant Floating Trigger */}
        <button
          onClick={() => setIsAssistantOpen(true)}
          className="group flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-zinc-900/95 border border-amber-500/50 text-white shadow-xl hover:bg-zinc-800 transition-all text-xs font-semibold backdrop-blur-md"
          aria-label="Tirar dúvidas com o assistente virtual do estúdio"
        >
          <Bot className="w-4 h-4 text-amber-500" />
          <span className="hidden sm:inline">Dúvidas com IA</span>
        </button>

        {/* WhatsApp Floating Button */}
        <a
          href={`https://wa.me/${OFFICIAL_PHONE}?text=${encodeURIComponent('Olá Roger! Vim pelo site oficial e gostaria de agendar um horário com você no estúdio privativo.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold shadow-2xl transition-all transform hover:scale-105 text-xs sm:text-sm"
          aria-label="Falar com o Roger no WhatsApp"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="hidden sm:inline">WhatsApp Roger</span>
        </a>
      </div>

      {/* Virtual Assistant Modal (IA FAQ & Dúvidas) */}
      <VirtualAssistantModal
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
      />

    </div>
  );
}
