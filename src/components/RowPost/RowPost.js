import { useEffect,useState } from 'react' 
import {API_KEY, imageUrl} from '../../constants/constants'
import './RowPost.css'
import axios from '../../axios'

const RowPost = (props) => {
  const[movie,setMovie]=useState([])
  useEffect(() => {
  axios.get(`discover/tv?api_key=${API_KEY}&with_networks=213`).then((response)=>{
    console.log(response.data)
    setMovie(response.data.results)
  })
  }, [])
  

  return (
    <div className='row'>
        <h2>{props.title}</h2>
        <div className='posters'>
          {movie.map((obj)=>
          <img className={props.isSmall?'smallPoster':'poster'} src={`${imageUrl+obj.backdrop_path}`} alt='poster'/>
           )}  
        </div>
    </div>
  )
}

export default RowPost