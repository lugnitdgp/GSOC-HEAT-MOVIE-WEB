import React from "react";
// import got from "../assests/GOT.jpg";
import { useState, useEffect, useCallback } from "react";
// import { Link } from "react-router-dom";
// import { useHistory} from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const Bigcard = () => {
  const url = `${process.env.REACT_APP_TRENDING_URL}`;
  const [movies, setMovies] = useState([]);

  const getMovies = useCallback(async () => {
    const response = await fetch(url);
    const movies = await response.json();
    setMovies(movies.results.slice(0, 10));
  }, [url]);

  useEffect(() => {
    getMovies();
  }, [url, getMovies]);

  //  const history = useHistory();
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
      {/* <div className="pic-ctn">
        {movies?.map((movie) => (
  <img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt="" className="pic" onClick={() => (
    window.location.href=`/${movie.id}`
  )}/> ))}
    
      </div> */}
      <Carousel
        dots="false"
        autoPlay="true"
        autoStart="true"
        infiniteLoop="true"
        dynamicHeight="false"
        interval="5000"
        // style={{ height: "60%" }}
      >
        {movies?.map((movie) => (
          <div onClick={() => (window.location.href = `/${movie.id}`)}>
            <img
              src={`${process.env.REACT_APP_IMAGE_URL}/${movie.backdrop_path}`}
              alt=""
              className="carouselimage"
            />
            <div className="shadow">
              <div className="poster">
                <div className="posterimage">
                  <img
                    src={`${process.env.REACT_APP_IMAGE_URL}${movie.poster_path}`}
                    alt=""
                    style={{
                      height: "300px",
                      width: "auto",
                      marginRight: "47px",
                      marginTop: "150px",
                    }}
                  />{" "}
                </div>
                <div className="maincard">
                  <h1>{movie.original_title}</h1>
                  <h2 className="overview">{movie.overview}</h2>
                  <div className="rating" style={{ display: "flex" }}>
                    <h2 style={{ marginRight: "10px" }}>Rating: </h2>
                    <h2>{movie.vote_average} &#11088;</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* <div>
                    <img src="assets/1.jpeg" />
                    <p className="legend">Legend 1</p>
                </div> */}
        {/* <div>
                    <img src="assets/2.jpeg" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="assets/3.jpeg" />
                    <p className="legend">Legend 3</p>
                </div> */}
      </Carousel>
    </>
  );
};

export default Bigcard;
