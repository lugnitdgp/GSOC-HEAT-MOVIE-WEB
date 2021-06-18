// import zIndex from "@material-ui/core/styles/zIndex";
import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Slide } from "react-awesome-reveal";

const Details = () => {
  const { id } = useParams();
  const url1 = `${process.env.REACT_APP_MOVIE_URL}/${id}${process.env.REACT_APP_API_KEY}&language=en-US`;
  const video_url = `${process.env.REACT_APP_MOVIE_URL}/${id}/videos${process.env.REACT_APP_API_KEY}&language=en-US`;
  const [movie, setMovie] = useState([]);
  const [video, setVideo] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMovie = useCallback(async () => {
    const response = await fetch(url1);
    const movie = await response.json();
    setMovie(movie);
    setLoading(false);
  }, [url1]);

  useEffect(() => {
    getMovie();
  }, [url1, getMovie]);
  // console.log(movie);

  const getVideo = useCallback(async () => {
    const response = await fetch(video_url);
    const video = await response.json();
    setVideo(video.results.slice(0, 5));
  }, [video_url]);

  useEffect(() => {
    getVideo();
  }, [video_url, getVideo]);
  // console.log(movie);

  return (
    <>
      {loading ? (
        <div className="loader">
          <h1>Loading...</h1>
        </div>
      ) : (
        <>
          <img
            src={`${process.env.REACT_APP_IMAGE_URL}${movie.backdrop_path}`}
            alt=""
            className="backgroundimage"
          />
          <div
            className="tails"
            style={
              {
                // backgroundImage: `url(
                //   https://image.tmdb.org/t/p/original${movie.backdrop_path}
                // )`,
                // backgroundAttachment: "fixed",
                // backgroundPosition: "center",
                // backgroundSize: "cover",
                // width: "100vw",
                // marginTop: "0px",
              }
            }
          >
            {/* <div className="" style={{ zIndex: 3 }}> */}
            <div className="populardetails">
              <Slide direction="left">
                <div className="detailsimage">
                  <img
                    src={`${process.env.REACT_APP_IMAGE_URL}${movie.poster_path}`}
                    alt=""
                  />
                </div>
              </Slide>
              <Slide direction="right">
                <div className="align">
                  <div className="details">
                    <div className="detailstitle">
                      <h1>{movie.original_title}</h1>
                    </div>

                    <div className="desc">
                      <div className="detailsdesc">
                        <h2>{movie.overview}</h2>
                      </div>
                    </div>

                    <div className="real">
                      <div className="realrow">
                        <div className="detailsrating">
                          <h2 style={{ marginRight: "10px" }}>Rating: </h2>
                          <h2>{movie.vote_average} &#11088;</h2>
                          {/* <span className="span"></span> */}
                        </div>
                        <div className="detailsruntime">
                          <h2>
                            Runtime: {Math.floor(movie.runtime / 60)}h{" "}
                            {movie.runtime % 60}min
                          </h2>
                        </div>
                        <div className="detailsruntime">
                          <h2>Release Date: {movie.release_date}</h2>
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
                </div>
              </Slide>
            </div>

            <div className="vide">
              <div className="videos">
                <h1>Trailer Videos</h1>
                <Slide direction="right">
                  <div className="videoscroll">
                    <div className="video">
                      {video?.map((vid) => (
                        <iframe
                          className="vid"
                          src={`https://www.youtube.com/embed/${vid.key}`}
                          title="YouTube video player"
                          frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen
                        ></iframe>
                      ))}
                    </div>
                  </div>
                </Slide>
              </div>
            </div>
          </div>
        </>
      )}
      ;{/* </div> */}
    </>
  );
};

export default Details;
