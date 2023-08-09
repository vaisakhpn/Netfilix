import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Pages/Home';
import SignIn from './Pages/SignIn';
import Createpage from './Pages/Create';
import { useContext, useEffect } from 'react';
import { AuthContext, FirebaseContext } from './Store/FirbaseContext';
import FavouriteList from './Pages/FavouriteList';


function App() {
  const {setUser}=useContext(AuthContext)
  const {firebase}=useContext(FirebaseContext)
  useEffect(()=>{
    firebase.auth().onAuthStateChanged((user)=>{
      setUser(user)
    })
  })
  return(
  <div className='App'>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<Createpage/>}/>
        <Route path='/favourite' element={<FavouriteList/>}/>
      </Routes>
    </Router>
  </div>
  )
  
}

export default App;
