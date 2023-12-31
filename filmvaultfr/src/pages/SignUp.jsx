import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [name, setName] = useState("");
  const [csrfToken, setCsrfToken] = useState(null);
  
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/csrf-token");
        const csrfToken = response.data;
  
        console.log("CSRF Token Response:", response);
        console.log("Extracted CSRF Token:", csrfToken);
  
        if (csrfToken) {
          setCsrfToken(csrfToken);
        } else {
          console.error("CSRF token is undefined or null.");
        }
      } catch (error) {
        console.error("Failed to fetch CSRF token:", error);
      }
    };
  
    fetchCsrfToken();
  }, []);
  
  
  
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      console.log("CSRF Token in handleSubmit:", csrfToken);
      console.log("Registration Data:", { name, email, password, password_confirmation: passwordConfirmation });
  
      const response = await axios.post(
        "http://127.0.0.1:8000/register",
        {
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
        },
        {
          headers: {
            'X-CSRF-Token': csrfToken,
          },
        }
      );
  
      console.log("Registration Response:", response.data);
      navigate("/signIn");
    } catch (error) {
      console.error("Registration failed:", error);
  
      if (error.response) {
        setError(`Registration failed: ${error.response.data.message}`);
      } else {
        setError("Registration failed. Please check your information and try again.");
      }
    }
  };
  
  
  

  return (
    <div>
      <div className="w-full h-screen">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="/"
          className="hidden sm:block absolute w-full h-full object-cover"
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
        <div className="fixed w-full px-4 py-24 z-45">
          <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white">
            <div className="max-w-[320px] mx-auto py-16">
              <h1 className="text-3xl font-bold">Sign Up</h1>
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col py-4"
              >
                <input
  className="p-3 my-2 bg-gray-700 rounded"
  type="text"
  placeholder="Name"
  autoComplete="name"
  onChange={(e) => setName(e.target.value)}
  required
  aria-label="Name"
/>

                <input
                  className="p-3 my-2 bg-gray-700 rounded"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email"
                />
                
                <input
                  className="p-3 my-2 bg-gray-700 rounded"
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength="6"
                  aria-label="Password"
                />
                <input
  className="p-3 my-2 bg-gray-700 rounded"
  type="password"
  placeholder="Confirm Password"
  autoComplete="new-password"
  onChange={(e) => setPasswordConfirmation(e.target.value)}
  required
  minLength="6"
  aria-label="Confirm Password"
/>

                <button className="bg-cyan-600 py-3 my-6 rounded font-bold" aria-label="Sign Up">
                  Sign Up
                </button>

                <p className="py-8">
                  <span className="text-gray-600">
                    Already subscribed to FilmVault?
                  </span>{" "}
                  <Link to="/signIn">Sign In</Link>
                </p>
                {/* Display error message if registration fails */}
                {error && <p className="text-red-500">{error}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
