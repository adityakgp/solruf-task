import React, {useRef, useState} from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from "react-router-dom"

function Login() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const {login} = useAuth()
    const [error, seterror] = useState('')
    const [loading, setloading] = useState(false)
    const navigate = useNavigate()

    async function submitHandle (e){

        e.preventDefault()

        try{
            seterror('')
            setloading(true)
            await login(emailRef.current.value, passwordRef.current.value) 
            navigate('/user') 
        }catch{
            seterror('Failed to Log in')
        }
            setloading(false)
    }

  return (
    <>
     <div className="card">
          <h2>Log In</h2>
          {error && <div className="alert alert-danger" role="alert">{error}</div>}
      <form onSubmit={submitHandle}>
            <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" ref={emailRef} id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" ref={passwordRef} className="form-control" id="exampleInputPassword1"/>
  </div>
  <button disabled={loading} type="submit" className="btn btn-primary">Log In</button>
  <div className="w-100 text-center mt-3">
            <Link to="/forgotpassword">Forgot Password?</Link>
          </div>
  </form>
      </div>
  <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
      </>
  )
}

export default Login