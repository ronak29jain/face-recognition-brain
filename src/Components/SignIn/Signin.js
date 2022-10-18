import React, { useState } from 'react'

function Signin({ changeRoute }) {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const checkUser = () => {
    setError('')
    const credentials = {
      email: email,
      password: password
    }

    fetch('https://floating-forest-21789.herokuapp.com/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })
      .then(response => response.json())
      .then( data => {
        if (data?.email === email) {
          changeRoute('home', data)
        }
        else {
          setError(data)
        }
      })
      .catch(console.log())
  }
  
  return (
    <div>
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          {/* <form action='' method="post"> */}
            <div className="measure">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                  <input 
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                    type="email" 
                    name="email-address"  
                    id="email-address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                    required
                    // autoComplete='off'
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                  <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                    type="password" 
                    name="password"  
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className='white'>
                  {error && error}
                </div>
              </fieldset>
              <div className="">
                <input onClick={checkUser} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
              </div>
              <div className="lh-copy mt3">
                <a onClick={() => changeRoute('register')} href="#0" className="f6 link dim black db">Register</a>
              </div>
            </div>
          {/* </form> */}
        </main>
      </article>
    </div>
  )
}

export default Signin