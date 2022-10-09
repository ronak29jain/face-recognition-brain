import React from 'react'
import './FaceRecognition.css'

function FaceRecognition({image, box}) {
  return (
    <div className='center ma' >
      {
        image 
          ? <div className='absolute mt2'>
              <img id='input_image' src={image} alt="face-detetcition" height="300px" />
              <div className='bounding-box' style={{top: box.topRow, bottom: box.bottomRow, left: box.leftCol ,right: box.rightCol}} ></div>
            </div>
          : null
      }
    </div>
  )
}

export default FaceRecognition