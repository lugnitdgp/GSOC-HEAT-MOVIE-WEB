import React from "react";
// import { Link } from "react-router-dom";

const Search = (props) => {
  const movies = props.movies;
  
  console.log(movies);
  return (
    <div className="searchwrap">
      <div className="Search">
        <div className="searchmovies">
          {movies?.map((movie) => (
            <div className="searchmovie">
                <div className="searchimage"  onClick={() => (
    window.location.href=`/${movie.id}` )}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt="" 
                  />
                </div>
                {/* <div className="popular">
                  <h2>{movie.title}</h2>
                </div> */}

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
