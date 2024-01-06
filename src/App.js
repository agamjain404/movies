import './App.css';
import NavBar from './Components/NavBar';
import Banner from './Components/Banner';
import Movies from './Components/Movies';
import Favourites from './Components/Favourites';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';

function App() {
  return (
    <>
      <Router>
        <NavBar/>
          <Routes>
            <Route exact path='/' element={
              <>
                <Banner/>
                <Movies/>
              </>
            }>
            </Route>
            <Route exact path='/favourites' element={
              <>
                <Favourites/>
              </>
            }/>
          </Routes>
      </Router>
    </>
  );
}

export default App;
