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
      bgColour={["f8f8f8", "d3d3d3", "a9a9a9", "808080"]}
    />
  );
};

export default Home;
