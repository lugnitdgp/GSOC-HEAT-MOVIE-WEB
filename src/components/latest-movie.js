import React from "react";
// import movie from "../assests/movie.jpg";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

const Latest = (props) => {
  const u = props.u;
  var Heading = "heading";
  const url = `${process.env.REACT_APP_MOVIE_URL}/${u}${process.env.REACT_APP_API_KEY}&language=en-US&page=1`;
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
      <div className="moviesmain">
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
                <Link to={`/${movie.id}`} style={{ textDecoration: "none" }}>
                  <div className="popularimage">
                    <img
                      src={`${process.env.REACT_APP_IMAGE_URL}/${movie.poster_path}`}
                      alt=""
                    />
                  </div>
                  <div className="popular">
                    <h2>Rating {movie.vote_average}/10</h2>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Latest;
