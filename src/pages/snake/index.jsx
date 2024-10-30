import { Snake } from "../../components/snake/Snake";
import "./index.module.css";

export const SnakeBoard = () => {
  return (
    <>
      <div className="container">
        <Snake />
      </div>
    </>
  );
};
