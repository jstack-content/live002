import { LogOutIcon, UserIcon } from 'lucide-react';

import { useRenderCounter } from '../hooks/useRenderCounter';
import { useGlobalStore } from '../store/globalStore';

export function UserMenu() {
  useRenderCounter('UserMenu');

  const user = useGlobalStore((state) => state.user);
  const login = useGlobalStore((state) => state.login);
  const logout = useGlobalStore((state) => state.logout);

  if (!user) {
    return (
      <button
        type="button"
        className="rounded-lg border border-white px-6 py-2 text-sm text-white transition-colors hover:bg-white/10"
        onClick={login}
      >
        Entrar
      </button>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-end gap-1 text-right">
        <span className="block text-sm text-zinc-500">Olá, {user.name}!</span>
        <button
          type="button"
          className="flex items-center gap-1.5 text-sm text-red-500 transition-colors hover:text-red-400"
          onClick={logout}
        >
          Sair <LogOutIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="to-green flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#40cbf6] to-[#82c041]">
        <UserIcon />
      </div>
    </div>
  );
}
