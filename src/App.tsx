import React from 'react';
import './App.scss';
import Routing from './routing';

function App() {
  return (
    <div className="wrapper">
      <Routing />
      <div id="footer">
        &copy;2021 <a href="https://www.facebook.com/anna.m.jankowicz" target="_blank" rel="noreferrer">Anna Jankowicz</a>.
        Grafiki: <a href="https://www.flickr.com/photos/biodivlibrary/" target="_blank" rel="noreferrer">BHL</a>
      </div>
    </div>
  );
}

export default App;
