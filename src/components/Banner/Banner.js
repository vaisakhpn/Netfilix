import React from 'react'
import './Banner.css'
const Banner = () => {
  return (
    <div className='banner'>
        <div className='content'>
            <h1 className='title'>Movie Name</h1>
            <div className='banner-buttons'>
                <button className='button'> play</button>
                <button className='button'>My list</button>
            </div>
            <h1 className='discription'>Placeholder Image Generators. A picture's worth a thousand words, so here's 21K worth of placeholder image generators to use in your mockups and designs.</h1>
        </div>
        <div className='fade-bottom'></div>
    </div>
  )
}

export default Banner