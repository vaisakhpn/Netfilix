import './App.css';

import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Pages/Home';
import SignIn from './Pages/SignIn';


function App() {
  return(
  <div className='App'>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signin' element={<SignIn/>}/>
      </Routes>
    </Router>
  </div>
  )
  
}

export default App;
