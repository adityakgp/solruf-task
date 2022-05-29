import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { db } from '../firebase';


function Try(){
    const { currentUser } = useAuth()
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = async()=>{ await getDoc(docRef); }
if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}
return(
    <div>

    </div>
)
}

export default Try