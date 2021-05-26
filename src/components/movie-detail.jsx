// import zIndex from "@material-ui/core/styles/zIndex";
import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

const Details = () => {
  const { id } = useParams();
  const url1 = `${process.env.REACT_APP_MOVIE_URL}/${id}${process.env.REACT_APP_API_KEY}&language=en-US`;
  const video_url = `${process.env.REACT_APP_MOVIE_URL}/${id}/videos${process.env.REACT_APP_API_KEY}&language=en-US`;
  const [movie, setMovie] = useState([]);
  const [video, setVideo] = useState([]);

  const getMovie = useCallback(async () => {
    const response = await fetch(url1);
    const movie = await response.json();
    setMovie(movie);
  }, [url1]);

  useEffect(() => {
    getMovie();
  }, [url1, getMovie]);
  console.log(movie);

  const getVideo = useCallback(async () => {
    const response = await fetch(video_url);
    const video = await response.json();
    setVideo(video.results.slice(0, 5));
  }, [video_url]);

  useEffect(() => {
    getVideo();
  }, [video_url, getVideo]);
  console.log(movie);

  return (
    <>
      <img
        src={`${process.env.REACT_APP_IMAGE_URL}${movie.backdrop_path}`}
        alt=""
        style={{
          objectFit: "cover",
          width: "100vw",
          height: "100vh",
          position: "fixed",
          zIndex: 1,
        }}
      />
      <div
        className="tails"
        style={{
          // backgroundImage: `url(
          //   https://image.tmdb.org/t/p/original${movie.backdrop_path}
          // )`,
          // backgroundAttachment: "fixed",
          // backgroundPosition: "center",
          // backgroundSize: "cover",
          // width: "100vw",
          // marginTop: "0px",
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(5px)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div className="populardetails">
          <div className="detailsimage">
            <img
              src={`${process.env.REACT_APP_IMAGE_URL}${movie.poster_path}`}
              alt=""
            />
          </div>
          <div className="align">
            <div className="details">
              <div className="detailstitle">
                <h2 style={{ fontSize: "50px" }}>{movie.original_title}</h2>
              </div>
              <div className="detailstitle" style={{ display: "flex" }}>
                <h2 style={{ marginRight: "10px" }}>Rating: </h2>
                <h2>{movie.vote_average}</h2>
                <span
                  style={{
                    fontSize: "170%",
                    color: "yellow",
                    marginTop: "18px",
                  }}
                >
                  &#9733;
                </span>
              </div>
              <div className="detailstitle">
                <h2>{movie.overview}</h2>
              </div>
              <div className="detailstitle">
                <h2>Runtime: {movie.runtime}</h2>
              </div>
              <div className="detailstitle">
                <h2>Released: {movie.release_date}</h2>
              </div>

              <div className="detailsgenres">
                <h2>Genres:</h2>
                {movie.genres?.map((genre) => (
                  <h2>{genre.name},</h2>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="videos">
          {video?.map((vid) => (
            <iframe
              className="video"
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${vid.key}`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          ))}
        </div>
      </div>
    </>
  );
};

export default Details;
