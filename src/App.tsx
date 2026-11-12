import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StylesCarousel } from './components/StylesCarousel';
import { AboutSection } from './components/AboutSection';
import { LocationSection } from './components/LocationSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { FooterSection } from './components/FooterSection';
import { ScheduleModal } from './components/ScheduleModal';
import { MessageCircle } from 'lucide-react';
import { OFFICIAL_PHONE } from './utils/budget';

export default function App() {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  // Smooth scroll handler
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans selection:bg-amber-600 selection:text-white overflow-x-clip">
      
      {/* Navbar */}
      <Header onScrollTo={scrollTo} onOpenSchedule={() => setIsScheduleOpen(true)} />

      {/* Main Sections */}
      <main>
        {/* Hero Section */}
        <Hero onScrollTo={scrollTo} />

        {/* Portfolio / Carousel of Styles */}
        <StylesCarousel />

        {/* Sobre o Artista */}
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

      {/* Schedule Calendar Modal */}
      <ScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
      />

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40">
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

    </div>
  );
}
