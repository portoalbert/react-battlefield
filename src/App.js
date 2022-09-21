import React from "react";
import GameBoard from "./components/GameBoard";
import { useState } from "react";

export default function App() {
  const testShip = {
    length: 3,
    location: ["aifield0", "aifield1", "aifield2"],
    hit: 0,
  };
  const MAP_SIZE = 128;
  let movesPlayed = [];
  const [fieldSize, setFieldSize] = useState([...Array(MAP_SIZE)]);
  const [wasHit, setWasHit] = useState("false");
  function gameEngine(id) {
    testShip.location.map((element, index) => {
      if (element === `${id}`) {
        testShip.hit += 1;
        if (testShip.hit >= testShip.length) {
          console.log("ship destroyed");
          return;
        }
        console.log("hit", testShip.hit);
        return;
      }
    });
  }
  function handlerOnClick(e) {
    const currentMove = e.target.id;
    if (movesPlayed.findIndex((move) => move === currentMove) !== -1) {
      console.log("invalid move");
      return;
    }
    movesPlayed.push(e.target.id);
    gameEngine(e.target.id);
  }
  return (
    <div className="main">
      <GameBoard
        array={fieldSize}
        field="playerfield"
        onClick={(e) => handlerOnClick(e)}
      />
      <GameBoard
        array={fieldSize}
        field="aifield"
        onClick={(e) => handlerOnClick(e)}
      />
    </div>
  );
}
