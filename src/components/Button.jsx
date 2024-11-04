const Button =({text,style, clickHandle})=>{
    return(
    <button
        onClick={clickHandle}
        type="button"
        className={`${style} m-4 rounded-lg bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50`}
      >
        {text}
      </button>)
}

export default Button