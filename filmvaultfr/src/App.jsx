import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import MovieList from "./pages/MovieList";
import MovieDetails from "./pages/MovieDetails";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
import SavedShow from "./components/SavedShow";
import Settings from "./components/Settings";

function App() {
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
