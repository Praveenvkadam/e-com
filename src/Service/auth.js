import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

import { auth } from "../firebase_auth/firebaseauth";

/* =========================
   EXPORT AUTH EXPLICITLY
   ========================= */
export { auth };

/* =========================
   ERROR HANDLING
   ========================= */
export const mapAuthError = (error) => {
  const errorMap = {
    "auth/invalid-email": "The email address is badly formatted.",
    "auth/user-disabled": "This user has been disabled.",
    "auth/user-not-found": "No user found with this email.",
    "auth/wrong-password": "Incorrect password.",
    "auth/email-already-in-use": "This email is already in use.",
    "auth/weak-password": "Password should be at least 6 characters long.",
  };

  return errorMap[error.code] || error.message;
};

/* =========================
   EMAIL / PASSWORD
   ========================= */
export const loginWithEmail = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const registerWithEmail = async (email, password, name) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);

  if (name) {
    await updateProfile(result.user, {
      displayName: name,
      photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        name
      )}&background=6366f1&color=fff`,
    });
  }

  await result.user.reload();
  return result;
};

/* =========================
   GOOGLE AUTH
   ========================= */
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const loginWithGoogle = async () => {
  await signInWithRedirect(auth, googleProvider);
};

export const handleGoogleRedirectResult = async () => {
  return getRedirectResult(auth); // may return null
};


export const logoutUser = async () => {
  await signOut(auth);
};

export const subscribeToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, callback);
};
