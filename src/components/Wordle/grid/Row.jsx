import Tile from "./Tile";

export default function Row({ word, guess, isGuessed }) {
  return (
    <div className="grid grid-cols-5 gap-2 mb-2">
      {new Array(5).fill(0).map((_, i) => {

        // switch( !isGuessed){
        //   case guess[i] === word[i]
        // }
        const bgColor = !isGuessed
          ? 'bg-white'
          : guess[i] === word[i]
          ? 'bg-green-400'
          : word.includes(guess[i])
          ? 'bg-yellow-400'
          : 'bg-white';

        return (
          <Tile key={i} bgColor={bgColor} letter={guess[i]} />
        );
      })}
    </div>
  );
}
