import { useRouter } from "next/navigation";
import { useState, createContext, useEffect, use } from "react";

import axios, { AxiosError } from "axios";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, database } from "@/firebase/firebase";

import { destroyCookie, parseCookies } from "nookies";
import { doc, getDoc, setDoc } from "firebase/firestore";

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
  const [user, setUser] = useState<any>(null);
  const [authError, setAuthError] = useState<null | AuthErrorState>(null);
  const router = useRouter();

  // useEffect(() => {
  //   authChannel = new BroadcastChannel("auth");

  //   authChannel.onmessage = (message) => {
  //     switch (message.data) {
  //       case "logOut":
  //         logout();
  //         break;
  //       default:
  //         break;
  //     }
  //   };
  // });

  useEffect(() => {
    function loadStorage() {
      const storageUser = localStorage.getItem("user");

      if (storageUser) {
        setUser(JSON.parse(storageUser));
      }
    }

    loadStorage();
  }, []);

  async function signIn(email: string, password: string) {
    try {
      const { data: userLogged } = await axios.post("/api/auth/sign-in", {
        email,
        password,
      });

      setUser(userLogged);
      localStorage.setItem("user", JSON.stringify(userLogged));
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
      localStorage.setItem("user", JSON.stringify(userRegistered));
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  async function logout() {
    await signOut(auth);
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
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
