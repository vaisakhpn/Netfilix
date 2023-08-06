import './App.css';
import {originals,action,romance,horror,comedy} from './url'
import NavBar from './components/NavBar/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Banner from './components/Banner/Banner';
import RowPost from './components/RowPost/RowPost';


function App() {
  return(
  <div className='App'>
  <NavBar/>
  <Banner/>
  <RowPost url={originals} title='Netflix Originals'/>
  <RowPost url={action} title='Action' isSmall/>
  <RowPost url={romance} title='Romance' isSmall/>
  <RowPost url={horror} title='Horror' isSmall/>
  <RowPost url={comedy} title='Comedy' isSmall/>
  </div>
  )
  
}

export default App;
