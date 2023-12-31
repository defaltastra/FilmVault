import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Movie from "../components/Movie";
import { useParams } from "react-router-dom";

const MovieList = () => {
  const params = useParams();
  const key = process.env.REACT_APP_IMDB_API_KEY;
 
 
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);

  const fetchData = useCallback(async (pageNum) => {
    try {
      const apiUrl = `http://localhost:8000/movie/${params.genre}?api_key=${key}&language=en-US&page=${pageNum}`;
      const response = await axios.get(apiUrl);
      setMovies((prevstate) => [...prevstate, ...response.data.results]);
    } catch (error) {
      console.error(error);
    }
  }, [params.genre]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);


  const loadMore = () => {
    setPage((prevstate) => prevstate + 1);
  };

  return (
    <div>
      <div className="mx-auto py-10 px-6 max-w-[90%]">
        <div className="grid grid-cols-2 gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 xl:gap-x-8 mt-12">
          {movies.map((item) => (
           <Movie item={item} ></Movie>
          ))}
        </div>
        <div className="flex items-center justify-center mt-10">
        <button className="bg-cyan-600 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded " onClick={loadMore} disabled={page>15 ? true: false}>
          Load More
        </button>
                  
        </div>
      </div>
    </div>
  );
};
export default MovieList;
