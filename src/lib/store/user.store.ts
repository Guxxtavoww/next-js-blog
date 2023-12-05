import { create } from 'zustand';
import { User } from '@supabase/supabase-js';

interface iUserStateProps {
  user: Maybe<User>;
  setUser: (user: Maybe<User>) => void;
}

export const useUserState = create<iUserStateProps>()((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
}));
