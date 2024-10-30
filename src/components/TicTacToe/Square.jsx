import { CgClose, CgShapeCircle } from "react-icons/cg";

export const Square = ({ value, onSquareClick }) => {
  const icon =
    value === "X" ? <CgClose /> : value === "O" ? <CgShapeCircle /> : null;
  return (
    <button
      className="bg-white border border-gray-400 text-4xl font-bold h-24 w-24 flex items-center justify-center rounded-lg"
      onClick={onSquareClick}
    >
      {icon}
    </button>
  );
};

export default Square;
