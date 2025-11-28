// src/app/success/page.tsx
'use client';
import { useStore } from '@/lib/store';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export default function Success() {
    const { reset } = useStore();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[var(--primary)] to-[#0B5D3E]">
            <div className="glass p-12 rounded-3xl text-center">
                <Check className="w-24 h-24 mx-auto mb-6 text-[var(--gold)] stroke-[3]" />
                <h1 className="text-4xl font-bold text-white mb-4">Room Check Competed!</h1>
                <p className="text-white/90 text-lg mb-10">Congratulations</p>

                <Link href="/" onClick={reset}>
                    <Button className="bg-white text-[var(--primary)] px-10 py-7 text-lg rounded-full font-semibold">
                        Finish and Return Home
                    </Button>
                </Link>
            </div>
        </div>
    );
}