import React from 'react'
import './Navigation.css'

function Navigation({changeRoute, isSignedIn}) {
  if (isSignedIn) {
    return (
      <nav className='nav'>
        <p onClick={() => changeRoute('signin')} className='f3 pa3 link dim black underline pointer'>Sign Out</p>
      </nav>
    );
  } else {
    return (
      <nav className='nav'>
        <p onClick={() => changeRoute('signin')} className='f3 pa3 link dim black underline pointer'>Sign In</p>
        <p onClick={() => changeRoute('register')} className='f3 pa3 link dim black underline pointer'>Register</p>
      </nav>
    );
  }
}

export default Navigation