import { memo, useRef } from 'react';

import { useRenderCounter } from '../hooks/useRenderCounter';
import { useGlobalStore } from '../store/globalStore';

function TodoFormComponent() {
  useRenderCounter('TodoForm');

  const inputRef = useRef<HTMLInputElement | null>(null);
  const addTodo = useGlobalStore((state) => state.addTodo);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (inputRef.current?.value) {
      addTodo(inputRef.current.value);
      inputRef.current.value = '';
    }
  }

  return (
    <form className="flex gap-4" onSubmit={handleSubmit}>
      <input
        className="h-12 w-full rounded-lg bg-white/5 px-4 outline-none transition-all focus:ring-1 focus:ring-white"
        placeholder="Título da tarefa..."
        ref={inputRef}
      />

      <button
        type="submit"
        className="rounded-lg bg-white px-6 font-semibold text-zinc-950 transition-opacity hover:opacity-90"
      >
        Enviar
      </button>
    </form>
  );
}

export const TodoForm = memo(TodoFormComponent);
