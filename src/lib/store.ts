// src/lib/store.ts — VERSI TERBARU (Checklist + Daily Notes + To-Do List per Tanggal)
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { sections, type SectionType } from './sections';

type DailyNote = {
    date: string;
    content: string;
};

export type Todo = {
    id: string;
    text: string;
    completed: boolean;
};

type DailyTodos = {
    date: string;
    todos: Todo[];
};

export const useStore = create<{
    // Checklist Progress
    progress: Record<SectionType, number>;
    completed: Record<SectionType, boolean>;

    // Daily Notes & To-Do
    selectedDate: string;
    dailyNotes: DailyNote[];
    dailyTodos: DailyTodos[];

    // Actions
    increment: (section: SectionType) => void;
    completeSection: (section: SectionType) => void;

    // Notes
    setNoteForDate: (date: string, content: string) => void;
    getNoteForDate: (date: string) => string;

    // Todos
    getTodosForDate: (date: string) => Todo[];
    addTodoForDate: (date: string, text: string) => void;
    toggleTodoForDate: (date: string, id: string) => void;
    deleteTodoForDate: (date: string, id: string) => void;

    // Date navigation
    setSelectedDate: (date: string) => void;

    // Reset all (untuk logout / end of day)
    reset: () => void;
}>()(
    persist(
        (set, get) => ({
            // Initial state
            progress: { bathroom: 0, bedroom: 0, minibar: 0 },
            completed: { bathroom: false, bedroom: false, minibar: false },
            selectedDate: new Date().toISOString().split('T')[0],
            dailyNotes: [],
            dailyTodos: [],

            // Checklist actions
            increment: (section) =>
                set((state) => ({
                    progress: { ...state.progress, [section]: state.progress[section] + 1 },
                })),

            completeSection: (section) =>
                set((state) => ({
                    completed: { ...state.completed, [section]: true },
                })),

            // Daily Notes
            setNoteForDate: (date, content) =>
                set((state) => ({
                    dailyNotes: state.dailyNotes.some((n) => n.date === date)
                        ? state.dailyNotes.map((n) => (n.date === date ? { ...n, content } : n))
                        : [...state.dailyNotes, { date, content }],
                })),

            getNoteForDate: (date) =>
                get().dailyNotes.find((n) => n.date === date)?.content || '',

            // To-Do List per Date
            getTodosForDate: (date) =>
                get().dailyTodos.find((d) => d.date === date)?.todos || [],

            addTodoForDate: (date, text) => {
                const newTodo: Todo = {
                    id: Date.now().toString() + Math.random(), // unik banget
                    text,
                    completed: false,
                };

                set((state) => ({
                    dailyTodos: state.dailyTodos.some((d) => d.date === date)
                        ? state.dailyTodos.map((d) =>
                            d.date === date ? { ...d, todos: [...d.todos, newTodo] } : d
                        )
                        : [...state.dailyTodos, { date, todos: [newTodo] }],
                }));
            },

            toggleTodoForDate: (date, id) =>
                set((state) => ({
                    dailyTodos: state.dailyTodos.map((d) =>
                        d.date === date
                            ? {
                                ...d,
                                todos: d.todos.map((todo) =>
                                    todo.id === id ? { ...todo, completed: !todo.completed } : todo
                                ),
                            }
                            : d
                    ),
                })),

            deleteTodoForDate: (date, id) =>
                set((state) => ({
                    dailyTodos: state.dailyTodos.map((d) =>
                        d.date === date
                            ? { ...d, todos: d.todos.filter((todo) => todo.id !== id) }
                            : d
                    ),
                })),

            // Date navigation
            setSelectedDate: (date) => set({ selectedDate: date }),

            // Reset everything (misal ganti shift / hari baru)
            reset: () =>
                set({
                    progress: { bathroom: 0, bedroom: 0, minibar: 0 },
                    completed: { bathroom: false, bedroom: false, minibar: false },
                    selectedDate: new Date().toISOString().split('T')[0],
                    // dailyNotes & dailyTodos tetap disimpan (history)
                }),
        }),
        {
            name: 'supervisor-checklist-v2', // ubah nama biar nggak bentrok sama versi lama
            version: 2,
        }
    )
);