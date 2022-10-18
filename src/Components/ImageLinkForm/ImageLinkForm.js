import React from 'react'
import './ImageLinkForm.css'

function ImageLinkForm({onInputChange, onSubmit}) {
  
  
  const detectface = () => {

    onSubmit();
    // console.log('click')
  }

  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      detectface();
    }
  }

  const selectText = () => {
    const input = document.getElementById('text-box');
    input.focus();
    input.select();
  }

  return (
    <div>
      <p className='f3 center'>{'This small brain will detect faces in your pictures. Give it a try'}</p>
      <div className="center">
        <div className="pa4 br3 shadow-5 form center">
          <input id='text-box' placeholder='Enter Image Url' onClick={selectText} onKeyPress={handleKeyPress} onChange={onInputChange} className='f4 pa2 w-70 center' type="text" />
          <button onClick={detectface} className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'>Detect</button>
        </div>
      </div>
    </div>
  )
}

export default ImageLinkForm