// src/components/GoogleLoginButton.tsx
import React from "react";
import { useAuth } from "../context/AuthContext";

export function GoogleLoginButton() {
  const { signInWithGoogle } = useAuth();
  return (
    <button data-testid="google-btn" onClick={() => signInWithGoogle()}>
      Sign in with Google
    </button>
  );
}
