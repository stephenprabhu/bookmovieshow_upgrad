

import React, { useEffect,useState } from 'react';
import './Home.css';
import Header from '../../common/header/Header';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  upcomingMoviesHeading: {
    textAlign: 'center',
    background: '#ff9999',
    padding: '8px',
    fontSize: '1rem'
  },
  gridListUpcomingMovies: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    width: '100%'
  },
  gridListMain: {

    transform: 'translateZ(0)',
    cursor: 'pointer'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 240,
  },
  title: {
    color: theme.palette.primary.light,
  }
});


function Home(props) {
  const { baseUrl, classes } = props;
  const [movieName, setMovieName] = useState("");
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [releasedMovies, setReleasedMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [artists, setArtists] = useState([]);
  const [genresList, setGenresList] = useState([]);
  const [artistsList, setArtistsList] = useState([]);
  const [releaseDateStart, setReleaseDateStart] = useState("");
  const [releaseDateEnd, setReleaseDateEnd] = useState("");

  useEffect(() => {
    const setData = async () => {
      // Get upcoming movies
      const upcomingMoviesRequest = fetch(`${baseUrl}movies?status=PUBLISHED`);
      // Get released movies
      const releasedMoviesRequest = fetch(`${baseUrl}movies?status=RELEASED`);
      // Get genres
      const genresRequest = fetch(`${baseUrl}genres`);
      // Get artists
      const artistsRequest = fetch(`${baseUrl}artists`);
      const [
        upcomingMoviesResponse,
        releasedMoviesResponse,
        genresResponse,
        artistsResponse,
      ] = await Promise.all([
        upcomingMoviesRequest,
        releasedMoviesRequest,
        genresRequest,
        artistsRequest,
      ]);
      if (upcomingMoviesResponse.status === 200) {
        const upcomingMovies = await upcomingMoviesResponse.json();
        setUpcomingMovies(upcomingMovies.movies);
      }
      if (releasedMoviesResponse.status === 200) {
        const releasedMovies = await releasedMoviesResponse.json();
        setReleasedMovies(releasedMovies.movies);
      }
      if (genresResponse.status === 200) {
        const genres = await genresResponse.json();
        setGenresList(genres.genres);
      }
      if (artistsResponse.status === 200) {
        const artists = await artistsResponse.json();
        setArtistsList(artists.artists);
      }
    };
    setData();
  }, []);

  const movieNameChangeHandler = (event) => {
    setMovieName(event.target.value);
  };

  const genreSelectHandler = (event) => {
    setGenres(event.target.value);
  };

  const artistSelectHandler = (event) => {
    setArtists(event.target.value);
  };

  const releaseDateStartHandler = (event) => {
    setReleaseDateStart(event.target.value);
  };

  const releaseDateEndHandler = (event) => {
    setReleaseDateEnd(event.target.value);
  };

  const movieClickHandler = (movieId) => {
    props.history.push("/movie/" + movieId);
  };

  const filterApplyHandler = async () => {
    let queryString = "?status=RELEASED";
    if (movieName !== "") {
      queryString += "&title=" + movieName;
    }
    if (genres.length > 0) {
      queryString += "&genres=" + genres.toString();
    }
    if (artists.length > 0) {
      queryString += "&artists=" + artists.toString();
    }
    if (releaseDateStart !== "") {
      queryString += "&start_date=" + releaseDateStart;
    }
    if (releaseDateEnd !== "") {
      queryString += "&end_date=" + releaseDateEnd;
    }

    const response = await fetch(`${baseUrl}movies${encodeURI(queryString)}`);
    const data = await response.json();
    if (response.status === 200) {
      setReleasedMovies(data.movies);
    }
  };


    return (
      <div>
        <Header baseUrl={props.baseUrl} />
        <div className={classes.upcomingMoviesHeading}>
          <span> Upcoming Movies </span>
        </div>
        <GridList cols={5} className={classes.gridListUpcomingMovies}>
          {upcomingMovies.map(movie => (
            <GridListTile key={"upcoming" + movie.id}>
              <img src={movie.poster_url} alt={movie.title} />
              <GridListTileBar title={movie.title} />
            </GridListTile>
          ))}
        </GridList>
        <div className="flex-container">
          <div className="left">
            <GridList cellHeight={350} cols={4} className={classes.gridListMain}>
              {releasedMovies.map(movie => (
                <GridListTile onClick={() => movieClickHandler(movie.id)} className="marginMovie" key={"grid" + movie.id}>
                  <img src={movie.poster_url} alt={movie.title} />
                  <GridListTileBar
                    title={movie.title}
                    subtitle={<span>Release Date: {new Date(movie.release_date).toDateString()}</span>}
                  />
                </GridListTile>
              ))}
            </GridList>
          </div>
          <div className="right">
            <Card>
              <CardContent>
                <FormControl className={classes.formControl}>
                  <Typography className={classes.title} color="textSecondary">
                    FIND MOVIES BY:
                  </Typography>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="movieName"> Movie Name </InputLabel>
                  <Input id="movieName" onChange={movieNameChangeHandler} />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="select-multiple-checkbox"> Genre</InputLabel>
                  <Select
                    multiple
                    input={<Input id="select-multiple-checkbox" />}
                    renderValue={selected => selected.join(',')}
                    value={genres}
                    onChange={genreSelectHandler}>
                    <MenuItem value="0">None
                   </MenuItem>
                    {genresList.map(genre => (
                      <MenuItem key={"genre" + genre.id} value={genre.genre}>
                        <Checkbox checked={genres.indexOf(genre.genre) > - 1} />
                        <ListItemText primary={genre.genre} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="select-multiple-checkbox"> Artists</InputLabel>
                  <Select
                    multiple
                    input={<Input id="select-multiple-checkbox" />}
                    renderValue={selected => selected.join(',')}
                    value={artists}
                    onChange={artistSelectHandler}>
                    <MenuItem value="0">None
                   </MenuItem>
                    {artistsList.map(artist => (
                      <MenuItem key={"artist" + artist.id} value={artist.first_name + " " + artist.last_name}>
                        <Checkbox checked={artists.indexOf(artist.first_name + " " + artist.last_name) > - 1} />
                        <ListItemText primary={artist.first_name + " " + artist.last_name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <TextField
                    id="releaseDateStart"
                    label="Release Date Start"
                    type="date"
                    defaultValue=""
                    InputLabelProps={{ shrink: true }}
                    onChange={releaseDateStartHandler}
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <TextField
                    id="releaseDateEnd"
                    label="Release Date End"
                    type="date"
                    defaultValue=""
                    InputLabelProps={{ shrink: true }}
                    onChange={releaseDateEndHandler}
                  />
                </FormControl><br /><br />
                <FormControl className={classes.formControl}>
                  <Button onClick={() => filterApplyHandler()} variant="contained" color="primary">
                    APPLY
                    </Button>
                </FormControl>

              </CardContent>
            </Card>

          </div>
        </div>
      </div>

    );

                    }
export default withStyles(styles)(Home);



