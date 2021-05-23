import React from "react";
// import got from "../assests/GOT.jpg";
import "../styles/maincard.css";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

const Bigcard = () => {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=9937e01a0bed790196d656e18d30d9ad&language=en-US&page=1`;
  const [movies, setMovies] = useState([]);

  const getMovies = useCallback(async () => {
    const response = await fetch(url);
    const movies = await response.json();
    setMovies(movies.results.slice(0,5));
  }, [url]);

  useEffect(() => {
    getMovies();
  }, [url, getMovies]);
  return (
    <>
      {/* <div className="moviecard">
        <div className="movieimage">
          <img src={got} alt="" />
        </div>
        <div className="card">
          <h2>Big Card</h2>
        </div>
      </div> */}
      <div className="pic-ctn">
        {movies?.map((movie) => (
          //  <Link to={`/${movie.id}`} className= "linkmain" style={{textDecoration: "none", display: "none"}}>
  <img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt="" className="pic" /> ))}
   {/* </Link> ))} 
  {/* <img src="https://picsum.photos/200/300?t=2" alt="" className="pic" />
  <img src="https://picsum.photos/200/300?t=3" alt="" className="pic" />
  <img src="https://picsum.photos/200/300?t=4" alt="" className="pic" />
  <img src="https://picsum.photos/200/300?t=5" alt="" className="pic" /> */}
        {/* 
           
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt="" className="pic"
                />
              {/* <div className="popular">
                <h2>{movie.title}</h2>
              </div> */}
            {/* </Link>
        ))} */} 
      </div>
    </>
  );
};

export default Bigcard;
