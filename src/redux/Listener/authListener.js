import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase_auth/firebaseauth";
import { setAuthUser, clearAuthUser } from "../slices/authSlice";

export const startAuthListener = (dispatch) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(
        setAuthUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        })
      );
    } else {
      dispatch(clearAuthUser());
    }
  });
};
