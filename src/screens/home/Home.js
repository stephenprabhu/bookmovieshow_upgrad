import React from 'react'
import Header from '../../common/header/Header'
import MoviePoster from '../../Components/MoviePoster'
import './Home.css'

//HOME PAGE POSTERS AND FORM IS HERE

const Home = (props) => {
    return (
      <div>
        <Header />
        <div className='heading'> Upcoming Movies </div>
        <div className='Movies-Poster-Displayed'>
        <MoviePoster/>
        </div>
      
      </div>
    )
}

export default Home