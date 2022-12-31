import React, { useState } from 'react'

function Register({ changeRoute }) {
  
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const registerUser = () => {
    setError('')
    const credentials = {
      email: email,
      name: name,
      password: password
    }

    fetch('http://13.231.132.155/api/face-recognition-brain-api/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })
      .then(response => response.json())
      .then(user => {
        if (user?.email === email) {
          changeRoute('home', user)
        } else {
          setError(user)
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
                <legend className="f1 fw6 ph0 mh0">Register</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                  <input 
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                    type="text" 
                    name="name"  
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
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
                  />
                </div>
                <div className="mv3 mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                  <input 
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                    type="password" 
                    name="password"  
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className='gold b'>
                  {error && error}
                </div>
              </fieldset>
              <div className="">
                <input onClick={registerUser} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"/>
              </div>
              <div className="lh-copy mt3">
              </div>
            </div>
          {/* </form> */}
        </main>
      </article>
    </div>
  )
}

export default Register