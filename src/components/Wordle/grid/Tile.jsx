export default function Tile({ bgColor, letter }) {
    return (
      <div className={`${bgColor} w-10 h-10 border border-gray-600 uppercase flex items-center justify-center text-xl`}>
        {letter}
      </div>
    );
  }
