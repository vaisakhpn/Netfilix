import React, { useContext, useEffect,useState } from 'react'
import Style from './Favourite.module.css'
import { imageUrl } from '../../constants/constants'
import { Container,Row } from 'react-bootstrap'
import { FirebaseContext } from '../../Store/FirbaseContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons'

const Favourite = () => {
    const {firebase}=useContext(FirebaseContext)
    const [favouriteData, setFavouriteData] = useState([]);
  
    useEffect(() => {
      const fetchFavouriteData = async () => {
        try {
            if (firebase.auth().currentUser) {
                const user = firebase.auth().currentUser;
          const response = await firebase.firestore().collection('posterdata').where('userId','==',user.uid).get();
          const fetchedData = response.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setFavouriteData(fetchedData);
            }
        } catch (error) {
          console.error('Error fetching favourite data:', error);
        }
      };
  
      fetchFavouriteData();
    }, [firebase]);
    const deleteHandler= async (id) => {
        try {
          await firebase.firestore().collection('posterdata').doc(id).delete();
          setFavouriteData((prevData) =>
            prevData.filter((data) => data.id !== id)
          );
        } catch (error) {
          console.error('Error deleting poster:', error);
        }
      };
  return (
    
    <Container fluid className={Style.container}>
        <Row>
        <div className={Style.row}>
        <h2 className={Style.h2}>Favourite</h2>
        {favouriteData.map((data) => (
          <div className={Style.posterContainer}>
          <div className={Style.posters}>
         
              <div key={data.id}>
              <div className={Style.delete}>
            <FontAwesomeIcon  className='fa-lg fa-regular' onClick={()=>deleteHandler(data.id)} icon={faTrash} />   
                </div>
                <img src={`${imageUrl+data.backdropPath}`}  className={Style.poster}  alt={data.title}/> 
              </div>
            
            </div>  
        </div>
        ))}
        </div>
        </Row>
    </Container>
    
  )
}

export default Favourite