import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Account from "./pages/Account";
import Login from "./pages/Login";
import MovieList from "./pages/MovieList";
import ProtectedRoute from "./components/ProtectedRoute";
import MovieDetails from "./pages/MovieDetails";
import Footer from "./components/Footer";
import { AuthProvider, useAuth } from "./context/AuthContext";
import SavedShow from "./components/SavedShow";
import Settings from "./components/Settings";
function App() {
  const { loading, error } = useAuth();
  const navigate = useNavigate();

  // Check if data is still loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle authentication errors
  if (error) {
    // You might want to redirect to a login page or display an error message
    console.error("Authentication error:", error);
    return <Navigate to="/signIn" />;
  }

  return (
    <AuthProvider>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signIn" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/account" element={<SavedShow />} />
          <Route path="/settings" element={<Settings />} />
          <Route path=":genre" element={<MovieList />} />
          <Route path="/:genre" element={<MovieList />}>
            <Route path=":movieId" element={<MovieDetails />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
