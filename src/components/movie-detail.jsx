import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

const Details = () => {
  const { id } = useParams();
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=9937e01a0bed790196d656e18d30d9ad&language=en-US`;
  const video_url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=9937e01a0bed790196d656e18d30d9ad&language=en-US`;
  const [movie, setMovie] = useState([]);
  const [video, setVideo] = useState([]);

  const getMovie = useCallback(async () => {
    const response = await fetch(url);
    const movie = await response.json();
    setMovie(movie);
  }, [url]);

  useEffect(() => {
    getMovie();
  }, [url, getMovie]);
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
      <div className="populardetails">
        <div className="detailsimage">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt=""
          />
        </div>
        <div className="details">
          <div className="detailstitle">
            <h2 style={{ fontSize: "50px" }}>{movie.original_title}</h2>
          </div>
          <div className="detailstitle">
            <h2>Tagline: {movie.tagline}</h2>
          </div>
          <div className="detailstitle">
            <h2>Description :</h2>
            <h2>{movie.overview}</h2>
          </div>

          <div className="detailstitle">
            <h2>Ratings: {movie.vote_average}</h2>
          </div>
          <div className="detailstitle">
            <h2>Genres:</h2>
            {movie.genres?.map((genre) => (
              <h2>{genre.name}</h2>
            ))}
          </div>
          <div className="">
            {video?.map((vid) => (
              <iframe
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
      </div>
    </>
  );
};

export default Details;
