import { AuthProvider } from '../contexts/AuthContext';
import SignUp from './SignUp';
import * as React from "react";
import { Routes, Route} from "react-router-dom";
import Login from './Login';
import RedirectRoute from './RedirectRoute';
import ForgotPassword from './ForgotPassword';
import User from './User';

function App() {
  return (
    <div>
      <AuthProvider>
      <Routes>
        <Route exact path="/" element={<RedirectRoute/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/forgotpassword" element={<ForgotPassword/>} />
        <Route exact path="/user" element={<User/>} />
      </Routes>
      </AuthProvider>
      
    </div>
  );
}

export default App;
