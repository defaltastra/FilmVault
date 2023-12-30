import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import requests from "../Requests";

const Main = (props) => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results);
    });
  }, []);

  const ReadMore = (text) => {
    const over = JSON.stringify(text);
    const overview = over.replace(/[^\w\s]/g, "").replace(/(^\s+|\s+$)/g, "").replace(/\s+/g, " ").replace("children", "");
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => { setIsReadMore(!isReadMore) };

    return (
      <p>
        {isReadMore ? overview.slice(0, 150) : overview}
        {overview.length > 150 &&
          <span onClick={toggleReadMore} className="text-gray-500 cursor-pointer">
            {isReadMore ? '...read more' : ' ...show less'}
          </span>
        }
      </p>
    )
  }



  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const handleClick = (event, movieId) => {
    // Check if the click event is coming from the "Play" button
    if (event.target.classList.contains('play-button')) {
      navigate(`/${props.genre}/${movieId}`);
    }
  }

  return (
    <div className="w-full h-[70vh] md:h-[600px] text-[#FFFDE3]">
      <div className="w-full h-full">
        <div className="absolute w-full h-[70vh] md:h-[600px] bg-gradient-to-r from-black">
          {" "}
        </div>
        <Slider {...settings}>
          {movies.map((movie) => (
            <div key={movie.id} className="relative" onClick={(event) => handleClick(event, movie.id)}>
              <img
                className="w-full h-[70vh] md:h-full object-cover cursor-pointer"
                src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
                alt=""
              />
              <div className="absolute w-full top-[20%] p-4 md:p-16">
                <h1 className="text-2xl md:text-5xl font-bold">{movie?.title} </h1>
                <div className="my-4">
                  <button className="border bg-gray-300 text-black border-gray-300 py-2 px-5 play-button">
                    Play
                  </button>

                </div>
                <p className="text-gray-400 text-sm">Released: {movie?.release_date} </p>
                <p className="w-full sm:max-w-[80%] md:max-w-[70%] lg:max-w-[50%] text-gray-200 text-sm md:text-base mt-2">
                  <ReadMore>{movie?.overview}</ReadMore>
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Main;
