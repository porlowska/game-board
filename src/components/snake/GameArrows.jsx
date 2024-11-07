import Button from "../Button"
import { FaArrowLeft, FaArrowUp, FaArrowDown, FaArrowRight } from "react-icons/fa";

const GameArrows = ({handleDirectionChange})=>{
    return(
        <div className="flex flex-row items-center justify-center">
            <Button text={<FaArrowLeft className="h-10 w-8"/>} className={"bg-green-800 text-white -m-1"} clickHandle={() => handleDirectionChange("left")}/>
            <div className="flex flex-col ">
            <Button text={<FaArrowUp className="h-8 w-10"/>} className={"bg-green-800 text-white -mb-1"} clickHandle={() => handleDirectionChange("up")}/>
            <Button text={<FaArrowDown className="h-8 w-10"/>} className={"bg-green-800 text-white"} clickHandle={() => handleDirectionChange("down")}/>
            </div>
            <Button text={<FaArrowRight className="h-10 w-8"/>} className={"bg-green-800 text-white -m-1"} clickHandle={() => handleDirectionChange("right")}/>
        </div>
    )
}

export default GameArrows;