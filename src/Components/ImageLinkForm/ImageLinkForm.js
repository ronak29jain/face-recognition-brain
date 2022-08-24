import React, { useState } from 'react'
import './ImageLinkForm.css'

function ImageLinkForm() {
  
  const [imgurl, setImgurl] = useState('')
  
  const detectface = () => {
    console.log(imgurl)
    console.log('click')
    // console.log('1a4df659bc044d49a9b4694f10841250')
    // app.models.predict("1a4df659bc044d49a9b4694f10841250","https://samples.clarifai.com/face-det.jpg").then(
    //   funtion(response) {
    //     console.log(response);
    //   },
    //   function(err){
    //     console.log("face detection error:....", err)
    //   }
    // );
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