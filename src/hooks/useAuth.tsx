import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
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
  /** Google OAuth access token returned with the sign-in credential. */
  accessToken: string | null;
  /** True until Firebase has restored any existing session. */
  initialising: boolean;
  /** True while a sign-in popup is open. */
  signingIn: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<boolean>;
  signOut: () => Promise<void>;
  clearError: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredToken(): string | null {
  try {
    return sessionStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

function writeStoredToken(token: string | null) {
  try {
    if (token) sessionStorage.setItem(TOKEN_KEY, token);
    else sessionStorage.removeItem(TOKEN_KEY);
  } catch {
    // Private browsing can block storage; the token still lives in state.
  }
}

/** Turn Firebase error codes into something a person can act on. */
function describeAuthError(error: unknown): string | null {
  const code =
    typeof error === 'object' && error !== null && 'code' in error
      ? String((error as { code: unknown }).code)
      : '';

  switch (code) {
    case 'auth/popup-closed-by-user':
    case 'auth/cancelled-popup-request':
      return null; // The user backed out on purpose. Say nothing.
    case 'auth/popup-blocked':
      return 'Your browser blocked the sign-in window. Allow pop-ups and try again.';
    case 'auth/unauthorized-domain':
      return 'This domain is not authorised in Firebase Authentication settings.';
    case 'auth/network-request-failed':
      return 'No connection to Firebase. Check your network and try again.';
    default:
      return 'Google sign-in did not complete. Try again.';
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(readStoredToken);
  const [initialising, setInitialising] = useState(true);
  const [signingIn, setSigningIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      if (!nextUser) {
        setAccessToken(null);
        writeStoredToken(null);
      }
      setInitialising(false);
    });
  }, []);

  const signInWithGoogle = useCallback(async () => {
    setSigningIn(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // The OAuth access token lives on the credential, not on the user.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken ?? null;
      setUser(result.user);
      setAccessToken(token);
      writeStoredToken(token);
      return true;
    } catch (caught) {
      setError(describeAuthError(caught));
      return false;
    } finally {
      setSigningIn(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    await firebaseSignOut(auth);
    setAccessToken(null);
    writeStoredToken(null);
  }, []);

  const clearError = useCallback(() => setError(null), []);

  const value = useMemo(
    () => ({
      user,
      accessToken,
      initialising,
      signingIn,
      error,
      signInWithGoogle,
      signOut,
      clearError,
    }),
    [
      user,
      accessToken,
      initialising,
      signingIn,
      error,
      signInWithGoogle,
      signOut,
      clearError,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside an AuthProvider');
  }
  return context;
}
