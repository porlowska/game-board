import Snake  from "../../components/snake/Snake";
import GameLayout from "../../components/GameLayout";

export const SnakeBoard = () => {
  return (
    <GameLayout
      title="Play Timeless Snake"
      description="Take on the classic Snake game!. Gather points, make the snake grow, and avoid obstacles in your path to the top!."
      gameComponent={Snake}
      bgColour={['55ed12','102d04', '0ca503','6bdb24']}
    />
  );
};
