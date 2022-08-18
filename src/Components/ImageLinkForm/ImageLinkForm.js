import React, { useState } from 'react'
import './ImageLinkForm.css'

function ImageLinkForm() {
  
  const [imgurl, setImgurl] = useState('')
  
  const detectface = () => {
    console.log(imgurl)
    console.log('click')
  }

  return (
    <div>
      <p className='f3 center'>{'This small brain will detect faces in your pictures. Give it a try'}</p>
      <div className="center">
        <div className="pa4 br3 shadow-5 form center">
          <input value={imgurl} onChange={(e) => setImgurl(e.target.value)} className='f4 pa2 w-70 center' type="text" />
          <button onClick={detectface} className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'>Detect</button>
        </div>
      </div>
    </div>
  )
}

export default ImageLinkForm