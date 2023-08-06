import React, { useState,useEffect } from 'react'
import Youtube from 'react-youtube'
import { Container,Row,Col } from 'react-bootstrap'
import {API_KEY,imageUrl} from '../../constants/constants'
import axios from '../../axios'
import './Banner.css'


const Banner = () => {

  const [movie, setMovie] = useState([])
  const [urlid,setUrlid]=useState('')
  const [showVideo, setShowVideo] = useState(false);
  useEffect(() => {
    axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then((response)=>{
      console.log(response.data.results[0])
      const randomIndex = Math.floor(Math.random() * response.data.results.length);
      const randomMovie = response.data.results[randomIndex];
      setMovie(randomMovie)
    });
  }, []);
  useEffect(() => {
 
    document.body.addEventListener('click', handleDocumentClick);

   
    return () => {
      document.body.removeEventListener('click', handleDocumentClick);
    };
  }, []);
  const opts = {
    height: '250',
    width: '500',
    
    playerVars: {
      controls:0,
      autoplay: 1,
      
    },
  };
  const handleMovie=(id)=>{
    console.log(id)
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{
      if(response.data.results.length!==0){
      setUrlid(response.data.results[0])
      setShowVideo(true);
      }
    })
  }
  const handleDocumentClick = () => {
    
    setUrlid('');
    setShowVideo(false);
  };
  const handleVideoClick = (event) => {
  
    event.stopPropagation();
  };

  
  return (
    <Container fluid>
      <Row>
        <Col>
    <div style={{backgroundImage:`url(${movie?imageUrl+movie.backdrop_path:""})`}}  className='banner'>    
        <div className='content'>
            <h1 className='title'>{movie?movie.title:""}</h1>
            <div className='banner-buttons'>
                <button className='button' onClick={()=>handleMovie(movie.id)} >play</button>
                <button className='button'>My list</button>
            </div>
             
            {showVideo && urlid && (
            <div onClick={handleVideoClick} className='youtube-container'>
               <Youtube opts={opts} videoId={urlid.key} />
            </div>)}
           
        </div>
        <div className='fade-bottom'></div>
    </div>
    </Col>
    </Row>
    </Container>
  )
}

export default Banner