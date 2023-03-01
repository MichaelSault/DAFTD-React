import {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import '../App.css';


export default function DogWalk() {
    const [dog, setDog] = useState({DogID: 1, Name: "", FeedTime: ""});

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
    }

    const dogFeeder = async () => {
        console.log("Feeding Dog");
        feedTheDog();
        console.log("Dog Fed, Updating Time");
        setTimeout(1000, getTheDog());
        console.log("Time Updated");
        console.log(dog.FeedTime.toLocaleString('en-US', { timeZone: 'America/New_York' }));
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
            <Button onClick={() => dogFeeder()}>I Fed The Dog!</Button>
        </header>
        </div>
    );
}