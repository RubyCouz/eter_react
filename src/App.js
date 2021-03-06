import React from 'react';
import './App.css';
// import composants
import Navbar from './components/Navbar/Navbar'
import CarouselComponent from './components/Carousel/CarouselComponent'
import SocialNetwork from './components/SocialNetwork/SocialNetwork'

function App() {
  return (
    <div className="App">
        {/*composant navbar*/}
      <Navbar />
      {/*composant carousel*/}

        <CarouselComponent />
        {/*composant réseau social*/}
        <SocialNetwork />
      <header>


      </header>
    </div>
  );
}

export default App;
