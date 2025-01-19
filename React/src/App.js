//import logo from './logo.svg';
import './App.css';
import Header from './Header'; 
import Main from './Main';  
import UserRegistration from './UserRegistration'; 
import UserLogin from './UserLogin';
import Footer from './Footer'; 
import React from 'react'; 

function App() {
  
  return (
    <div>
    <Header /> 
    <Main /> 
    <UserRegistration /> 
    <UserLogin />
    <Footer /> 
    </div>
  )

  /*
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React Soon! Test!
        </a>
      </header>
    </div>
  );
  */
}

export default App;
