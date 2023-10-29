import { CircleOffIcon, LayoutListIcon } from 'lucide-react';

import { useRenderCounter } from '../hooks/useRenderCounter';
import { useGlobalStore } from '../store/globalStore';

export function TodosCounter() {
  useRenderCounter('TodosCounter');

  const todos = useGlobalStore((state) => state.todos);
  const totalTodos = todos.length;

  return (
    <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 text-xs">
      {totalTodos === 0 && (
        <>
          <CircleOffIcon className="h-4 w-4" />
          <span>Nenhuma tarefa cadastrada!</span>
        </>
      )}

      {totalTodos > 0 && (
        <>
          <LayoutListIcon className="h-4 w-4" />
          <span>Número de Tarefas: {totalTodos}</span>
        </>
      )}
    </div>
  );
}
