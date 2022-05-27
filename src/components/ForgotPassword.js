import React, { useRef, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"

export default function ForgotPassword() {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, seterror] = useState("")
  const [message, setmessage] = useState("")
  const [loading, setloading] = useState(false)

  async function submitHandle(e) {
    e.preventDefault()

    try {
      setmessage("")
      seterror("")
      setloading(true)
      await resetPassword(emailRef.current.value)
      setmessage("Check your inbox for instructions to reset password")
    } catch {
      seterror("Failed to reset password")
    }

    setloading(false)
  }

  return (
<div>
    <h2>Reset Password</h2>
    {error && <div class="alert alert-danger" role="alert">{error}</div>}
    {message && <div class="alert alert-success" role="alert">{message}</div>}
    <form onSubmit={submitHandle}>
    <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" ref={emailRef} id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <button disabled={loading} type="submit" className="btn btn-primary">Reset Password</button>
  </form>
  <div className="w-100 text-center mt-3">
            <Link to="/login">Login</Link>
          </div>
  <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
</div>
  )
}