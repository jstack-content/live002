import { CheckCircleIcon, CircleIcon, LeafIcon, Trash2Icon, WindIcon } from 'lucide-react';

import { useRenderCounter } from '../hooks/useRenderCounter';
import { useGlobalStoreZustand } from '../store/globalStoreZustand';
import { cn } from '../utils/cn';

import { TodoForm } from './TodoForm';

export function TodosList() {
  useRenderCounter('TodosList');

  const todos = useGlobalStoreZustand((state) => state.todos);
  const toggleTodoDone = useGlobalStoreZustand((state) => state.toggleTodoDone);
  const removeTodo = useGlobalStoreZustand((state) => state.removeTodo);

  return (
    <div className="container mx-auto my-10 rounded-lg border border-white/5 p-6">
      <TodoForm />

      <div className="my-10 h-[1px] w-full bg-white/5" />

      {todos.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-white/10 bg-white/5 p-10">
          <div className="flex items-end">
            <WindIcon className="h-10 w-10" />
            <LeafIcon className="h-5 w-5" />
          </div>
          <span className="opacity-70">Nenhuma tarefa criada!</span>
        </div>
      )}

      {todos.length > 0 && (
        <ul className="space-y-4">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={cn(
                'flex items-center justify-between rounded-lg border border-white/5 p-4',
                todo.done && 'border-green-400/10 bg-green-400/5 transition-colors',
              )}
            >
              <div>
                <span
                  className={cn(
                    'flex items-center gap-2 text-lg transition-colors',
                    todo.done && 'italic text-gray-500 line-through',
                  )}
                >
                  {todo.title}
                </span>
                <small className="text-zinc-500">Por {todo.author}</small>
              </div>

              <div className="space-x-4">
                <button
                  onClick={() => toggleTodoDone(todo.id)}
                  type="button"
                  className="opacity-80 transition-opacity hover:opacity-100"
                >
                  {todo.done && <CheckCircleIcon className="h-5 w-5 text-green-400" />}
                  {!todo.done && <CircleIcon className="h-5 w-5 text-white" />}
                </button>

                <button type="button" onClick={() => removeTodo(todo.id)}>
                  <Trash2Icon className="h-5 w-5 text-red-500 transition-colors hover:text-red-400" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
