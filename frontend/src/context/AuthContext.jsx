// AuthContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/login',
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log('Login Response:', response);
  
      if (response.status === 200) {
        const { token, user } = response.data;
        setUser(user);
        localStorage.setItem('authToken', token);
        localStorage.setItem('userName', user.name); 
        localStorage.setItem('userId', user.id);
        console.log('Stored id :', user.id);

        console.log('Stored Auth Token:', token);
        console.log('Stored User Name:', user.name);
      } else {
        console.error('Unexpected response status during login:', response.status);
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };
  
  
  


  const logout = async (csrfToken) => {
    try {
      console.log('Logging out with CSRF Token:', csrfToken);
      await axios.post('http://127.0.0.1:8000/logout', {}, {
        headers: {
          'X-CSRF-TOKEN': csrfToken,
        },
      });
      console.log('Logout successful');
      setUser(null);
      localStorage.removeItem('authToken');
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };
  const check = () => {
    return user !== null;
  };

  useEffect(() => {
    let isMounted = true;
  
    const fetchUser = async () => {
      try {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
          const response = await axios.get('http://127.0.0.1:8000/authenticated-user', {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });
    
          if (isMounted) {
            setUser(response.data);
            setLoading(false);
          }
        }
      } catch (error) {
        console.error('Fetch user failed:', error);
    
        if (error.response && error.response.status === 401) {
          console.log('Token expired or invalid. Clearing user data.');
          setUser(null);
          localStorage.removeItem('authToken');
          setLoading(false);
        } else {
          setLoading(false);
        }
      }
    };
    
  
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      fetchUser();
    } else {
      setLoading(false);
    }
  
    return () => {
      isMounted = false;
    };
  }, []);
  
  return (
    <AuthContext.Provider value={{ user, login, logout, loading , check}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
