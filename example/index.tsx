import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import { Timer } from '../dist';
import './App.css';

const INIT_TIME = {
  hour: 0,
  minute: 0,
  second: 624
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p className="App-message">Digital Timer</p>
        <Timer
          countDownTime={INIT_TIME}
          onComplete={() => console.log('time\'s up')}
        />
      </header>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
