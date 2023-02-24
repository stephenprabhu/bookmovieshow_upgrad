import React, { useEffect, useState } from 'react'
import './Details.css';
import { GridListTile, GridListTileBar, Typography } from '@material-ui/core';
import { APIGetMovie } from '../../helpers/MovieAPIs';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';
import { StarBorder } from '@material-ui/icons';
import GridList from '@material-ui/core/GridList';
import Header from '../../common/header/Header'


const Details = (props) => {
	const [error, setError] = useState(false);
	const [movie, setMovie]= useState(null);
	const [rating, setRating]= useState(0);

	useEffect(()=> {
		//SEND REQUEST TO GET MOVIE WHEN PAGE LOADS
		getMovie();
	},[]);


	const getMovie = async() => {
		const res = await APIGetMovie(props.match.params.id);
		if(res.movie){
			setMovie(res.movie);
		}else{
			setError(res.error);
		}
	}

	const makeVideoId = (url) => {
		if(url){
			return url.split('?v=')[1];
		}
	}

	return (
		<div>
			<Header movieId={props.match.params.id} />
			<Link to="/" style={{textDecoration:"none"}}><Typography className="backHomeButton">{"< Back To Home"}</Typography></Link>
			{movie ? <div className='detailsContainer'>
				<div style={{width:"20%", padding:"10px"}}>
					<img src={movie.poster_url} width="95%" alt={movie.title} />
				</div>
				<div  style={{flex: 1, padding:"10px"}}>
					<Typography component="h2" variant='headline'>{movie.title}</Typography>
					<Typography><strong>Genres: </strong>{movie.genres.toString()}</Typography>
					<Typography><strong>Duration: </strong>{movie.duration}</Typography>
					<Typography><strong>Release Date: </strong>{new Date(movie.release_date).toDateString()}</Typography>
					<Typography><strong>Ratings: </strong>{movie.rating}</Typography>
					<Typography style={{marginTop:"16px"}}>
						<strong>Plot: </strong>(<a href={movie.wiki_url}>Wiki Link</a>) {movie.storyline}
					</Typography>
					<Typography style={{marginTop:"16px"}}>
						<strong>Trailer: </strong>
					</Typography>
					<YouTube
						videoId={makeVideoId(movie.trailer_url)}
					 />
				</div>
				<div style={{width:"20%", padding:"10px"}}>
					<Typography><strong>Rate this movie: </strong></Typography>
					{[...Array(5)].map((e,i)=> <StarBorder key={i} onClick={()=> setRating(i+1)} style={{color: i<rating ? "yellow":""}} />)}
					<Typography><strong>Artists: </strong></Typography>
					<GridList cols={2}>
						{movie.artists.map(artist => (
							<GridListTile key={artist.id}>
								<img src={artist.profile_url} alt={artist.first_name} />
								<GridListTileBar title={artist.first_name +" "+ artist.last_name}>
									
								</GridListTileBar>
							</GridListTile>
						))}
					</GridList>
				</div>
			</div>:""}

			{error ? <div style={{width:"100%", textAlign:"center"}}>
				<span style={{color:"red"}}>{error}</span>
			</div>:""}
			
		</div>
	)
}

export default Details