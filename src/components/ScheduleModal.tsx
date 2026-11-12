import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, ChevronLeft, ChevronRight, MessageCircle, Info } from 'lucide-react';
import {
  SCHEDULE_TIME_SLOTS,
  PT_BR_MONTHS,
  PT_BR_WEEKDAYS_SHORT,
  toIsoDateString,
  getCalendarDays,
  formatScheduleDatePtBr,
  generateScheduleWhatsAppLink
} from '../utils/budget';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({ isOpen, onClose }) => {
  const now = new Date();
  const todayIso = toIsoDateString(now);
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const [viewYear, setViewYear] = useState(currentYear);
  const [viewMonth, setViewMonth] = useState(currentMonth);
  const [selectedDate, setSelectedDate] = useState<string>(todayIso);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [validationError, setValidationError] = useState<string>('');

  // Reset view when opened and support Escape key
  useEffect(() => {
    if (!isOpen) return;

    const freshNow = new Date();
    setViewYear(freshNow.getFullYear());
    setViewMonth(freshNow.getMonth());
    setSelectedDate(toIsoDateString(freshNow));
    setSelectedTime('');
    setValidationError('');

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isAtMinMonth = viewYear === currentYear && viewMonth === currentMonth;
  const cells = getCalendarDays(viewYear, viewMonth);

  const handlePrevMonth = () => {
    if (isAtMinMonth) return;
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleSelectDate = (iso: string) => {
    setSelectedDate(iso);
    setValidationError('');
  };

  const handleSelectTime = (slot: string) => {
    setSelectedTime(slot);
    setValidationError('');
  };

  const isReady = Boolean(selectedDate && selectedTime);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="schedule-modal-title"
    >
      <div
        className="w-full sm:max-w-md bg-zinc-950 border-t sm:border border-zinc-800 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-zinc-800/90 flex items-center justify-between bg-zinc-900/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Calendar size={16} />
            </div>
            <div>
              <h2 id="schedule-modal-title" className="text-sm sm:text-base font-black text-white uppercase tracking-wide font-cinzel">
                Agendar Horário
              </h2>
              <p className="text-[11px] text-zinc-400">
                Escolha data e horário de preferência
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar calendário de agendamento"
            className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto">
          
          {/* Step 1: Compact Calendar */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-3 sm:p-3.5">
            <div className="flex items-center justify-between mb-3">
              <button
                type="button"
                onClick={handlePrevMonth}
                disabled={isAtMinMonth}
                aria-label="Mês anterior"
                className={`p-1.5 rounded-lg border transition-colors ${
                  isAtMinMonth
                    ? 'border-zinc-800/50 text-zinc-700 cursor-not-allowed'
                    : 'border-zinc-800 bg-zinc-950 text-zinc-300 hover:text-amber-400 hover:border-zinc-700'
                }`}
              >
                <ChevronLeft size={16} />
              </button>

              <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider font-cinzel">
                {PT_BR_MONTHS[viewMonth]} {viewYear}
              </span>

              <button
                type="button"
                onClick={handleNextMonth}
                aria-label="Próximo mês"
                className="p-1.5 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-300 hover:text-amber-400 hover:border-zinc-700 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Weekday Header */}
            <div className="grid grid-cols-7 gap-1 mb-1.5">
              {PT_BR_WEEKDAYS_SHORT.map((dayName) => (
                <div
                  key={dayName}
                  className="text-center text-[10px] font-bold uppercase tracking-wider text-zinc-500 py-1"
                >
                  {dayName}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1">
              {cells.map((cell, index) => {
                if (!cell) {
                  return <div key={`empty-${index}`} className="h-9 sm:h-9" />;
                }

                const isPast = cell.iso < todayIso;
                const isSelected = cell.iso === selectedDate;
                const isToday = cell.iso === todayIso;

                return (
                  <button
                    key={cell.iso}
                    type="button"
                    disabled={isPast}
                    onClick={() => handleSelectDate(cell.iso)}
                    aria-label={`Dia ${cell.day} de ${PT_BR_MONTHS[viewMonth]}`}
                    aria-pressed={isSelected}
                    className={`h-9 rounded-xl text-xs font-semibold transition-all flex items-center justify-center relative ${
                      isPast
                        ? 'text-zinc-700 cursor-not-allowed'
                        : isSelected
                          ? 'bg-amber-600 text-white font-bold shadow-[0_0_12px_rgba(217,119,6,0.45)]'
                          : isToday
                            ? 'bg-zinc-800/90 text-amber-400 border border-amber-500/40 hover:bg-zinc-800'
                            : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                    }`}
                  >
                    {cell.day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Time Grid (13:30 - 19:30) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
                <Clock size={13} className="text-amber-400" />
                Horário de preferência
              </span>
              <span className="text-[11px] text-zinc-400">13:30 às 19:30</span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5">
              {SCHEDULE_TIME_SLOTS.map((slot) => {
                const isSelected = selectedTime === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => handleSelectTime(slot)}
                    aria-pressed={isSelected}
                    className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                      isSelected
                        ? 'bg-amber-600 border-amber-500 text-white shadow-[0_0_12px_rgba(217,119,6,0.35)]'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white'
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Short Availability Observation */}
          <div className="bg-amber-500/10 border border-amber-500/25 rounded-xl px-3 py-2.5 flex items-start gap-2 text-[11px] text-amber-200/90 leading-snug">
            <Info size={14} className="text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Obs.:</strong> Esta é uma preferência de agendamento. O horário desejado pode ou não estar disponível na agenda do Roger.
            </span>
          </div>

          {validationError && (
            <p className="text-xs text-amber-400 text-center font-medium" role="alert">
              {validationError}
            </p>
          )}

          {/* Action CTA */}
          {isReady ? (
            <div className="space-y-2 pt-0.5">
              <p className="text-[11px] text-zinc-400 text-center">
                Preferência: <strong className="text-white">{formatScheduleDatePtBr(selectedDate)}</strong> às <strong className="text-amber-400">{selectedTime}</strong>
              </p>
              <a
                href={generateScheduleWhatsAppLink(selectedDate, selectedTime)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-zinc-950 py-3 px-4 rounded-xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <MessageCircle size={16} />
                <span>Enviar Preferência no WhatsApp</span>
              </a>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setValidationError('Selecione um horário entre 13:30 e 19:30 para enviar.')}
              className="w-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 py-3 px-4 rounded-xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle size={16} />
              <span>Escolha um horário acima</span>
            </button>
          )}

        </div>
      </div>
    </div>
  );
};
