import {BrowserRouter, Routes, Route} from 'react-router-dom';
import DogWalk from './component/dogwalk.component';
import Login from './component/login.component';
import SignUp from './component/signup.component';


import './App.css';

function App() {
  
  return(
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DogWalk />}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
