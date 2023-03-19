import {BrowserRouter, Routes, Route} from 'react-router-dom';
import DogWalk from './component/dogwalk.component';
import Login from './component/login.component';
import SignUp from './component/signup.component';
import Adopt from './component/dogAdoption.component';
import CreateDog from './component/createDog.component';

//JWT imports
import Cookies from 'universal-cookie';
import jwt from 'jwt-decode';
import {useState, useEffect} from 'react';

import './App.css';

function App() {
  useEffect(() => {
    try {
      console.log(jwt(document.cookie));
      setUser(jwt(document.cookie));
    } catch (err) {
      console.log("User not logged in")
    }
  }, []);

  //Initialize cookies
  const cookies = new Cookies();

  //init user state
  const [user, setUser] = useState(null);

  const logout = () => {
    setUser(null);
    cookies.remove("jwt_authorization");
  }

  const login = (jwt_token) => {
    //Decode JWT token
    const decoded = jwt(jwt_token);

    //set user state
    setUser(decoded);

    //set Cookie
    cookies.set("jwt_authorization", jwt_token, {
      expires: new Date(decoded.exp * 1000),
    });

  }

  return(
    <>
      {user ? (
        <div>
          <h1>Welcome {user.Username}</h1>
          <button onClick={logout}>Logout</button>

          <BrowserRouter>
            <Routes>
              <Route path='/' element={<DogWalk />}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/signup' element={<SignUp/>}/>
              <Route path='/adopt' element={<Adopt/>}/>
              <Route path='/addDog' element={<CreateDog/>}/>
            </Routes>
          </BrowserRouter>
        </div>
      ) : (
        <div>
          <h1>Please Login to Continue...</h1>
          <button onClick={() => login(
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJEYXRhRG9nIiwiaWF0IjoxNjc5MTAyMjc0LCJleHAiOjE2Nzk3MDcwNzQsImF1ZCI6Ind3dy5kYXRhZG9nLmNvbSIsInN1YiI6ImRhdGFkb2dAaWNsb3VkLmNvbSIsIlVzZXJuYW1lIjoiSk1pdGNoZWxsIiwiRW1haWwiOiJKTWl0Y2hlbEBpY2xvdWQuY29tIiwiRG9nQnJlZWQiOiJBdXNzaWUiLCJBZ2UiOiIyNyIsIkNpdHkiOiJIYW1pbHRvbiIsIk5hbWUiOiJKYW1lcyBNaXRjaGVsbCJ9.0OWLcAwY0YH_LjNuRAo7YwopV9rpigBZaypzoewdOuM"
          )}>Login</button>
        

            <BrowserRouter>
              <Routes>
                <Route path='/' element={<Login/>}/>
              </Routes>
            </BrowserRouter>
          </div>
      )}


    
    </>
  );
}

export default App;
