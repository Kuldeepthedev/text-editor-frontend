
import CreateFile from './CreateFile'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Sidenav() {

    const navigate = useNavigate()
    const userData = JSON.parse(localStorage.getItem("UserData") )
    
    console.log(userData)
    const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };

    const handlelogout = async() =>{
         localStorage.removeItem("UserData")
           navigate('/')
    }
  return (
    <>
       <div className="prfoile">
            
            <div className="profile_user">Welcome : {userData.name}</div>
            <div className="create_new_file"><CreateFile/></div>
            <div className="logout">
                 <button onClick={handlelogout}>Logout</button>
            </div>
       </div>
    </>
  )
}

export default Sidenav