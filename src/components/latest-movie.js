import React from "react";
// import movie from "../assests/movie.jpg";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

const Latest = (props) => {
  const u = props.u;
  var Heading = "heading";
  const url = `https://api.themoviedb.org/3/movie/${u}?api_key=9937e01a0bed790196d656e18d30d9ad&language=en-US&page=1`;
  const [movies, setMovies] = useState([]);

  const getMovies = useCallback(async () => {
    const response = await fetch(url);
    const movies = await response.json();
    setMovies(movies.results);
  }, [url]);

  useEffect(() => {
    getMovies();
  }, [url, getMovies]);
  console.log(movies);

  if (u === "popular") {
    Heading = "Popular";
  } else if (u === "upcoming") {
    Heading = "UPCOMING";
  } else if (u === "top_rated") {
    Heading = "Top Rated";
  } else if (u === "now_playing") {
    Heading = "Now Playing";
  }
  return (
    <>
      <h1
        style={{
          color: "var(--text-color)",
          marginLeft: "85px",
          marginTop: "100px",
          fontSize: "60px",
        }}
      >
        {Heading}
      </h1>
      <div className="movies">
        <div className="popularmovies">
          {movies.map((movie) => (
            <div className="popularmovie">
              <Link to={`/${movie.id}`}>
                <div className="popularimage">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt=""
                  />
                </div>
                {/* <div className="popular">
                <h2>{movie.title}</h2>
              </div> */}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Latest;
