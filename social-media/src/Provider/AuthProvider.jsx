import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userUid, setUserUid] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserUid(user?.uid);
        setCurrentUser(user?.email);
      } else {
        setUserUid('');
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email, password) => {
    const auth = getAuth(app);
    const createUser = await createUserWithEmailAndPassword(auth, email, password);
    setUserUid(createUser?.user?.uid);
  };

  const signInWithEmail = async (email, password) => {
    const auth = getAuth(app);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUserUid(result?.user?.uid);
    } catch (error) {
      console.error('Error signing in with email/password:', error);
    }
  };

  // const signInWithGoogle = async () => {
  //   const auth = getAuth(app);
  //   const provider = new GoogleAuthProvider();
  //   try {
  //     const result = await signInWithPopup(auth, provider);
  //     setUserUid(result?.user?.uid);
  //   } catch (error) {
  //     console.error('Error signing in with Google:', error);
  //   }
  // };
  const signUserOut = async () => {
    const auth = getAuth(app);
    try {
      await signOut(auth);
      setUserUid('');
      setCurrentUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const value = {
    currentUser,
    signUp,
    signInWithEmail,

    userUid,
    signUserOut
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
