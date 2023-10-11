import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {MainRoutes} from './AllRoutes/MainRoutes';
import React, { useState,useEffect} from 'react';
import SessionTimer from './components/SessionTimer';


function App() {
    const [isSessionExpired, setIsSessionExpired] = useState(false);

  const handleSessionTimeout = () => {
    setIsSessionExpired(true);
  };
    return (
        <>
        {isSessionExpired ? (
        <div><h2>Session has expired. Please refresh the page.</h2></div>
      ) : (
        <>
        <div className="App">
            <div className="wrapper">
                <Navbar/>
                <MainRoutes/>
            </div>
            <Footer/>
        </div>

          <SessionTimer timeoutInSeconds={120} onTimeout={handleSessionTimeout} />
        </>
      )}
    </>
    );
}

export default App;
