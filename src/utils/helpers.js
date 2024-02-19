import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  await signInWithRedirect(auth, googleProvider).then((userCredential) => {
    window.location.reload();
  });
};
