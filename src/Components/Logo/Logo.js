import React from 'react'
import './Logo.css'
import brain from './brain.png'
import Tilt from 'react-tilt'

function Logo() {
  return (
    <div className='logo ma4 mt0'>
      <Tilt className="Tilt br2 shadow-2" options={{ max : 50 }} style={{ height: 150, width: 150 }} >
        <div className="Tilt-inner pa3"> 
          <img src={brain} alt="logo" /> 
          {/* 👽  */}
        </div>
      </Tilt>
    </div>
  )
}

export default Logo