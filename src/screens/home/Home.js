import React from 'react'
import Header from '../../common/header/Header'
import Card from '../../Components/Card'
import './Home.css'

//HOME PAGE POSTERS AND FORM IS HERE

const Home = (props) => {
  return (
    <div>
      <Header baseUrl={props.baseUrl} />
      <div className='heading'>
      Upcoming Movies
      </div>
      <div className='Movies-Poster-Displayed'>
      <Card/>
      </div>

    </div>
  )
}

export default Home