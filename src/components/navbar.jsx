import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
// import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
// import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import { useState, useEffect, useCallback } from "react";
import Search from "./search-results";
// import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // position: "fixed",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    width: "10%",
    fontSize: "30px",
    // display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.45),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.35),
    },
    marginLeft: 0,
    width: "50%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar() {
  const [text, setText] = useState("");
  const classes = useStyles();

  const submit = (e) => {
    e.preventDefault();
    // window.location.href = "/search";
    // <Link to="/search"></Link>;
  };
  console.log(submit);
  // console.log(text);
  const url = `https://api.themoviedb.org/3/search/movie?api_key=9937e01a0bed790196d656e18d30d9ad&language=en-US&query=${text}&page=1&include_adult=false`;
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

  return (
    <>
      <div className={classes.root}>
        <AppBar
          position="fixed"
          style={{
            backgroundColor: "transparent",
            backdropFilter: "blur(7px)",
          }}
          elevation={0}
        >
          <Toolbar>
            {/* <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton> */}
            <Typography
              className={classes.title}
              variant="h3"
              style={{ width: "50%" }}
            >
              Movies
            </Typography>
            <div className={classes.search} search>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search Movie…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                value={text}
                onChange={(e) => setText(e.target.value)}
                // onClick={() => (window.location.href = "/search")}
              />
            </div>
          </Toolbar>
        </AppBar>
        {text !== "" ? (
          <div className="">
            <Search movies={movies} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
