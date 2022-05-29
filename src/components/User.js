import React from 'react'
import {  useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import "./user.css"
import { Link, useNavigate } from "react-router-dom"

function User() {
    const [data, setdata] = useState({})
    const { currentUser } = useAuth()
    let list=[]
    const fetchData = async ()=>{
        try{
            const docRef = doc(db, 'users', currentUser.uid)
                getDoc(docRef)
                  .then(doc => {
                    setdata(doc.data())
                    list.push({...doc.data()})
                })
                console.log(list[0].displayName)

        }catch(err){
            console.log(err)
        }
    }
    fetchData()
  return (
    <>
        <div className='user'>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            <img src={data.img?data.img:""} alt="" />
            <h2>{data.displayName?data.displayName:"Upload your name"}</h2>
        </div>
        <h3>Update your<Link to='/'> profile</Link></h3>
    </>
  )
}

export default User