import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import React, { createContext, useState, useEffect } from "react";
import { app } from "../firebase.init";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const signInUser = (navigate) => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((res) => {
        setUser(res.user);
        navigate('/')
        console.log('res from authProvider', res.user)
      })
      .catch((err) => {
        console.error(err);
      })
  };

  const signOutUser = () => {
    signOut(auth).then(() => {
      console.log('user signed out')
    })
  }


  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log('res from onauthstate change', currentUser)
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const userInfo = { user, signInUser, loading, signOutUser };

  return (
    <AuthContext.Provider value={userInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
