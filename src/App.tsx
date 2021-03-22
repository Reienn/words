import React from 'react';
import './App.scss';
import Routing from './routing';

function App() {
  return (
    <div className="wrapper">
      <h1 id="header">Słowa</h1>
      <div className="background">{Array(4).fill(0).map((el, i) => <div key={i} className="bg-layer"></div>)}</div>
      <div id="main">
        <div id="content">
          <Routing />
        </div>
      </div>
      <div id="footer">
        &copy;2021 <a href="https://www.facebook.com/anna.m.jankowicz" target="_blank">Anna Jankowicz</a>
      </div>
    </div>
  );
}

export default App;
