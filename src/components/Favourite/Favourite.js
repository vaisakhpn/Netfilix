import React, { useContext, useEffect,useState } from 'react'
import Style from './Favourite.module.css'
import { imageUrl } from '../../constants/constants'
import { Container,Row } from 'react-bootstrap'
import { FirebaseContext } from '../../Store/FirbaseContext'
import { useFavoriteContext } from '../../Store/FavouriteContext'


const Favourite = () => {
    const {firebase}=useContext(FirebaseContext)
    const {favouriteData,setFavouriteData}=useFavoriteContext()
  
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
    }, []);
  return (
    
    <Container fluid className={Style.container}>
        <Row>
        <div className={Style.row}>
        <h2 className={Style.h2}>Favourite</h2>
        {favouriteData.map((data) => (
          <div className={Style.posterContainer}>
          <div className={Style.posters}>
         
              <div key={data.id}>
              
          
                </div>
                <img src={`${imageUrl+data.backdropPath}`}  className={Style.poster}  alt={data.title}/> 
              
            
            </div>  
        </div>
        ))}
        </div>
        </Row>
    </Container>
    
  )
}

export default Favourite