import React, { useState, useEffect } from "react"
import { doc, serverTimestamp, setDoc } from "firebase/firestore"
import { db, storage } from "../firebase"
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import "./dashboard.css"


export default function Dashboard() {
  const [file, setFile] = useState("")
  const [data, setData] = useState({})
  const [per, setPerc] = useState(null);
  const navigate = useNavigate()


  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      console.log(name);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleInput = (e)=>{
    const id = e.target.id;
    const value = e.target.value;
    
    setData({ ...data, [id]: value });
  }
  const { currentUser } = useAuth()
  
  const handleAdd = async (e)=>{
    e.preventDefault()
    try{
      await setDoc(doc(db, "users", currentUser.uid), {
      ...data,
      timeStamp: serverTimestamp(),
    })
    navigate('/user')
  }catch(err){
    console.log(err)
  }
  }
  
  return (
    <>
    <h1>Update Your Profile Here</h1>
    <div className="dashboard">
        <div className="bottom">
            <form onSubmit={handleAdd}>
            <div className="profilePicUpdate">
            <img
              src={
                file
                ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt=""
                />
          </div>
              <div className="formInput">
                <label htmlFor="file">
                  <h4>Upload Image</h4>
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <div className="updateName input-group mb-3">
              <input onChange={handleInput} id="displayName" type="text" className="form-control" placeholder="Enter Your Name" aria-label="Your Name"/>
              </div>
              <div className="dbtn">
              <button disabled={per !== null && per < 100} type="submit" className="btn btn-warning">Update your profile :)</button>
              </div>
            </form>
        </div>
        {/* <User/> */}
    </div>
    </>
  )
}