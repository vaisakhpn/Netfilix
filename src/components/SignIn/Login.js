import React, { Fragment, useEffect,useState } from 'react'
import NavBar from '../NavBar/NavBar'
import axios from '../../axios'
import Style from './Login.module.css'
import { Container,Row,Col,Card, Button } from 'react-bootstrap'
import {API_KEY,imageUrl} from '../../constants/constants'
import { Link } from 'react-router-dom'
const Login = () => {
  const [movie, setMovie] = useState([]);
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  
  useEffect(() => {
    axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then((response)=>{
      console.log(response.data.results[0])
      const randomIndex = Math.floor(Math.random() * response.data.results.length);
      const randomMovie = response.data.results[randomIndex];
      setMovie(randomMovie)
    });
  }, []);
  return (
    <>
    <NavBar/>
    <Container fluid>
      <Row>
        <Col>
        <div>
    <div style={{backgroundImage:`url(${movie?imageUrl+movie.backdrop_path:""})`}}  className={Style.banner}> 
        <div className={Style.fadebottom}></div>
    </div>
    <Card border="dark" className={Style.card}>
    <Card.Header className={Style.title}>Sign In</Card.Header>
        <div >
          
            <input
              className={Style.input}
              type="email"
              id="email"
              value={email}
              placeholder='Email'
              name="email"
              onChange={(e)=>setEmail(e.target.value)}
            />
            <br />
            
            <input
              className={Style.input}
              type="password"
              placeholder='Password'
              id="password"
              name="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <br />
            <Button variant='danger' className={Style.uploadBtn}>Sign In</Button>
        </div>
      <Link to='/signup' className={Style.link}>Sign up</Link>
      </Card>
      </div>
    </Col>
    </Row>
    </Container>
    </>
  )
}

export default Login