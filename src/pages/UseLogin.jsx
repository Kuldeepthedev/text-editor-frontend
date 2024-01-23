import {useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UseLogin() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const apiUrl = "https://text-editor-s5g9.onrender.com/api/userLogin";
            const response = await axios.post(apiUrl,
                {
                    email: email,
                    password: password
                },
                { withCredentials: true },
                config
            );
            if (response) {
                
                toast.success("Login success" ,{theme: "colored",})
                const userData = JSON.stringify(response.data.userData)
                localStorage.setItem("UserData" ,userData)
                setTimeout(() => {
                    navigate("/files")
                }, 1000)

            }
        } catch (error) {
            toast.error("Invalid password or email", {theme: "colored",})
            console.error("Error during login:", error);
        }
    };

    return (
        <>
            <div className="login_form">
                <div className="login">
                    <h2>Sign In</h2>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            required
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            required
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Link to="resetpassword">Forgot Password</Link>

                        <button type='submit'>Sign In</button>
                    </form>
                    <button><Link to="/ragister">Sign Up</Link></button>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"

            />
            
            
        </>
    )
}

export default UseLogin;
