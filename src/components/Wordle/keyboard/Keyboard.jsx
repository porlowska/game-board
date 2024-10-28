export default function Keyboard() {
    // { guesses, exactGuesses, inexactGuesses }
    const keys = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
    return (
      <div>
        {keys.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center">
            {row.split('').map((char) => {
              const bgColor = 'bg-gray-300'
            //   exactGuesses.includes(char)
            //     ? 'bg-green-400'
            //     : inexactGuesses.includes(char)
            //     ? 'bg-yellow-400'
            //     : guesses.includes(char)
            //     ? 'bg-gray-600'
            //     : 'bg-gray-300';
  
              return (
                <div key={char} className={`${bgColor} flex w-9 h-11 rounded-md items-center justify-center uppercase m-0.5 font-medium`}>
                  {char}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  }
  