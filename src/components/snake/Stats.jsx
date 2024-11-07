import Button from "../Button";
const Stats = ({score, highScore, resetHighScore})=>{
    return(
        <div className="bg-white shadow sm:rounded-lg mt-4 w-[250px] md:w-[350px]">
<div className="px-4 py-5 sm:p-6 text-center">
  <h3 className="text-base font-semibold text-gray-900">Game Stats</h3>
  <div className='flex flex-col md:flex-row items-center mt-1 gap-1 justify-evenly'>
  <div className="max-w-xl text-sm text-gray-500">
    <p>Your Score: <span className="font-bold text-gray-900">{score}</span></p>
    <p>High Score: <span className="font-bold text-gray-900">{highScore}</span></p>
  </div>
    <Button
      text="Reset High Score"
      className="bg-green-800 text-white hover:bg-green-600 ring-green-800 pointer-events-auto"
      clickHandle={resetHighScore}
    />
  </div>
</div>
</div>

)}
export default Stats;

//() => {localStorage.removeItem('highscore');setHighScore(0);}
