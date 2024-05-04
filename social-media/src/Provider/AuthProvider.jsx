/* eslint-disable react/prop-types */
// authProvider.js
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';
import { createContext,  useEffect, useState } from 'react';
import app from '../firebase/firebase.config';

// Create a context for authentication
 export const AuthContext = createContext();

// Custom hook to use the auth context




// Provider component that wraps your app and provides authentication state
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Function to handle user signup
  const signUp = async (email, password) => {
    const auth = getAuth(app);
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const value = {
    currentUser,
    signUp,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
