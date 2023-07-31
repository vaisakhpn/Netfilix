import React, { useState,useEffect } from 'react'
import {API_KEY,imageUrl} from '../../constants/constants'
import axios from '../../axios'
import './Banner.css'

const Banner = () => {
  const [movie, setMovie] = useState()
  useEffect(() => {
    axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then((response)=>{
      console.log(response.data.results[0])
      const randomIndex = Math.floor(Math.random() * response.data.results.length);
      const randomMovie = response.data.results[randomIndex];
      setMovie(randomMovie)
    });
  }, []);
  
  return (
    <div style={{backgroundImage:`url(${movie?imageUrl+movie.backdrop_path:""})`}} className='banner'>
        <div className='content'>
            <h1 className='title'>{movie?movie.title:""}</h1>
            <div className='banner-buttons'>
                <button className='button'> play</button>
                <button className='button'>My list</button>
            </div>
            <h1 className='discription'>{movie?movie.overview:""}</h1>
        </div>
        <div className='fade-bottom'></div>
    </div>
  )
}

export default Banner