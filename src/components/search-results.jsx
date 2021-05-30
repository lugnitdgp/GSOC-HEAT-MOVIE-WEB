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
                    src={`${process.env.REACT_APP_IMAGE_URL}/${movie.poster_path}`}
                    alt="" 
                  />
                </div>
                {/* <div className="popular">
                  <h2>{movie.title}</h2>
                </div> */}
                <div className="pop">
                  <div className="popular" style={{display: "flex"}}>
                    <h2 style={{ marginRight: "10px" }}>Rating: </h2>
                    <h2>{movie.vote_average} &#11088;</h2>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
