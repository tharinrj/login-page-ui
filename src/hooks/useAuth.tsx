import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
  type User,
} from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';

const TOKEN_KEY = 'tugas.accessToken';

type AuthContextValue = {
  user: User | null;
  accessToken: string | null;
  initialising: boolean;
  signingIn: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<boolean>;
  signOut: () => Promise<void>;
  clearError: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function getFirebaseErrorMessage(error: unknown): string | null {
  const code =
    typeof error === 'object' && error !== null && 'code' in error
      ? String((error as { code: unknown }).code)
      : '';

  if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
    return null;
  }
  if (code === 'auth/popup-blocked') {
    return 'Pop-up was blocked by the browser. Allow pop-ups and try again.';
  }
  if (code === 'auth/network-request-failed') {
    return 'Network error. Check your connection and try again.';
  }
  return 'Sign-in failed. Please try again.';
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    try { return sessionStorage.getItem(TOKEN_KEY); } catch { return null; }
  });
  const [initialising, setInitialising] = useState(true);
  const [signingIn, setSigningIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      if (!nextUser) {
        setAccessToken(null);
        try { sessionStorage.removeItem(TOKEN_KEY); } catch { /* ignore */ }
      }
      setInitialising(false);
    });
  }, []);

  const signInWithGoogle = useCallback(async () => {
    setSigningIn(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken ?? null;
      setUser(result.user);
      setAccessToken(token);
      try { if (token) sessionStorage.setItem(TOKEN_KEY, token); } catch { /* ignore */ }
      return true;
    } catch (err) {
      setError(getFirebaseErrorMessage(err));
      return false;
    } finally {
      setSigningIn(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    await firebaseSignOut(auth);
    setAccessToken(null);
    try { sessionStorage.removeItem(TOKEN_KEY); } catch { /* ignore */ }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return (
    <AuthContext.Provider value={{ user, accessToken, initialising, signingIn, error, signInWithGoogle, signOut, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside an AuthProvider');
  return context;
}
