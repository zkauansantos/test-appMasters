import { useRouter } from "next/navigation";
import { useState, createContext, useEffect, use } from "react";

import axios, { AxiosError } from "axios";

import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";

import { destroyCookie, parseCookies } from "nookies";

interface AuthProviderProps {
  children: React.ReactNode;
}

type User = {
  id?: string;
  name?: string;
  email: string;
  photoUrl?: string;
};

type AuthContextData = {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  clearAuthError: () => void;
  logout: () => Promise<void>;
  user: User | null;
  isAuthenticated: boolean;
  authError: null | AuthErrorState;
};

type AuthErrorState = {
  message: string;
  showInEmail?: boolean;
  showInPassword?: boolean;
  showInButton?: boolean;
};

export const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [authError, setAuthError] = useState<null | AuthErrorState>(null);
  const router = useRouter();

  useEffect(() => {
    authChannel = new BroadcastChannel("auth");

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case "logOut":
          logout();
          break;
        default:
          break;
      }
    };
  });

  useEffect(() => {
    const { "user-name": name, "user-email": email } = parseCookies();

    if (email && name) {
      setUser({
        name,
        email,
      });
    }
  }, [router]);

  async function signIn(email: string, password: string) {
    try {
      const { data: userLogged } = await axios.post("/api/auth/sign-in", {
        email,
        password,
      });

      setUser(userLogged);

      router.push("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          setAuthError({
            message: "E-mail ou senha incorretos",
            showInEmail: true,
            showInPassword: true,
          });
          return;
        }

        if (error.response?.status === 404) {
          setAuthError({
            message: "Usuário não cadastrado",
            showInEmail: true,
          });
          return;
        }

        return setAuthError({
          message: "Desculpe ocorreu um erro inesperado, volte mais tarde",
          showInButton: true,
        });
      }
    }
  }

  async function signUp(name: string, email: string, password: string) {
    try {
      const { data: userRegistered } = await axios.post("/api/auth/sign-up", {
        name,
        email,
        password,
      });

      setUser(userRegistered);

      await signIn(email, password);
      router.push("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          return setAuthError({
            message: "E-mail já cadastrado",
            showInEmail: true,
          });
        }
      }

      return setAuthError({
        message: "Desculpe ocorreu um erro inesperado, volte mais tarde",
        showInButton: true,
      });
    }
  }

  async function logout() {
    await signOut(auth);
    destroyCookie(undefined, "user-name");
    destroyCookie(undefined, "user-email");
    destroyCookie(undefined, "user-id");

    authChannel.postMessage("logOut");

    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        authError,
        clearAuthError: () => setAuthError(null),
        signUp,
        signIn,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
