import './App.css';
import NavBar from './components/NavBar/NavBar';
import Banner from './components/Banner/Banner';
import RowPost from './components/RowPost/RowPost';


function App() {
  return(
  <div className='App'>
  <NavBar/>
  <Banner/>
  <RowPost title='Netflix Originals'/>
  <RowPost title='Action' isSmall/>
  </div>
  )
  
}

export default App;
