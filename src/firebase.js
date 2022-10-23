import { getApps, initializeApp } from 'firebase/app';
import 'firebase/compat/firestore';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import 'firebase/compat/firestore';
import { getDatabase, ref, onValue, child } from 'firebase/database';

//const firebaseApp = firebase.initializeApp(firebaseConfig);
//console.log(firebaseApp);

let app;
if (getApps().length === 0) {
  // Initialize Firebase
  app = initializeApp(process.env.REACT_APP_FIREBASE_CONFIG);
} else {
  // else return what we already have
  app = getApps()[0];
}

const db = getDatabase(app);
//const auth = getAuth(app);
//console.log(auth);
// // Using a redirect.
export const signInWithGoogle = async (auth) => {
  // Sign in using a popup.
  const provider = new GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');

  //사용자 선택
  provider.setCustomParameters({
    prompt: 'select_account',
  });
  const result = await signInWithPopup(auth, provider);
  // The signed-in user info.
  const user = result.user;

  // const userInfo_ = {
  //   name: user?.displayName,
  //   id: user?.email,
  //   uid: user?.uid,
  // };
  // This gives you a Google Access Token.
  //const credential = GoogleAuthProvider.credentialFromResult(result);
  // const token = credential.accessToken;
  return user;
};

export const signOutHandler = async (auth) => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
};

export { app, db, ref, onValue, child };
