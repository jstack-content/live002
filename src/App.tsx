import { AppBar } from './components/AppBar';
import { TodosList } from './components/TodosList';
import { GlobalProvider } from './contexts/GlobalContext';
import { useRenderCounter } from './hooks/useRenderCounter';

export function App() {
  useRenderCounter('App');

  return (
    <GlobalProvider>
      <AppBar />
      <TodosList />
    </GlobalProvider>
  );
}
