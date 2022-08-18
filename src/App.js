import './App.css';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
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
  return (
    <div className="App">
      {/* <Particles /> */}
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      <FaceRecognition />
    </div>
  );
}

export default App;
