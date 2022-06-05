import React from 'react';
import './App.scss';
import Routing from './routing';

function App() {
  return (
    <div className="wrapper">
      <Routing />
      <div id="footer">
        &copy;{new Date().getFullYear()} <a href="https://www.facebook.com/anna.chotoborska" target="_blank" rel="noreferrer">Reien</a>.
        Grafiki: <a href="https://www.flickr.com/photos/biodivlibrary/" target="_blank" rel="noreferrer">BHL</a>
      </div>
    </div>
  );
}

export default App;
