// src/lib/store.ts — VERSI SIMPEL YANG AMAN
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { sections, type SectionType } from './sections';

type DailyNote = { date: string; content: string };

export const useStore = create<{
    progress: Record<SectionType, number>;
    completed: Record<SectionType, boolean>;
    notes: string;
    dailyNotes: DailyNote[];
    selectedDate: string;

    increment: (section: SectionType) => void;
    completeSection: (section: SectionType) => void;
    setNotes: (text: string) => void;
    setNoteForDate: (date: string, content: string) => void;
    getNoteForDate: (date: string) => string;
    setSelectedDate: (date: string) => void;
    reset: () => void;
}>()(
    persist(
        (set, get) => ({
            progress: { bathroom: 0, bedroom: 0, minibar: 0 },
            completed: { bathroom: false, bedroom: false, minibar: false },
            notes: '',
            dailyNotes: [],
            selectedDate: new Date().toISOString().split('T')[0],

            increment: (section) => set((s) => ({ progress: { ...s.progress, [section]: s.progress[section] + 1 } })),
            completeSection: (section) => set((s) => ({ completed: { ...s.completed, [section]: true } })),
            setNotes: (text) => set({ notes: text }),

            setNoteForDate: (date, content) =>
                set((state) => ({
                    dailyNotes: state.dailyNotes.some(n => n.date === date)
                        ? state.dailyNotes.map(n => n.date === date ? { ...n, content } : n)
                        : [...state.dailyNotes, { date, content }],
                })),

            getNoteForDate: (date) => get().dailyNotes.find(n => n.date === date)?.content || '',
            setSelectedDate: (date) => set({ selectedDate: date }),

            reset: () => set({
                progress: { bathroom: 0, bedroom: 0, minibar: 0 },
                completed: { bathroom: false, bedroom: false, minibar: false },
                notes: '',
                dailyNotes: [],
                selectedDate: new Date().toISOString().split('T')[0],
            }),
        }),
        {
            name: 'supervisor-checklist-storage',
        }
    )
);