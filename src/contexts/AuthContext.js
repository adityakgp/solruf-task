import React, {useContext, useState, useEffect} from 'react'
import { auth } from '../firebase'

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}) {

    const [currentUser, setcurrentUser] = useState()
    const [loading, setloading] = useState(true)


        function signup( email, password){
        return auth.createUserWithEmailAndPassword( email, password)
     }

        function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
     }

        function logout() {
        return auth.signOut()
      }
    
      function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
      }
    
      function updateName(name) {
        return currentUser.updateName(name)
      }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setcurrentUser(user)})
            setloading(false)
        
        return unsubscribe
    }, [])

    const value ={
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateName
    }
    
    
    return (
        <div>
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
    </div>
  )
}

// export async function upload(file, currentUser, setLoading) {
//     const fileRef = Ref(Storage, currentUser.uid + '.png');
  
//     setLoading(true);
    
//     const snapshot = await UploadBytes(fileRef, file);
//     const photoURL = await DownloadURL(fileRef);
  
//     UpdateProfile(currentUser, {photoURL});
    
//     setLoading(false);
//     alert("Uploaded file!");
//   }