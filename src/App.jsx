// src/App.jsx

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AuthForm from './features/auth/AuthForm';
import Dashboard from './pages/Dashboard';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { setUser, clearUser } from './features/auth/authSlice';

const App = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    // Listen for Firebase Auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(clearUser());
      }
    });

    // Cleanup on unmount
    return () => unsubscribe();
  }, [dispatch]);

  return user ? <Dashboard /> : <AuthForm />;
};

export default App;
