import { useState, createContext, useEffect } from "react";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { doc, setDoc, getDoc } from "firebase/firestore";
import { database, auth } from "@/firebase/firebase";
import { useRouter } from "next/navigation";
import { destroyCookie, parseCookies, setCookie } from "nookies";

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
  logout: () => Promise<void>;
  user: User | null;
  isAuthenticated: boolean;
};

export const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
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
      return;
    }
  }, [router]);

  async function signIn(email: string, password: string) {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userProfile = await getDoc(
        doc(database, "users", userCredentials.user.uid)
      );

      setUser({
        name: userProfile.data()?.name,
        email,
      });

      setCookie(undefined, "user-name", userProfile.data()?.name);
      setCookie(undefined, "user-email", email);

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  async function signUp(name: string, email: string, password: string) {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(database, "users", userCredentials.user.uid), {
        name: name,
        avatarUrl: null,
        email,
      });

      setUser({
        name,
        email,
      });

      setCookie(undefined, "user-name", name);
      setCookie(undefined, "user-email", email);

      setUser({
        name,
        email,
      });

      await signIn(email, password);

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  async function logout() {
    await signOut(auth);
    destroyCookie(undefined, "user-name");
    destroyCookie(undefined, "user-email");
    authChannel.postMessage("logOut");

    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        signUp,
        signIn,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
