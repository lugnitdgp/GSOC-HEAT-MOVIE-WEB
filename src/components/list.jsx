import React from "react";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import "../styles/app.css";
import { Fade } from "react-awesome-reveal";

const List = (props) => {
  const u = props.u;
  const link = props.link;
  var Heading = "heading";
  const url = `${process.env.REACT_APP_MOVIE_URL}/${u}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`;
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMovies = useCallback(async () => {
    const response = await fetch(url);
    const movies = await response.json();
    setMovies(movies.results.slice(0, 11));
    setLoading(false);
  }, [url]);

  useEffect(() => {
    getMovies();
  }, [url, getMovies]);
  console.log(movies);

  if (u === "popular") {
    Heading = "Popular";
  } else if (u === "upcoming") {
    Heading = "Upcoming";
  } else if (u === "top_rated") {
    Heading = "Top Rated";
  } else if (u === "now_playing") {
    Heading = "Now Playing";
  }
  return (
    <>
      {loading ? (
        <div className="loader">
          <h1>Loading...</h1>
        </div>
      ) : (
    <>
      <div className="explore">
        <h1>{Heading}</h1>
        <div className="space">
          <Link to={link} style={{ textDecoration: "none" }}>
            <div className="next">
              <h3>Explore all &raquo;</h3>
              {/* <p className="arrow right"></p> */}
            </div>
          </Link>
        </div>
      </div>
      <Fade direction="top">
      <div className="listmovies">
        {movies.map((movie) => (
          <div className="listmovie">
            <Link to={`/${movie.id}`}>
              <div className="listimage">
                <img
                  src={`${process.env.REACT_APP_IMAGE_URL}/${movie.poster_path}`}
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
      </Fade>
    </>
      )}
      </>
  );
};

export default List;
