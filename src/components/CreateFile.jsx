import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateFile() {
    const [filetoggle, setFileToggle] = useState(false);
    const [filename, setFilename] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()
    const handleOpen = () => {
        setFileToggle(!filetoggle); 
    }

    const handleClose = () => {
        setFileToggle(!filetoggle); 
    }

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        
    };

    

    const apiUrl = "https://text-editor-s5g9.onrender.com/api/createfile";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(apiUrl, {
                title: filename,
                password: password
            },config);
            if (response) {
                console.log(response);
                navigate("/files")
            }
        } catch (error) {
            console.error("Error creating file:", error);
           
        } finally {
            setLoading(false);
            handleClose(); 
        }
    };

    return (
        <>   
                 {!filetoggle ? (
                <div onClick={handleOpen} className='create_btn'>
                    +
                </div>
            ) : (
                <div className="create-file">
                    <button className='close-tab' onClick={handleClose}>x</button>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder='Enter file name' onChange={(e) => setFilename(e.target.value)} />
                        <input type="password" placeholder='Enter file password' onChange={(e) => setPassword(e.target.value)} />
                        <button type='submit' disabled={loading}>
                            {loading ? 'Creating...' : 'Create file'}
                        </button>
                    </form>
                </div>
            )}
           </>
    );
}

export default CreateFile;
