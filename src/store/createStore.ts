import { useSyncExternalStore } from 'react';

type SetterFn<TState> = (prevState: TState) => Partial<TState>;
type setStateFn<TState> = (partialState: Partial<TState> | SetterFn<TState>) => void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createStore<TState extends Record<string, any>>(
  // eslint-disable-next-line no-shadow
  createState: (setState: setStateFn<TState>, getState: () => TState) => TState,
) {
  let state: TState;
  let listeners: Set<() => void>;

  function notifyListeners() {
    listeners.forEach((listener) => listener());
  }

  function getState() {
    return state;
  }

  function setState(partialState: Partial<TState> | SetterFn<TState>) {
    const newValue = typeof partialState === 'function' ? partialState(state) : partialState;
    state = {
      ...state,
      ...newValue,
    };

    notifyListeners();
  }

  function subscribe(listener: () => void) {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  }

  function useStore<TValue>(selector: (currentState: TState) => TValue): TValue {
    // const [value, setValue] = useState();
    // useEffect(() => {
    //   const unsubscribe = subscribe(() => {
    //     const newValue = selector(state);
    //     if (value !== newValue) {
    //       setValue(newValue);
    //     }
    //   });
    //   return () => {
    //     unsubscribe();
    //   };
    // }, [selector, value]);
    return useSyncExternalStore(subscribe, () => selector(state));
  }

  state = createState(setState, getState);
  listeners = new Set();
  return useStore;
}
