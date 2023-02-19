import Button from 'react-bootstrap/Button';

import './App.css';

//require("./database/database").connect()
var FedDate = Date();


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="Aussie.png" className="App-logo" alt="logo" />
        <p>
          This dog was last fed at {FedDate}
        </p>
        
        <p>
          Did You Feed The Dog?
        </p>
        <Button size="lg">I Fed The Dog!</Button>
      </header>
    </div>
  );
}

export default App;
