import React, {useRef, useState} from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from "react-router-dom"

function SignUp() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {signup} = useAuth()

    const [error, seterror] = useState('')
    const [loading, setloading] = useState(false)
    const navigate = useNavigate()

    async function submitHandle (e){

        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value){
            return seterror('Passwords do not match')
        }
        try{
            seterror('')
            setloading(true)
            await signup(emailRef.current.value, passwordRef.current.value)  
            navigate('/')
        }catch{
            seterror('Failed to create an account')
        }
            setloading(false)
    }

  return (
    <>
      <div className="card ">
          <h2>Sign Up</h2>
          {error && <div class="alert alert-danger" role="alert">{error}</div>}
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
  <div className="mb-3">
    <label for="exampleInputPassword2" className="form-label">Confirm Password</label>
    <input type="password" ref={passwordConfirmRef} className="form-control" id="exampleInputPassword2"/>
  </div>
  <button disabled={loading} type="submit" className="btn btn-primary">Sign Up</button>
  </form>
      </div>
  <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
      </>
  )
}

export default SignUp