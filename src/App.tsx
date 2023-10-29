import { AppBar } from './components/AppBar';
import { TodosList } from './components/TodosList';
import { useRenderCounter } from './hooks/useRenderCounter';

export function App() {
  useRenderCounter('App');

  return (
    <>
      <AppBar />
      <TodosList />
    </>
  );
}
