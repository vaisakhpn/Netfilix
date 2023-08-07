import React, { Fragment } from 'react'
import {originals,action,romance,horror,comedy} from '../url'
import NavBar from '../components/NavBar/NavBar'
import Banner from '../components/Banner/Banner'
import RowPost from '../components/RowPost/RowPost'

const Home = () => {
  return (
    <Fragment>
         <NavBar/>
        <Banner/>
  <RowPost url={originals} title='Netflix Originals'/>
  <RowPost url={action} title='Action' isSmall/>
  <RowPost url={romance} title='Romance' isSmall/>
  <RowPost url={horror} title='Horror' isSmall/>
  <RowPost url={comedy} title='Comedy' isSmall/>
    </Fragment>
  )
}

export default Home