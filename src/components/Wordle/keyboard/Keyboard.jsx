const Keyboard = ({ onKeyPress }) =>{

    const keys = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

    return (
      <div>
        {keys.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center">
            {row.split("").map((char) => (
              <div
                key={char}
                onClick={() => onKeyPress(char)}
                className="bg-gray-300 flex w-9 h-11 rounded-md items-center justify-center uppercase m-0.5 font-medium cursor-pointer"
              >
                {char}
              </div>
            ))}
          </div>
        ))}
        <div className="flex justify-center">
          <div
            onClick={() => onKeyPress("Enter")}
            className="bg-gray-300 flex w-20 h-11 rounded-md items-center justify-center uppercase m-0.5 font-medium cursor-pointer"
          >
            Enter
          </div>
          <div
            onClick={() => onKeyPress("Backspace")} 
            className="bg-gray-300 flex w-20 h-11 rounded-md items-center justify-center uppercase m-0.5 font-medium cursor-pointer"
          >
            Delete
          </div>
        </div>
      </div>
    );
  }
  export default Keyboard;