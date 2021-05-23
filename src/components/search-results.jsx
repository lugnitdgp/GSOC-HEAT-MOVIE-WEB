import React from "react";
import { Link } from "react-router-dom";

const Search = (props) => {
  const movies = props.movies;
  return (
    <div className="searchwrap">
      <div className="Search">
        <div className="popularmovies">
          {movies?.map((movie) => (
            <div className="popularmovie">
              <Link to={`/${movie.id}`}>
                <div className="popularimage">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt=""
                  />
                </div>
                <div className="popular">
                  <h2>{movie.title}</h2>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
