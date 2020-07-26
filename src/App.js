import React, { Component } from 'react';
import Main from './components/MainComponent';
import './App.css';
import { BrowserRouter } from 'react-router-dom';


class App extends Component {

  render() {
    return ( 
      <BrowserRouter>
        <div className="App"> 

        {/* Calling the main class imported earlier from th maincomponent.js file */}
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;