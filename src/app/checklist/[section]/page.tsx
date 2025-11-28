// src/app/checklist/[section]/page.tsx
'use client';
import { useStore } from '@/lib/store';
import { sections } from '@/lib/sections';
import { useParams, useRouter } from 'next/navigation';

const titles: Record<string, string> = {
    bathroom: 'Bathroom',
    bedroom: 'Bedroom',
    minibar: 'Mini Bar',
};

export default function SectionCheck() {
    const params = useParams();
    const router = useRouter();
    const section = params.section as keyof typeof sections;
    const items = sections[section];
    const { progress, increment, completeSection } = useStore();

    const current = progress[section];

    const handleClick = () => {
        increment(section);
        if (current + 1 === items.length) {
            completeSection(section);
            setTimeout(() => router.back(), 500);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--cream)] px-6 pt-12 pb-24 flex flex-col">
            <h1 className="text-center text-4xl font-bold mb-12">
                {titles[section] || section}
            </h1>

            <div className="space-y-5 max-w-md mx-auto w-full">
                {items.map((item, i) => (
                    <button
                        key={i}
                        onClick={handleClick}
                        className={`pill-toggle w-full text-left text-lg py-5 transition-all ${i < current ? 'bg-[var(--gold)]/20 border-[var(--gold)]' : ''
                            }`}
                    >
                        {item}
                    </button>
                ))}
            </div>

            <div className="text-center mt-12">
                <div className="gold-text text-6xl font-bold">
                    {current}/{items.length}
                </div>
                <p className="text-sm mt-3 opacity-70">
                    Tap item to continue
                </p>
            </div>
        </div>
    );
}