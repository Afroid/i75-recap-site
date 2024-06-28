import React from 'react';
import Pioli from './Pioli.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={Pioli} className="App-logo" alt="logo" />
        <p>
          {/* Edit <code>src/App.tsx</code> and save to reload. */}
          Coming soon...
        </p>
        <a
          className="App-link"
          href="https://fantasy.espn.com/football/league?leagueId=849836"
          target="_blank"
          rel="noopener noreferrer"
        >
          I75 League
        </a>
      </header>
    </div>
  );
}

export default App;
