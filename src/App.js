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
  const [playerShips, setPlayerShips] = useState([]);
  const [fieldSize, setFieldSize] = useState([...Array(MAP_SIZE)]);
  function gameEngine(id) {
    playerShips[0].location.map((element, index) => {
      if (element === `${id}`) {
        playerShips[0].hit += 1;
        if (playerShips[0].hit >= playerShips[0].length) {
          console.log("ship destroyed");
          return;
        }
        console.log("hit");
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

  function shipMaker(locationOne, locationTwo, locationThree) {
    const tempShipArray = playerShips;
    const tempShip = {};
    tempShip.location = [locationOne, locationTwo, locationThree];
    tempShip.length = tempShip.location.length;
    tempShip.hit = 0;
    tempShipArray.push(tempShip);
    setPlayerShips(tempShipArray);
  }
  function tester() {
    shipMaker("aifield0", "aifield1", "aifield2");
    console.log(playerShips);
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
      <button onClick={() => tester()}>Testing</button>
    </div>
  );
}
