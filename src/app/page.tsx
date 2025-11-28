// src/app/page.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useStore } from '@/lib/store';

export default function Home() {
  const { notes, setNotes } = useStore();

  return (
    <div className="relative min-h-screen flex flex-col justify-center p-6">
      {/* Background */}
      <Image
        src="/old-city-view.jpg"
        alt="Hotel"
        fill
        className="object-cover brightness-75 -z-10"
        priority
      />
      <div className="absolute inset-0 bg-[var(--cream)]/70 backdrop-blur-sm -z-10" />

      {/* Content */}
      <div className="glass p-10 rounded-3xl max-w-md mx-auto space-y-8">
        <div className="text-center">
          <Image src="/old-city-view.jpg" alt="Crest" width={120} height={120} className="mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2">Final Room Check</h1>
          <p className="text-[var(--primary)] text-lg">Supervisor Checklist</p>
        </div>

        <Link href="/checklist" className="block">
          <Button className="w-full bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white text-xl py-8 rounded-full shadow-2xl">
            Start Checklist
          </Button>
        </Link>

        {/* NOTES — tetap di halaman pertama */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-center">Notes</h2>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any notes for reminder..."
            className="glass min-h-32 p-5 text-base border-[var(--gold)]/40 resize-none focus:ring-4 focus:ring-[var(--gold)]/20"
          />
          {notes && (
            <p className="text-center text-sm text-[var(--gold)]">
              Automatically Saved
            </p>
          )}
        </div>
      </div>
    </div>
  );
}