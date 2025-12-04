// src/app/page.tsx — VERSI FINAL YANG BISA NGETIK LANCAR
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';
import { format, addDays, subDays } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

export default function Home() {
  const { selectedDate, setSelectedDate, getNoteForDate, setNoteForDate } = useStore();

  const [mounted, setMounted] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  // INI YANG BIKIN BISA NGETIK LANCAR: LOCAL STATE!
  const [localNote, setLocalNote] = useState('');
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  // Load note saat ganti tanggal
  useEffect(() => {
    if (mounted) {
      setLocalNote(getNoteForDate(selectedDate));
    }
  }, [selectedDate, mounted]);

  // Simpan ke store secara debounce
  const handleNoteChange = (value: string) => {
    setLocalNote(value);

    // Clear timeout sebelumnya
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    // Simpan ke store setelah 300ms
    debounceTimeout.current = setTimeout(() => {
      setNoteForDate(selectedDate, value);
    }, 300);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const goPrev = () => setSelectedDate(format(subDays(new Date(selectedDate), 1), 'yyyy-MM-dd'));
  const goNext = () => setSelectedDate(format(addDays(new Date(selectedDate), 1), 'yyyy-MM-dd'));
  const goToday = () => setSelectedDate(format(new Date(), 'yyyy-MM-dd'));

  if (!mounted) {
    return (
      <div className="relative min-h-screen">
        <Image src="/old-city-view.jpg" alt="Loading" fill className="object-cover brightness-75 -z-10" priority />
        <div className="absolute inset-0 bg-[var(--cream)]/70 backdrop-blur-sm -z-10" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col justify-center p-6">
      <Image
        src="/old-city-view.jpg"
        alt="Hotel Background"
        fill
        className="object-cover brightness-75 -z-10"
        priority
        quality={95}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA="
      />
      <div className="absolute inset-0 bg-[var(--cream)]/70 backdrop-blur-sm -z-10" />

      <div className="glass p-10 rounded-3xl max-w-md mx-auto space-y-10">
        <div className="text-center">
          <Image src="/old-city-view.jpg" alt="Crest" width={120} height={120} className="mx-auto mb-4 rounded-full ring-4 ring-[var(--gold)]/20" />
          <h1 className="text-4xl font-bold mb-2 text-[var(--primary)]">Final Room Check</h1>
          <p className="text-lg tracking-wider">Supervisor Checklist</p>
        </div>

        <Link href="/checklist" className="block">
          <Button className="w-full bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white text-xl py-8 rounded-full shadow-2xl transition-all hover:scale-105">
            Start Checklist
          </Button>
        </Link>

        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-[var(--gold)]/30 overflow-hidden">
          <div className="bg-gradient-to-r from-[var(--gold)]/20 to-transparent px-6 py-4 border-b border-[var(--gold)]/20">
            <div className="flex items-center justify-between">
              <button onClick={goPrev} className="p-2 hover:bg-white/50 rounded-full transition">
                <ChevronLeft className="w-5 h-5 text-[var(--gold)]" />
              </button>

              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <div className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/40 transition cursor-pointer select-none">
                    <Calendar className="w-5 h-5 text-[var(--gold)]" />
                    <div className="text-left">
                      <p className="text-xs font-medium text-gray-600">Daily Notes</p>
                      <p className="text-base font-bold text-[var(--primary)]">
                        {format(new Date(selectedDate), 'dd MMMM yyyy')}
                      </p>
                    </div>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="center" sideOffset={8}>
                  <CalendarComponent
                    mode="single"
                    selected={new Date(selectedDate)}
                    onSelect={(date) => {
                      if (date) {
                        setSelectedDate(format(date, 'yyyy-MM-dd'));
                        setCalendarOpen(false);
                      }
                    }}
                    className="rounded-md border"
                  />
                </PopoverContent>
              </Popover>

              <button onClick={goNext} className="p-2 hover:bg-white/50 rounded-full transition">
                <ChevronRight className="w-5 h-5 text-[var(--gold)]" />
              </button>
            </div>

            {selectedDate !== format(new Date(), 'yyyy-MM-dd') && (
              <button onClick={goToday} className="mt-3 block w-full py-2 text-sm font-semibold text-[var(--primary)] hover:bg-[var(--gold)]/10 rounded-lg transition">
                Back to today's notes
              </button>
            )}
          </div>

          <div className="p-5">
            {/* INI YANG BIKIN BISA NGETIK LANCAR: LOCAL STATE + DEBOUNCE */}
            <textarea
              value={localNote}
              onChange={(e) => handleNoteChange(e.target.value)}
              placeholder="Click here to write your notes..."
              className="w-full min-h-48 resize-none bg-transparent text-gray-800 placeholder:text-gray-400 text-base leading-relaxed outline-none"
              style={{ fieldSizing: 'content' }}
              rows={12}
            />

            <div className="flex justify-between items-center mt-4 pt-3 border-t border-[var(--gold)]/20 text-xs">
              <span className="flex items-center gap-1 text-[var(--gold)]">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Automatically Saved
              </span>
              {localNote && <span className="text-gray-500">{localNote.length} characters</span>}
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-600">
          Click date to jump between dates • Notes are saved automatically
        </p>
      </div>
    </div>
  );
}