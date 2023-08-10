import { useEffect,useState,useContext } from 'react'
import Youtube from  'react-youtube'
import { Container,Row } from 'react-bootstrap'
import { API_KEY, imageUrl} from '../../constants/constants'
import './RowPost.css'
import axios from '../../axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHeart} from '@fortawesome/free-solid-svg-icons'
import { FirebaseContext } from '../../Store/FirbaseContext'
import { AuthContext } from '../../Store/FirbaseContext'
import { useFavoriteContext } from '../../Store/FavouriteContext'

const RowPost = (props) => {
  const {favouriteData,setFavouriteData}=useFavoriteContext()
  const {firebase}=useContext(FirebaseContext)
  const {user}=useContext(AuthContext)
  const[movie,setMovie]=useState([])
  const[urlid,setUrlId]=useState('')
  const [showVideo,setShowVideo]=useState(false)
  useEffect(() => {
  axios.get(props.url).then((response)=>{
    console.log(response.data)
    setMovie(response.data.results)
    setShowVideo(true)
  })
  }, []);
  useEffect(()=>{
    document.body.addEventListener('click',handleDoumentClick)
    return()=>{
      document.body.removeEventListener('click',handleDoumentClick)
    }
  })
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      controls:0,
      autoplay: 1,
    },
  };
  const handleMovie=(id)=>{
    console.log(id)
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{
      if(response.data.results.length!==0){
      setUrlId(response.data.results[0])
      setShowVideo(true);
      }
    })
  }
  const handleDoumentClick=()=>{
    setUrlId('')
    setShowVideo(false);
  };
  const handleVideoClick = (event) => {
  
    event.stopPropagation();
  };

  const favouriteHandler=(id)=>{
    
    console.log(id)
    const selectedMovie = movie.find((obj) => obj.id === id);

    if (selectedMovie && user) {
      const isAlreadyFavorited = favouriteData.some((data) => data.id === selectedMovie.id);
    
      if (isAlreadyFavorited) {
        alert('Movie is already in your favorites.');
        return;
      }
      const firestore = firebase.firestore();
      firestore.collection('posterdata').add({
        id: selectedMovie.id,
        title: selectedMovie.title, 
        posterPath: selectedMovie.poster_path,
        backdropPath:selectedMovie.backdrop_path,
        userId: user.uid,
        createdAt: new Date().toDateString(),
      }).then(() => {
        setFavouriteData((prevFavouriteData) => [...prevFavouriteData, selectedMovie]);
        alert('Added to favourite')
        console.log('Poster data added to Firestore.');
      }).catch((error) => {
        console.error('Error adding poster data:', error);
      })
    }

  }
  return (
    <Container fluid>
      <Row>
    <div className='row'>
        <h2>{props.title}</h2>
        <div className='posters'>
       
          {movie.map((obj)=>
          <div className='poster-container'>
          <div className="favorite">
          {user &&<FontAwesomeIcon onClick={()=>favouriteHandler(obj.id)} className='fa-lg fa-regular' icon={faHeart} /> }    
          </div>
          <img onClick={()=>handleMovie(obj.id)} className={props.isSmall?'smallPoster':'poster'} src={`${imageUrl+obj.backdrop_path}`} alt='poster'/>
          
          </div>
           )}  
        </div>
       {showVideo && urlid &&(
        <div onClick={handleVideoClick}> <Youtube opts={opts} videoId={urlid.key} /></div>)}
    </div>
    </Row>
    </Container>
  )
}

export default RowPost