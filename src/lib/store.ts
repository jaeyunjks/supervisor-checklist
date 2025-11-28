// src/lib/store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { sections, type SectionType } from './sections';

export const useStore = create<{
    progress: Record<SectionType, number>;
    completed: Record<SectionType, boolean>;
    notes: string;                    // ← BARU: catatan supervisor
    increment: (section: SectionType) => void;
    completeSection: (section: SectionType) => void;
    setNotes: (text: string) => void; // ← BARU: update catatan
    reset: () => void;
}>()(
    persist(
        (set) => ({
            progress: { bathroom: 0, bedroom: 0, minibar: 0 },
            completed: { bathroom: false, bedroom: false, minibar: false },
            notes: '', // default kosong

            increment: (section) =>
                set((state) => ({
                    progress: { ...state.progress, [section]: state.progress[section] + 1 },
                })),

            completeSection: (section) =>
                set((state) => ({
                    completed: { ...state.completed, [section]: true },
                })),

            setNotes: (text) => set({ notes: text }),

            reset: () =>
                set({
                    progress: { bathroom: 0, bedroom: 0, minibar: 0 },
                    completed: { bathroom: false, bedroom: false, minibar: false },
                    notes: '',
                }),
        }),
        { name: 'supervisor-checklist-storage' }
    )
);