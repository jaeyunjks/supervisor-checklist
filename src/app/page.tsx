// src/app/page.tsx — FINAL VERSION: Smooth Checkbox + No Background Zoom
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useStore, type Todo } from '@/lib/store';
import { format, addDays, subDays } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

export default function Home() {
  const {
    selectedDate,
    setSelectedDate,
    getNoteForDate,
    setNoteForDate,
    getTodosForDate,
    addTodoForDate,
    toggleTodoForDate,
    deleteTodoForDate,
  } = useStore();

  const [mounted, setMounted] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [localNote, setLocalNote] = useState('');
  const [newTodoText, setNewTodoText] = useState('');
  const [optimisticTodos, setOptimisticTodos] = useState<Todo[]>([]); // ← FIX LAG
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  // Load note + todos saat ganti tanggal
  useEffect(() => {
    if (mounted) {
      setLocalNote(getNoteForDate(selectedDate));
      setOptimisticTodos(getTodosForDate(selectedDate));
      setNewTodoText('');
    }
  }, [selectedDate, mounted]);

  // Debounce save notes
  const handleNoteChange = (value: string) => {
    setLocalNote(value);
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      setNoteForDate(selectedDate, value);
    }, 300);
  };

  // Optimistic toggle (langsung responsif!)
  const handleToggleTodo = (id: string) => {
    setOptimisticTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    toggleTodoForDate(selectedDate, id); // simpan ke store di background
  };

  // Tambah todo
  const handleAddTodo = () => {
    if (newTodoText.trim()) {
      addTodoForDate(selectedDate, newTodoText.trim());
      setNewTodoText('');
      // Update optimistic langsung
      setOptimisticTodos(getTodosForDate(selectedDate));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTodo();
    }
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
        <div className="fixed inset-0 -z-20">
          <div className="absolute inset-0 bg-cover bg-center brightness-75" style={{ backgroundImage: 'url(/old-city-view.jpg)' }} />
          <div className="absolute inset-0 bg-[var(--cream)]/70 backdrop-blur-sm" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col justify-center p-6">
      {/* BACKGROUND FIX — NO ZOOM ON MOBILE */}
      <div className="fixed inset-0 -z-20 pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-75"
          style={{ backgroundImage: 'url(/old-city-view.jpg)' }}
        />
        <div className="absolute inset-0 bg-[var(--cream)]/70 backdrop-blur-sm" />
      </div>

      <div className="glass p-10 rounded-3xl max-w-md mx-auto space-y-10 z-10 relative">
        {/* Header */}
        <div className="text-center">
          <div className="w-28 h-28 mx-auto mb-4 bg-gray-200 border-2 border-dashed rounded-full ring-4 ring-[var(--gold)]/20" />
          <h1 className="text-4xl font-bold mb-2 text-[var(--primary)]">Final Room Check</h1>
          <p className="text-lg tracking-wider">Supervisor Checklist</p>
        </div>

        <Link href="/checklist" className="block">
          <Button className="w-full bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white text-xl py-8 rounded-full shadow-2xl transition-all hover:scale-105">
            Start Checklist
          </Button>
        </Link>

        {/* Notes & Todo Card */}
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
                      <p className="text-xs font-medium text-gray-600">Daily Notes & Tasks</p>
                      <p className="text-base font-bold text-[var(--primary)]">
                        {format(new Date(selectedDate), 'dd MMMM yyyy')}
                      </p>
                    </div>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="center">
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
                Back to today
              </button>
            )}
          </div>

          <div className="p-5 space-y-6">
            {/* Notes */}
            <textarea
              value={localNote}
              onChange={(e) => handleNoteChange(e.target.value)}
              placeholder="Write your notes here..."
              className="w-full min-h-40 resize-none bg-transparent text-gray-800 placeholder:text-gray-400 text-base leading-relaxed outline-none"
              style={{ fieldSizing: 'content' }}
              rows={10}
            />

            {/* Todo List */}
            <div className="border-t border-[var(--gold)]/20 pt-5">
              <h3 className="text-sm font-semibold text-[var(--primary)] mb-3">Today's Tasks</h3>

              <div className="space-y-2">
                {optimisticTodos.length === 0 ? (
                  <p className="text-sm text-gray-500 italic">No tasks yet • Add one below</p>
                ) : (
                  optimisticTodos.map((todo) => (
                    <div key={todo.id} className="flex items-center gap-3 group">
                      <Checkbox
                        checked={todo.completed}
                        onCheckedChange={() => handleToggleTodo(todo.id)}
                        className="data-[state=checked]:bg-[var(--gold)] data-[state=checked]:border-[var(--gold)]"
                      />
                      <span className={`flex-1 text-base ${todo.completed ? 'line-through opacity-60' : ''}`}>
                        {todo.text}
                      </span>
                      <button
                        onClick={() => {
                          deleteTodoForDate(selectedDate, todo.id);
                          setOptimisticTodos(prev => prev.filter(t => t.id !== todo.id));
                        }}
                        className="opacity-0 group-hover:opacity-100 transition p-1 hover:bg-red-100 rounded"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Add Todo */}
              <div className="flex gap-2 mt-4">
                <Input
                  value={newTodoText}
                  onChange={(e) => setNewTodoText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Add a new task..."
                  className="flex-1 h-10 text-base border-[var(--gold)]/30 focus:border-[var(--gold)]"
                />
                <Button onClick={handleAddTodo} size="icon" className="bg-[var(--gold)] hover:bg-[var(--gold)]/90">
                  <Plus className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center pt-3 border-t border-[var(--gold)]/20 text-xs">
              <span className="flex items-center gap-1 text-[var(--gold)]">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Auto-saved
              </span>
              <span className="text-gray-500">
                {optimisticTodos.filter(t => t.completed).length}/{optimisticTodos.length} completed
              </span>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-600">
          Notes & tasks saved per date • Switch dates to view history
        </p>
      </div>
    </div>
  );
}