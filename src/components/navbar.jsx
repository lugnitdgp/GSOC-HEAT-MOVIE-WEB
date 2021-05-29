import React from "react";
import clsx from "clsx";
import {
  AppBar,
  Hidden,
  List,
  Drawer,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import { useState, useEffect, useCallback } from "react";
import Search from "./search-results";
// import { Link } from "react-router-dom";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // position: "fixed",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}/2px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: "none",
  },
  drawer: {
    // width: drawerWidth,
    flexShrink: 0,
    color: "white",
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "white",
    // fontSize: "25px",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    // padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
    color: "white",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    color: "white",
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    color: "white",
    marginLeft: 0,
  },
  // menuButton: {
  //   marginRight: theme.spacing(2),
  // },
  title: {
    flexGrow: 1,
    marginRight: theme.spacing(6),
    // width: `calc(1em + ${theme.spacing(2)}px)`,
    fontSize: "40px",
    // display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
      fontSize: "30px",
    },
  },
  listItemText: {
    fontSize: "25px",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.45),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.35),
    },
    marginLeft: 0,
    // width: "50%",
    [theme.breakpoints.up("md")]: {
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
    [theme.breakpoints.up("md")]: {
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
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const submit = (e) => {
    e.preventDefault();
    // window.location.href = "/search";
    // <Link to="/search"></Link>;
  };
  console.log(submit);
  // console.log(text);
  const url = `${process.env.REACT_APP_SEARCH_URL}${text}&page=1&include_adult=false`;
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
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
          style={{
            backgroundColor: "transparent",
            // backdropFilter: "blur(7px)",
          }}
          elevation={0}
        >
          <Toolbar>
            <Hidden lgUp>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === "ltr" ? (
                    <ChevronLeftIcon style={{ color: "white" }} />
                  ) : (
                    <ChevronRightIcon />
                  )}
                </IconButton>
              </div>
              <List>
                <ListItem
                  button
                  key="Trending"
                  onClick={() => (window.location.href = "/trending")}
                >
                  <ListItemText
                    classes={{ primary: classes.listItemText }}
                    primary="Trending"
                  />
                </ListItem>
                <ListItem
                  button
                  key="Popular"
                  onClick={() => (window.location.href = "/popular")}
                >
                  <ListItemText
                    classes={{ primary: classes.listItemText }}
                    primary="Popular"
                  />
                </ListItem>
                <ListItem
                  button
                  key="Upcoming"
                  onClick={() => (window.location.href = "/upcoming")}
                >
                  <ListItemText
                    classes={{ primary: classes.listItemText }}
                    primary="Upcoming"
                  />
                </ListItem>
                <ListItem
                  button
                  key="Top Rated"
                  onClick={() => (window.location.href = "/top")}
                >
                  <ListItemText
                    classes={{ primary: classes.listItemText }}
                    primary="Top Rated"
                  />
                </ListItem>
                <ListItem
                  button
                  key="Now Playing"
                  onClick={() => (window.location.href = "/nowplaying")}
                >
                  <ListItemText
                    classes={{ primary: classes.listItemText }}
                    primary="Now Playing"
                  />
                </ListItem>
              </List>
            </Drawer>
            <Typography
              className={classes.title}
              variant="h4"
              onClick={() => (window.location.href = "/")}
            >
              Movies
            </Typography>
            <Hidden mdDown>
              <Typography
                className={classes.title}
                variant="h4"
                onClick={() => (window.location.href = "/trending")}
              >
                Trending
              </Typography>
              <Typography
                className={classes.title}
                variant="h4"
                onClick={() => (window.location.href = "/popular")}
              >
                Popular
              </Typography>
              <Typography
                className={classes.title}
                variant="h4"
                onClick={() => (window.location.href = "/upcoming")}
              >
                Upcoming
              </Typography>
              <Typography
                className={classes.title}
                variant="h4"
                onClick={() => (window.location.href = "/top")}
              >
                Top Rated
              </Typography>
              <Typography
                className={classes.title}
                variant="h4"
                style={{ width: "30%" }}
                onClick={() => (window.location.href = "/nowplaying")}
              >
                Now Playing
              </Typography>
            </Hidden>
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
