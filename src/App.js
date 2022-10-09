import './App.css';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/SignIn/Signin';
import Register from './components/Register/Register';
import { useState } from 'react';

function App() {
  
  // Seting Routes
  const [route, setRoute] = useState('signin')
  const [isSignedIn, setIsSignedIn] = useState(false)

  
  const checkuser = () => {
    setRoute('home')
    setIsSignedIn('true');
  }
  
  const registeruser = () => {
    setRoute('signin')
  }
  
  const changeroute = (route) => {
    setRoute(route)
    if (route === 'signin') {
      setIsSignedIn(false)
    }
  }
  
  // Input setting
  const [input, setInput] = useState('')
  const [image, setImage] = useState('')
  const [faceBox, setFaceBox] = useState('')

  const onInputChange = (event) => {
    console.log('onInputChange: ',event.target.value)
    setInput(event.target.value)
  }

  const onSubmit = () => {
    setImage(input)
    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": "ronak29jain",
        "app_id": "face-recognition-brain"
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": image
                  }
              }
          }
      ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Key ${process.env.REACT_APP_CLARIFAI_API_KEY}`
        },
        body: raw
    };

    fetch(`https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`, requestOptions)
        .then(response => response.json())
        .then(result => displayFaceBox(calculateFaceLocation(result)))
        .catch(error => console.log('clarify error', error));
      
  }

  const calculateFaceLocation = (result) => {
    const face = result.outputs[0].data.regions[0].region_info.bounding_box
    console.log("result: ", result)
    console.log("face: ", face)
    const image = document.getElementById('input_image')
    const width = Number(image.width)
    const height = Number(image.height)
    return{
      leftCol: face.left_col * width,
      topRow: face.top_row * height,
      rightCol: width - (face.right_col * width),
      bottomRow: height - (face.bottom_row * height)
    }
  }

  const displayFaceBox = (box) => {
    setFaceBox(box)
    console.log(faceBox)
  }

  return (
    <div className="App">
      {/* <Particles /> */}
      <Navigation changeroute={changeroute} isSignedIn={isSignedIn}/>
      {
        route === 'home'
          ? <div className="home">
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} />
            <FaceRecognition image={image} box={faceBox} />
          </div>
          : (
            route === 'signin'
              ? <Signin checkuser={checkuser} changeroute={changeroute}/>
              : <Register registeruser={registeruser} />
          )
      }
    </div>
  );
}

export default App;
