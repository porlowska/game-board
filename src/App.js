import "./App.css";
import { Routes, Route } from "react-router-dom";
import SideBar from "./components/sidebar/SideBar";
import Home from "./pages/home";
import TicTacToe from "./pages/tic-tac-toe";
import WordleGame from "./pages/wordle";
import { SnakeBoard } from "./pages/snake";

function App() {
  return (
    <>
      <SideBar />
      <main className="py-10 lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tic-tac-toe" element={<TicTacToe />} />
              <Route path="/wordle" element={<WordleGame />} />
              <Route path="/snake" element={<SnakeBoard />} />
            </Routes>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
