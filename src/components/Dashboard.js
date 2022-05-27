import React, { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
  const [error, seterror] = useState("")
  const { logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    seterror("")

    try {
      await logout()
      navigate("/login")
    } catch {
      seterror("Failed to log out")
    }
  }

  return (
    <div>
         <h2 className="text-center mb-4">Profile</h2>
         {error && <div className="alert alert-danger" role="alert">{error}</div>}
         <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThPIWNxqYlgwcPj7JZDM_5pS7nf-Gy9ySNmD4WOLHd_YGhEILVR-DqzJ6FIEdbMw-dxoY&usqp=CAU" alt="" />
         <h2>Name</h2>
         <div className="input-group mb-3">
        <input type="file" className="form-control" id="inputGroupFile02"/>
        <button type="submit" className="btn btn-primary">Update Profile Picture</button>
        </div>
        <div className="input-group mb-3">
  <input type="text" className="form-control" placeholder="Change username" aria-label="Change username" aria-describedby="button-addon2"/>
  <button className="btn btn-primary" type="submit" id="button-addon2">Update Name</button>
</div>
          <button onClick={handleLogout} type="submit" className="btn btn-primary">Log Out</button>

    </div>
  )
}