import React, { useState,useEffect } from 'react'
import Youtube from 'react-youtube'
import {API_KEY,imageUrl} from '../../constants/constants'
import axios from '../../axios'
import './Banner.css'

const Banner = () => {
  const [movie, setMovie] = useState([])
  const [urlid,setUrlid]=useState('')
  useEffect(() => {
    axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then((response)=>{
      console.log(response.data.results[0])
      const randomIndex = Math.floor(Math.random() * response.data.results.length);
      const randomMovie = response.data.results[randomIndex];
      setMovie(randomMovie)
    });
  }, []);
  const opts = {
    height: '250',
    width: '350',
    
    playerVars: {
      
      autoplay: 1,
    },
  };
  const handleMovie=(id)=>{
    console.log(id)
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{
      if(response.data.results.length!==0){
      setUrlid(response.data.results[0])
      }
    })
  }
  
  return (
    <div style={{backgroundImage:`url(${movie?imageUrl+movie.backdrop_path:""})`}} className='banner'>
     
        <div className='content'>
            <h1 className='title'>{movie?movie.title:""}</h1>
            <div className='banner-buttons'>
                <button className='button' onClick={()=>handleMovie(movie.id)} >play</button>
                <button className='button'>My list</button>
            </div>
            {urlid && <Youtube opts={opts} videoId={urlid.key} />}
            <h1 className='discription'>{movie?movie.overview:""}</h1>
        </div>
        <div className='fade-bottom'></div>
    </div>
  )
}

export default Banner