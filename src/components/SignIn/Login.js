import React, { Fragment, useContext, useEffect,useState } from 'react'
import NavBar from '../NavBar/NavBar'
import axios from '../../axios'
import Style from './Login.module.css'
import { Container,Row,Col,Card, Button } from 'react-bootstrap'
import {API_KEY,imageUrl} from '../../constants/constants'
import { Link, useNavigate } from 'react-router-dom'
import { FirebaseContext } from '../../Store/FirbaseContext'

const Login = () => {
  const navigate=useNavigate()
  const [movie, setMovie] = useState([]);
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [emailError,setEmailError]=useState('')
  const [passwordError, setPasswordError] = useState("");
  const{firebase}=useContext(FirebaseContext)
  useEffect(() => {
    axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then((response)=>{
      console.log(response.data.results[0])
      const randomIndex = Math.floor(Math.random() * response.data.results.length);
      const randomMovie = response.data.results[randomIndex];
      setMovie(randomMovie)
    });
  }, []);
  const validateForm = () => {
    let isValid = true;

    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email format");
      isValid = false;
    } else {
      setEmailError("");
    }
    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }
    return isValid;
  };
  const handleLogin=(e)=>{
    e.preventDefault()
    if(validateForm()){
      firebase.auth().signInWithEmailAndPassword(email, password).then(()=>{
        navigate('/')
      }).catch((error) => {
       alert(error.message)
      });
    }
  }
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
              autocomplete="off"
              value={email}
              placeholder='Email'
              name="email"
              onChange={(e)=>setEmail(e.target.value)}
            />
             {Boolean(emailError) && <div className={Style.errormessage}>{emailError}</div>}
            <br />
            
            <input
              className={Style.input}
              type="password"
              placeholder='Password'
              autocomplete="off"
              id="password"
              name="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
             {Boolean(passwordError) && <div className={Style.errormessage}>{passwordError}</div>}
            <br />
            <Button variant='danger' onClick={handleLogin} className={Style.uploadBtn}>Sign In</Button>
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