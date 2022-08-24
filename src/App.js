import './App.css';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/SignIn/Signin';
import Register from './components/Register/Register';
import { useState } from 'react';
// import clarifai from 'clarifai';
// import Particles from 'react-particles-js';

// const particleOptions = {
//     polygon: {
//       enable: true,
//       type: 'inside',
//       move: {
//         radius: 10
//       },
//       url: 'path/to/svg.svg'
//     }
// }

function App() {
  
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

  return (
    <div className="App">
      {/* <Particles /> */}
      <Navigation changeroute={changeroute} isSignedIn={isSignedIn}/>
      {
        route === 'home'
          ? <div className="home">
            <Logo />
            <Rank />
            <ImageLinkForm />
            <FaceRecognition />
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
