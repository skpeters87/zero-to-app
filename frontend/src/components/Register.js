/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useState } from 'react'
import { navigate } from '@reach/router'
import xss from 'xss'


const Register = ({ loggedIn, setLoggedIn }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  if (loggedIn) {
    navigate('/add-activity')
  }
  const doRegister = (e) => {
    e.preventDefault()
    if (!email) {
      alert('email missing')
      return
    }
    if (!password) {
      alert('password missing')
      return
    }

    if (password.length < 8) {
      alert('password length must be 8 characters or greater')
      return
    }

    if (!passwordConfirmation) {
      alert('password confirmation missing')
      return
    }

    if (password !== passwordConfirmation) {
      alert('password and confirm password must match')
      return
    }

    const santizedEmail = xss(email)
    const santizedPassword = xss(password)

    const url = 'http://localhost:3001/register'
    const options = {
      method: 'post',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: `email=${santizedEmail}&password=${santizedPassword}&passwordConfirmation=${passwordConfirmation}`,
      credentials: 'include'
    }

    fetch(url, options)
      .then(response => {
        if (!response.ok) {
          if (response.status === 401) {
            alert('error, please retry')
          }
        }
        return response
      })
      .then (response => response.json())
      .then(data => {
        if (data.success) {
          document.cookie = 'signed_in=true'
          setLoggedIn(true)
          navigate('/add-activity')
        }
      })

  }

  return (
    <form className="Register" css={css`
      display: grid;
      grid-template-rows: 350px 100px;
      max-width: 1000px;
      margin: 0 auto;

      @media (max-width: 800px){
        grid-template-rows: 80px 600px 500px;
      }
    `} onSubmit={doRegister}>
      <div css={css`
      display: grid;
      grid-template-rows: 100px 100px 100px;
      padding-top: 50px;

      @media (max-width: 800px){
        grid-template-columns: 100%;
      }
    `}>
      <div>
        <input type="email" css={css`
          padding: 20px;
          width: 400px;
          font-size: 1.5rem;

        `} onChange={event => setEmail(event.target.value)}
           placeholder="Enter your email" />
      </div>
      <div>
        <input type="password" css={css`
          padding: 20px;
          width: 400px;
          font-size: 1.5rem;
        `} onChange={event => setPassword(event.target.value)}
           placeholder="Password" />
      </div>
      <div>
        <input type="password" css={css`
          padding: 20px;
          width: 400px;
          font-size: 1.5rem;
        `} onChange={event => setPasswordConfirmation(event.target.value)}
           placeholder="Confirm Password" />
      </div>
      </div>
      <div>
          <button css={css`
              padding: 20px;
              background-color: #6e797a;
              font-size: 2rem;
              text-transform: uppercase;
              color: #black;
              border-color: transparent;
              border-radius: .5rem;
              float: left;
              margin-top: 40px;
            `} type='submit'>
              Register
          </button>
      </div>
    </form>
  )
}

export default Register
