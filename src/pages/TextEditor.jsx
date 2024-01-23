import React, { useEffect, useState } from 'react';
import Quill from 'quill';
import io from 'socket.io-client';
import 'quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ 'header': 1 }, { 'header': 2 }],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'script': 'sub' }, { 'script': 'super' }],
  [{ 'indent': '-1' }, { 'indent': '+1' }],
  [{ 'direction': 'rtl' }],
  [{ 'size': ['small', false, 'large', 'huge'] }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'color': [] }, { 'background': [] }],
  [{ 'font': [] }],
  [{ 'align': [] }],
  ['clean']
];


function TextEditor() {
  const [quill, setQuill] = useState(null);
  const [socketServer, setSocketServer] = useState(null);
 
  const { id } = useParams(); 
 
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  };

  useEffect(() => {
    const editorQuill = new Quill('#fileEditor', {
      theme: 'snow',
      modules: {
        toolbar: toolbarOptions,
      },
    });

    setQuill(editorQuill);
  }, []);

  useEffect(() => {
    const Io = io('https://text-editor-s5g9.onrender.com');
    setSocketServer(Io);
    return () => {
      Io.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socketServer == null || quill == null) return;

    const handleChange = (delta, _, source) => {
      if (source === 'user') {
        socketServer.emit('text-change', delta);
      }
    };

    quill.on('text-change', handleChange);

    return () => {
      quill.off('text-change', handleChange);
    };
  }, [socketServer, quill]);

  useEffect(() => {
    if (socketServer == null || quill == null) return;

    const handleChangedText = (delta) => {
      quill.updateContents(delta);
    };

    socketServer.on('changed-text', handleChangedText);

    return () => {
      socketServer.off('changed-text', handleChangedText);
    };
  }, [socketServer, quill]);

  useEffect(() => {
    const apiUrl = `https://text-editor-s5g9.onrender.com/api/files/${id}`;
    const quilldata = async () => {
      try {
        const response = await axios.get(apiUrl, config);
        const Content = response.data.document.content;

        if (quill) {
          
          quill.setContents(Content);
        }
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };

    quilldata();
  }, [quill, id, config]);

  useEffect(() => {
    const apiUrl = `https://text-editor-s5g9.onrender.com/api/updatefile/${id}`;
    
    const autoSave = setInterval(async () => {
      try {
        const content = quill.getContents();
        console.log(content)
        await axios.post(apiUrl, { content }, config);
      } catch (error) {
        console.error('Error auto-saving content:', error);
      }
    }, 10000);

    return () => clearInterval(autoSave);
  }, [quill, id, config]);

  return (
    <>
      <div className="Editor" id="fileEditor" />
    </>
  );
}

export default TextEditor;
