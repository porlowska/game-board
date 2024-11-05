const Overlay = ({ message, buttonText, onButtonClick }) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-80 z-10 text-white text-xl">
      <p className="p-2">{message}</p>
      <button
        className="mt-4 bg-gray-600 text-white px-6 py-3 rounded-lg "
        onClick={onButtonClick}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default Overlay;
