import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase_auth/firebaseauth";
import { setAuthUser, clearAuthUser } from "../slices/authSlice";
import { mapFirebaseUser } from "../../utils/mapFirebaseUser";

export const startAuthListener = (dispatch) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setAuthUser(mapFirebaseUser(user))); 
    } else {
      dispatch(clearAuthUser());
    }
  });
};
