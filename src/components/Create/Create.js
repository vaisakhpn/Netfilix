import React, { Fragment, useContext, useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../../axios'
import Style from './Create.module.css'
import { Container,Row,Col,Card, Button } from 'react-bootstrap'
import {API_KEY,imageUrl} from '../../constants/constants'
import { Link } from 'react-router-dom'
import {FirebaseContext} from '../../Store/FirbaseContext'
const Create = () => {
  const navigate=useNavigate()
  const [movie, setMovie] = useState([]);
  const [name, setName] = useState("");
const [nameError, setNameError] = useState("");
const [email, setEmail] = useState("");
const [emailError, setEmailError] = useState("");
const [phone, setPhone] = useState("");
const [phoneError, setPhoneError] = useState("");
const [password, setPassword] = useState("");
const [passwordError, setPasswordError] = useState("");
const {firebase}=useContext(FirebaseContext)
  
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
  
    if (!name.trim()) {
      setNameError("Name is required");
      isValid = false;
    } else {
      setNameError("");
    }
  
    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email format");
      isValid = false;
    } else {
      setEmailError("");
    }
    if (!phone.trim()) {
      setPhoneError("Phone number is required");
      isValid = false;
    } else if (isNaN(phone)) {
      setPhoneError("Phone number should contain only numbers");
      isValid = false;
    } else {
      setPhoneError("");
    }
    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }
    return isValid;
  };


  const handleCreate=(e)=>{
    e.preventDefault();
    if (validateForm()) {
      firebase.auth().createUserWithEmailAndPassword(email, password).then((result)=>{
        result.user.updateProfile({displayName:name}).then(()=>{
        firebase.firestore().collection('users').add({
          id:result.user.uid,
          username:name,
          phone:phone     
        }).then(()=>{
        navigate('/')
        });
      });
      
    });
    } else {
      // Form is invalid, display error messages
      console.log("Form contains errors");
    }
  }

  return (
    <>
   
    <Container fluid>
      <Row>
        <Col>
        <div>
    <div style={{backgroundImage:`url(${movie?imageUrl+movie.backdrop_path:""})`}}  className={Style.banner}> 
        <div className={Style.fadebottom}></div>
    </div>
    <Card border="dark" className={Style.card}>
    <Card.Header className={Style.title}>Create One</Card.Header>
        <div >
            <form >
        <input
              className={Style.input}
              type="text"
              id="name"
              autocomplete="off"
              value={name}
              placeholder='Enter Name'
              name="name"
              onChange={(e)=>setName(e.target.value)}
            />
           
            <br />
            {Boolean (nameError) && <div className={Style.errormessage}>{nameError}</div>}
          
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
           
            <br />
            {Boolean(emailError) && <div className={Style.errormessage}>{emailError}</div>}
            <input
              className={Style.input}
              type="tel"
              placeholder='Phone number'
              id="phone"
              autocomplete="off"
              name="phone"
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
            />
            {Boolean(phoneError) && <div className={Style.errormessage}>{phoneError}</div>}
            <br />
            <input
              className={Style.input}
              type="password"
              placeholder='Password'
              id="password"
              autocomplete="off"
              name="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            {Boolean(passwordError) && <div className={Style.errormessage}>{passwordError}</div>}
            <br />
            <Button onClick={handleCreate}variant='danger' className={Style.uploadBtn}>Create</Button>
            </form>
        </div>
      <Link to='/signin' className={Style.link}>Sign In</Link>
      </Card>
      </div>
    </Col>
    </Row>
    </Container>
    </>
  )
}

export default Create