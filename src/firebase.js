import { getApps, initializeApp } from 'firebase/app';
import 'firebase/compat/firestore';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getDatabase, ref, onValue, child } from 'firebase/database';

const config = {
  databaseURL: process.env.REACT_APP_databaseUrl,
  projectId: process.env.REACT_APP_projectId,
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};

let app;
if (getApps().length === 0) {
  // Initialize Firebase
  app = initializeApp(config);
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
