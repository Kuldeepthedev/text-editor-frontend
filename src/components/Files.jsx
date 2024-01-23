import React, { useEffect, useState } from 'react';
import axios from 'axios';
import fileimage from '../images/file.png';
import { useNavigate } from 'react-router-dom';

function Files() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [password, setPassword] = useState();
  const [showPasswordbox, setShowPasswordbox] = useState(false);
  
  const navigate = useNavigate();
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  };

  const apiUrl = 'https://text-editor-s5g9.onrender.com/api/files';

  const handleFileClick = (file) => {
    setSelectedFile(file);
    setShowPasswordbox(true);
    
  };

  const handlePassword = async () => {
    try {
      const response = await axios.post(
        `https://text-editor-s5g9.onrender.com/api/openfiles/${selectedFile._id}`,
        { password},
        config
      );

      if (response.data.status) {
        navigate(`/files/${selectedFile._id}`)
      } 
    } catch (error) {
      console.error('Error checking password:', error);
    }
  };

  const handlePasswordbox = () => {
    setShowPasswordbox(false);
    setSelectedFile(null);
   
    
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl, config);
        setFiles(response.data.document);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [config]);

  return (
    <div>
      
      <div className="files_all">
      
        <ul>
          {files &&
            files.map((file) => (
              <li key={file._id}>
                <div
                  className="file_style"
                  onClick={() => handleFileClick(file)}
                >
                  <img src={fileimage} alt="" />
                  <p>{file.title}</p>
                </div>
              </li>
            ))}
        </ul>
      </div>

      {showPasswordbox && (
        <div className="open_file">
          <div className="file_model">
            <span className="close" onClick={handlePasswordbox}>x</span>
            <h2>Enter File Password</h2>
            <form onSubmit={(e)=>{
                e.preventDefault(); }}>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
           
            <button onClick={handlePassword}>Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Files;
