import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  updateProfile,
  signOut,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { auth } from "../firebase_auth/firebaseauth";

const googleProvider = new GoogleAuthProvider();

export const loginWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const registerWithEmail = async (email, password, name) => {
  await createUserWithEmailAndPassword(auth, email, password);

  const user = auth.currentUser;

  await updateProfile(user, {
    displayName: name,
    photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`,
  });

  return auth.currentUser;
};

export const loginWithGoogle = () => signInWithPopup(auth, googleProvider);

export const loginWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const handleGoogleRedirectResult = async () => {
  const result = await getRedirectResult(auth);
  return result?.user || null;
};

export const logoutUser = () => signOut(auth);

export const mapAuthError = (err) =>
  err?.message || "Authentication failed";
