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

  const initialState = {
    route: 'signin',
    isSignedIn: false,
    input: '',
    image: '',
    facebox: '',
    user: {
      "id": '',
      "email": '',
      "name": '',
      "entries": '',
      "joined": new Date()
    }
  }
  
  // Seting Routes
  const [route, setRoute] = useState(initialState.route)
  const [isSignedIn, setIsSignedIn] = useState(initialState.isSignedIn)
  
  
  // Input setting
  const [input, setInput] = useState(initialState.input)
  const [image, setImage] = useState(initialState.image)
  const [faceBox, setFaceBox] = useState(initialState.facebox)
  const [user, setUser] = useState(initialState.user)
  
  const changeRoute = (route, data) => {
    if (route === 'signin' & isSignedIn===true) {
      setUser(initialState.user)
      setInput(initialState.input)
      setImage(initialState.image)
      setIsSignedIn(initialState.isSignedIn)
    }
    if (route === 'home') {
      setUser(data);
      setIsSignedIn(true);
    }
    setRoute(route)
  }

  const onInputChange = (event) => {
    setInput(event.target.value)
  }

  const onSubmit = () => {
    setImage(input)
    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": process.env.REACT_APP_CLARIFAI_USER_ID,
        "app_id": process.env.REACT_APP_CLARIFAI_APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": input
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
        .then(result => {
          if(result) {
            displayFaceBox(calculateFaceLocation(result))
            fetch('http://localhost:3000/image', {
              method: 'Put',
              headers: {
                'Content-Type':'application/json'
              },
              body: JSON.stringify({
                id: user.id
              })
            })
            .then(response => response.json())
            .then(countData => {
              setUser({
                ...user,
                entries: countData
              })
            })
            .catch(err => console.log('error in updating entires'))
          }
        })
        .catch(err => console.log('clarify error'));
      
  }

  const calculateFaceLocation = (result) => {
    const face = result.outputs[0].data.regions[0].region_info.bounding_box
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
  }

  return (
    <div className="App">
      {/* <Particles /> */}
      <Navigation changeRoute={changeRoute} isSignedIn={isSignedIn} />
      {
        route === 'home'
          ? <div className="home">
            <Logo />
            <Rank user={user} />
            <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} />
            <FaceRecognition image={image} box={faceBox} />
          </div>
          : (
            route === 'signin'
              ? <Signin changeRoute={changeRoute}/>
              : <Register changeRoute={changeRoute} />
          )
      }
    </div>
  );
}

export default App;
