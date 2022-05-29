import React from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import Dashboard from "./Dashboard";
import { userInputs } from "../Formsource";

export default function RedirectRoute() {
  const { currentUser } = useAuth()
    return currentUser ? <Dashboard inputs={userInputs} /> : <Navigate to="/login" />;
  
}