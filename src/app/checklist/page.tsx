// src/app/checklist/page.tsx
'use client';               // WAJIB ADA!

import Link from 'next/link';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const names = { bathroom: 'Bathroom', bedroom: 'Bedroom', minibar: 'Mini Bar' };

export default function ChecklistHome() {
    const { progress, completed } = useStore();
    const router = useRouter();

    useEffect(() => {
        if (Object.values(completed).every(Boolean)) {
            router.replace('/success');
        }
    }, [completed, router]);

    return (
        <div className="min-h-screen bg-[var(--cream)] px-6 pt-12 pb-20">
            <h1 className="text-center text-4xl font-bold mb-12">Select Section</h1>

            <div className="space-y-6 max-w-md mx-auto">
                {(['bathroom', 'bedroom', 'minibar'] as const).map((section) => (
                    <Link key={section} href={`/checklist/${section}`}>
                        <div className="glass p-8 flex justify-between items-center hover:scale-98 active:scale-95 transition-all">
                            <span className="text-2xl font-medium">
                                {names[section]}
                            </span>
                            <span className="gold-text text-5xl font-bold">
                                {progress[section]}/{5}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}