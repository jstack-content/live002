import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { ITodo } from '../entities/ITodo';
import { IUser } from '../entities/IUser';

interface IGlobalContextValue {
  user: IUser | null;
  login(): void;
  logout(): void;
  todos: ITodo[];
  addTodo(title: string, author?: string): void;
  toggleTodoDone(todoId: number): void;
  removeTodo(todoId: number): void;
}

const GlobalContext = createContext({} as IGlobalContextValue);

export function useGlobal() {
  return useContext(GlobalContext);
}

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [loggedUser, setLoggedUser] = useState<IUser | null>(null);
  const [todos, setTodos] = useState<ITodo[]>([]);

  const login = useCallback(() => {
    setLoggedUser({
      email: 'mateus@jstack.com.br',
      name: 'Mateus Silva',
    });
  }, []);

  const logout = useCallback(() => {
    setLoggedUser(null);
  }, []);

  const addTodo = useCallback(
    (title: string) => {
      setTodos((prevState) =>
        prevState.concat({
          id: Date.now(),
          title,
          author: loggedUser?.name ?? 'Convidado',
          done: false,
        }),
      );
    },
    [loggedUser?.name],
  );

  const toggleTodoDone = useCallback((todoId: number) => {
    setTodos((prevState) =>
      prevState.map((todo) =>
        todo.id === todoId ? { ...todo, done: !todo.done } : todo,
      ),
    );
  }, []);

  const removeTodo = useCallback((todoId: number) => {
    setTodos((prevState) => prevState.filter((todo) => todo.id !== todoId));
  }, []);

  const contextValue = useMemo(
    () => ({
      user: loggedUser,
      login,
      logout,
      todos,
      addTodo,
      toggleTodoDone,
      removeTodo,
    }),
    [loggedUser, login, logout, todos, addTodo, toggleTodoDone, removeTodo],
  );

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
}
