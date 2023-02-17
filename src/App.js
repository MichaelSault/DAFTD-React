import Button from 'react-bootstrap/Button';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="Aussie.png" className="App-logo" alt="logo" />
        <p>
          Did You Feed The Dog?
        </p>
        <Button size="lg">The Dog Has Been Fed</Button>
      </header>
    </div>
  );
}

export default App;
