import { useRouter } from "next/navigation";
import { useState, createContext, useEffect } from "react";

import axios, { AxiosError } from "axios";

import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";

import { destroyCookie, parseCookies, setCookie } from "nookies";
import { queryClient } from "@/lib/queryClient";
import { AuthContextData, AuthErrorState, User } from "./types/authTypes";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [authError, setAuthError] = useState<null | AuthErrorState>(null);
  const router = useRouter();
  const {
    "user-name": name,
    "user-id": userId,
    "user-photo": userPhoto,
  } = parseCookies();

  useEffect(() => {
    if (userId) {
      setUser({
        id: userId,
        name,
        photoUrl: userPhoto,
      });
    }
  }, [router, name, userPhoto, userId]);

  async function signIn(email: string, password: string) {
    try {
      const { data: userLogged } = await axios.post("/api/auth/sign-in", {
        email,
        password,
      });
      setUser(userLogged);
      setCookie(undefined, "user-id", userLogged.id);
      setCookie(undefined, "user-name", userLogged.name);
      setCookie(undefined, "user-photo", userLogged.photoUrl);
      queryClient.resetQueries();
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
      setCookie(undefined, "user-id", userRegistered.id);
      setCookie(undefined, "user-name", userRegistered.name);
      setCookie(undefined, "user-photo", userRegistered.photoUrl);
      queryClient.resetQueries();
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
    destroyCookie(undefined, "user-id");
    destroyCookie(undefined, "user-name");
    destroyCookie(undefined, "user-photo");

    setUser(null);
    queryClient.resetQueries();
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
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
