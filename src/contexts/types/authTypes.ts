export type User = {
  id: string;
  name: string;
  photoUrl: string;
};

export type AuthContextData = {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  clearAuthError: () => void;
  logout: () => Promise<void>;
  setUser: (updatedUser: User) => void;
  user: User | null;
  isAuthenticated: boolean;
  authError: null | AuthErrorState;
};
export type AuthErrorState = {
  message: string;
  showInEmail?: boolean;
  showInPassword?: boolean;
  showInButton?: boolean;
};
