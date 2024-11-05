import Button from "../Button";
const Overlay = ({ message, buttonText, onButtonClick }) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-80 z-10 text-white text-xl pointer-events-none">
      <p className="p-2">{message}</p>
      <Button
  text={buttonText}
  className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-400 ring-gray-600 pointer-events-auto"
  clickHandle={onButtonClick}
/>

    </div>
  );
};

export default Overlay;
