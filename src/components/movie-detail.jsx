import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

const Details = () => {
  const { id } = useParams();
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=9937e01a0bed790196d656e18d30d9ad&language=en-US`;
  const [movie, setMovie] = useState([]);

  const getMovie = useCallback(async () => {
    const response = await fetch(url);
    const movie = await response.json();
    setMovie(movie);
  }, [url]);

  useEffect(() => {
    getMovie();
  }, [url, getMovie]);
  console.log(movie);

  return (
    <>
      <div className="populardetails">
        <div className="details">
          <div className="detailsimage">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt=""
            />
          </div>
          <div className="detailstitle">
            <h2>{movie.original_title}</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
