import Button from 'react-bootstrap/Button';
import {useState} from 'react';

import './App.css';

//require("./database/database").connect()
var FedDate = Date();
var ThisDog = "Milli";




function App() {
  const [dog, setDog] = useState({DogID: 0, Name: '', FeedTime: ''})

  const feedTheDog = async () => {
    const newData = await fetch('http://localhost:5000/setFeedTime', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        ...dog
      })
    })
    .then(res => res.json());
    console.log(newData);
    setDog(newData[0])
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src="Aussie.png" className="App-logo" alt="logo" />
        <p>
          {ThisDog} was last fed at {FedDate}
        </p>
        
        <p>
          Did You Feed The Dog?
        </p>
        <Button onClick={() => feedTheDog()}>I Fed The Dog!</Button>
      </header>
    </div>
  );
}

export default App;
