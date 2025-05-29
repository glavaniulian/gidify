// src/utils/users.ts

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db as firestore } from "../context/firebase";
import type { UserProfile } from "../types/users";

export async function createUserProfile(profile: UserProfile) {
  const ref = doc(firestore, "users", profile.uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, {
      email: profile.email,
      displayName: profile.displayName || null,
      createdAt: serverTimestamp(),
    });
  }
  return ref;
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const ref = doc(firestore, "users", uid);
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data() as UserProfile) : null;
}

export async function updateUserProfile(
  uid: string,
  data: Partial<UserProfile>
) {
  const ref = doc(firestore, "users", uid);
  await updateDoc(ref, { ...data, updatedAt: serverTimestamp() });
}
