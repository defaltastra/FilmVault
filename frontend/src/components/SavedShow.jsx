import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";

const SavedShow = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        const userName = localStorage.getItem('userName');

        const response = await axios.get('http://127.0.0.1:8000/movies', {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'X-User-Name': userName,
          },
        });

        const moviesArray = response.data.savedShows || response.data || [];
        setMovies(moviesArray);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const deleteShow = async (passId) => {
    try {
      const authToken = localStorage.getItem('authToken');
      const userName = localStorage.getItem('userName');
      const csrfResponse = await axios.get('http://127.0.0.1:8000/csrf-token');
      const csrfToken = csrfResponse.data.csrf_token;
  
      await axios.delete(
        `http://127.0.0.1:8000/user/${user?.id}/delete-show/${passId}`, 
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'X-User-Name': userName,
            'X-CSRF-TOKEN': csrfToken,
          },
        }
      );
  
      setMovies((prevMovies) => prevMovies.filter((item) => item.id !== passId));
    } catch (error) {
      console.error('Error deleting show:', error);
    }
  };
  
  
  




  return (
    <div>
      <div className="mx-auto max-w-2xl py-10 px-2 sm:py-10 sm:px-6 lg:max-w-7xl">
        {loading ? (
          <p className="text-center text-gray-500 text-5xl">Loading...</p>
        ) : !Array.isArray(movies) || movies.length === 0 ? (
          <p className="text-center text-gray-500 text-5xl">No movies found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {movies.map((item) => (
              <div key={item.id} className="bg-white overflow-hidden shadow-md rounded-lg">
                {item.posterPath ? (
                  <img
                    className="w-full h-40 object-cover"
                    src={`https://image.tmdb.org/t/p/w500${item.posterPath}`}
                    alt={item?.title}
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-300"></div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{item?.title}</h3>
                  <p className="text-gray-600">{item?.overview}</p>
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => deleteShow(item.id)}
                      className="text-white bg-red-500 px-3 py-1 rounded-full hover:bg-red-600 transition duration-300"
                    >
                      <AiOutlineClose />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
                };  
export default SavedShow;
