import { create } from 'zustand';

import { ITodo } from '../entities/ITodo';
import { IUser } from '../entities/IUser';

interface IGlobalStore {
  user: IUser | null;
  todos: ITodo[];
  login(): void;
  logout(): void;
  addTodo(title: string): void;
  toggleTodoDone(todoId: number): void;
  removeTodo(todoId: number): void;
}

export const useGlobalStoreZustand = create<IGlobalStore>((set) => ({
  user: null,
  todos: [],
  login: () => {
    set({
      user: {
        email: 'lucasilvestre1@gmail.com',
        name: 'Lucas Livero',
      },
    });
  },
  logout: () => set({ user: null }),
  addTodo: (title: string) => {
    set((state) => ({
      todos: state.todos.concat({
        id: Date.now(),
        title,
        author: state.user?.name ?? 'Convidado',
        done: false,
      }),
    }));
  },
  toggleTodoDone: (todoId: number) => {
    set((state) => ({
      todos: state.todos.map((todo) => (todo.id === todoId ? { ...todo, done: !todo.done } : todo)),
    }));
  },
  removeTodo: (todoId: number) => {
    set((state) => ({ todos: state.todos.filter((todo) => todo.id !== todoId) }));
  },
}));
