import Button from 'react-bootstrap/Button';
import {useState, useEffect} from 'react';

import './App.css';

function App() {
  const [dog, setDog] = useState({DogID: 1, Name: "", FeedTime: ""})

  useEffect(() => {
    getTheDog();
  }, []);

  const getTheDog = async () => {
    const newData = await fetch('http://localhost:5000/getFeed', {
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
    setDog(newData);
    console.log(dog);
  }

  const feedTheDog = async () => {
    
    const newData = await fetch('http://localhost:5000/setFeed', {
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
    getTheDog(); //why does this never trigger??
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src="Aussie.png" className="App-logo" alt="logo" />
        <p>
          {dog.Name} was last fed at {dog.FeedTime}
        </p>
        <Button onClick={() => getTheDog()}>When Was The Dog Fed?</Button>
        <p>
          Did You Feed The Dog?
        </p>
        <Button onClick={() => feedTheDog()}>I Fed The Dog!</Button>
      </header>
    </div>
  );
}

export default App;
