import type { User as FirebaseUser, UserCredential } from "firebase/auth";

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthenticatedUser extends FirebaseUser {
  profile: UserProfile;
}

export interface AuthContextType {
  user: AuthenticatedUser | null;
  signin: (email: string, password: string) => Promise<FirebaseUser | null>;
  register: (email: string, pass: string) => Promise<AuthenticatedUser | null>;
  signInWithGoogle: () => Promise<UserCredential>;

  signout: () => Promise<void>;
}
