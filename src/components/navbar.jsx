import React from "react";
import {
  AppBar,
  Hidden,
  List,
  SwipeableDrawer,
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
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
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
    backgroundColor: "rgba(10, 8, 24, 0.7)",
    backdropFilter: "blur(3px)",
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
    fontSize: "20px",
    // display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  listItemText: {
    fontSize: "22px",
  },
  searches: {
    [theme.breakpoints.down("md")]: {
      marginLeft: theme.spacing(1),
      width: "95%",
      display: "flex",
      justifyContent: "flex-end",
    },
  },
  search: {
    // backdropFilter: "blur(7px)",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.45),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.35),
    },
    marginLeft: 0,
    // width: "50%",
    // [theme.breakpoints.down("lg")]: {
    //   marginLeft: theme.spacing(1),
    //   width: "0%",
    // },
    // [theme.breakpoints.up("md")]: {
    //   marginLeft: theme.spacing(1),
    //   width: "10%",
    // },
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(1),
      width: "40%",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 1),
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
    padding: theme.spacing(1, 0, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(3)}px)`,
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
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
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
    const [loading, setLoading] = useState(true);

  const getMovies = useCallback(async () => {
    const response = await fetch(url);
    const movies = await response.json();
    setMovies(movies.results);
    setLoading(false);
  }, [url]);

  useEffect(() => {
    getMovies();
  }, [url, getMovies]);
  console.log(movies);

  return (
     <>
      {loading ? (
        <div className="loader">
          <h1>Loading...</h1>
        </div>
      ) : (
    <>
      <div className={classes.root}>
        <AppBar
          position="absolute"
          style={{
            backgroundColor: "transparent",
            backdropFilter: "blur(5px)",
          }}
          elevation={0}
        >
          <Toolbar>
            <Hidden lgUp>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer("left", true)}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <SwipeableDrawer
              anchor="left"
              open={state["left"]}
              onClose={toggleDrawer("left", false)}
              onOpen={toggleDrawer("left", true)}
              className={classes.drawer}
              classes={{ paper: classes.drawerPaper }}
            >
              <div className={classes.drawerHeader}>
                <IconButton onClick={toggleDrawer("left", false)}>
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
                  key="Home"
                  onClick={() => (window.location.href = "/")}
                >
                  <ListItemText
                    classes={{ primary: classes.listItemText }}
                    primary="Home"
                  />
                </ListItem>
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
            </SwipeableDrawer>

            <Hidden mdDown>
              <Typography
                className={classes.title}
                variant="h4"
                onClick={() => (window.location.href = "/")}
              >
                Home
              </Typography>
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
                style={{ width: "50%" }}
                onClick={() => (window.location.href = "/nowplaying")}
              >
                Now Playing
              </Typography>
            </Hidden>
            <div className={classes.searches}>
              <div className={classes.search} search>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
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
      )};
      </>
  );
}
