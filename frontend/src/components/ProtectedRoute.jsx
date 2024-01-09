// ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const ProtectedRoute = ({ element, fallback }) => {
  const { user } = useAuth();

  return (
    <Route
      element={user ? element : <Navigate to={fallback} replace />}
    />
  );
};

export default ProtectedRoute;
