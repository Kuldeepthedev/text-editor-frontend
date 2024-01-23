import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../ragister.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function UserRagis() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confpassword, setConfpassword] = useState('');
    const [name, setName] = useState('');
    const [otp, setOtp] = useState('');
    const [resendDisabled, setResendDisabled] = useState(false);
    const [countdown, setCountdown] = useState(20);
    const [otpSent, setOtpSent] = useState(false);

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        if (password === confpassword) {
            try {
                const apiUrl = "https://text-editor-s5g9.onrender.com/api/userRegistration";
                const response = await axios.post(apiUrl,
                    {
                        email: email,
                        password: password,
                        name: name,
                        otp: otp,
                    },
                    config
                );
                if(response){
                    toast.success("Account created success",{theme:"colored"})
                    setTimeout(() => {
                        navigate("/")
                    }, 1000);
                }
            } catch (error) {
                toast.error(error.message, {theme:"colored"})
                console.error("Error during registration:", error);
            }
        }
    };

    const handleOtp = async (e) => {
        e.preventDefault();
        if (email.trim() !== '') {
            const apiUrl = "https://text-editor-s5g9.onrender.com/api/sendotp";
          const response =   await axios.post(apiUrl,
                {
                    email: email,
                    password: password
                },
                config);
                if(response){
                    toast.success("Otp sent success",{theme:"colored"})
                   
                }

            setResendDisabled(true);
            setCountdown(20);
            setOtpSent(true);
            const intervalId = setInterval(() => {
                setCountdown((prevCount) => prevCount - 1);
            }, 1000);

            setTimeout(() => {
                setResendDisabled(false);
                clearInterval(intervalId);
            }, 20000);
        }
    };

    const handleResendOtp = async () => {
        const apiUrl = "https://text-editor-s5g9.onrender.com/api/resendotp";
       const response =  await axios.post(apiUrl,
            {
                email: email,
                password: password
            },
            config);
            if(response){
                toast.success("Resend Otp success",{theme:"colored"})
              
            }
        setResendDisabled(true);
        setCountdown(60);
        const intervalId = setInterval(() => {
            setCountdown((prevCount) => prevCount - 1);
        }, 1000);

        setTimeout(() => {
            setResendDisabled(false);
            clearInterval(intervalId);
        }, 60000);
    };

    return (
        <>
            <div className="Ragis_form">
                <div className="login">
                    <h2>Sign Up</h2>

                    <input
                        type="email"
                        required
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <span>
                        {!otpSent ? (
                            <button onClick={handleOtp} disabled={resendDisabled} className='otp_button'>
                                Send Otp
                            </button>
                        ) : (
                            <p disabled={resendDisabled}>
                                Resend Otp in {countdown}s
                            </p>
                        )}
                        {otpSent ? (
                            <button onClick={handleResendOtp} disabled={resendDisabled} className='otp_button'>
                                Resend Otp
                            </button>) : ''
                        }
                    </span>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            required
                            placeholder="OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <input
                            type="text"
                            required
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="password"
                            required
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            required
                            placeholder="Confirm Password"
                            value={confpassword}
                            onChange={(e) => setConfpassword(e.target.value)}
                        />
                        <button type='submit'>Sign Up</button>
                    </form>
                    <button>
                        <Link to="/">Sign In</Link>
                    </button>
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
    );
}

export default UserRagis;
