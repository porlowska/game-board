const Button =({text,className, clickHandle})=>{

  //className remember to pass: bg-color text-color hover:bg-color ring-color
    return(
    <button
        onClick={clickHandle}
        type="button"
        className={`${className} m-4 rounded-lg px-3.5 py-2.5 text-sm font-semibold shadow-sm ring-1 `}
      >
        {text}
      </button>)
}

export default Button