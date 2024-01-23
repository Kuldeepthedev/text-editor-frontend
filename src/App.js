
import './App.css';

import Home from './pages/Home';
import TextEditor from './pages/TextEditor';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UseLogin from './pages/UseLogin';
import UserRagis from './pages/UserRagis';
import Pravitecom from './components/PrivetComponent';

function App() {
  return (
   <>
    <BrowserRouter>
     <Routes>
     <Route element={<Pravitecom/>}>
      <Route path='/files/:id' element={<TextEditor/>}/>
      <Route path='/files' element={<Home/>}/>
      </Route>
      <Route path='/' element={<UseLogin/>}/>
      <Route path='/ragister' element={<UserRagis/>}/>


     </Routes>
    </BrowserRouter>
     
   </>
  );
}

export default App;
