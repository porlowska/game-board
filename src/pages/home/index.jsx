// Home.js
import React from "react";
import GameLayout from "../../components/GameLayout";
import SplineDesign from '../../components/home/SplineDesign'

const Home = () => {

  return (
    <GameLayout
      title={'Welcome to Game Board'}
      description={'a game application created by Polly Orlowska'}
      gameComponent={SplineDesign}
      bgColour={['7bf1cc','e957c2', '88d4ae','8264a2']}
    />
  );
};

export default Home;
