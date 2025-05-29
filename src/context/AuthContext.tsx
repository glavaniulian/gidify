import React, {
  createContext,
  use,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "./firebase";
import type { AuthContextType, AuthenticatedUser } from "../types/users";
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      setUser(user as AuthenticatedUser);
    });
    return unSub;
  }, []);

  const signin = async (
    email: string,
    password: string
  ): Promise<AuthenticatedUser | null> => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const signedInUser = userCredential.user as AuthenticatedUser;
    setUser(signedInUser);
    return signedInUser;
  };

  const register = async (
    email: string,
    password: string
  ): Promise<AuthenticatedUser | null> => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const registeredUser = userCredential.user as AuthenticatedUser;
    setUser(registeredUser);
    return registeredUser;
  };

  const signout = async () => {
    await signOut(auth);
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  return (
    <AuthContext.Provider
      value={{ user, signin, signout, register, signInWithGoogle }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
