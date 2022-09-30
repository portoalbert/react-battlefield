import React from "react";
import GameBoard from "./components/GameBoard";
import { useState } from "react";

export default function App() {
  const testShip = {
    length: 3,
    location: ["aifield0", "aifield1", "aifield2"],
    hit: 0,
  };
  const [hasStarted, setHasStarted] = useState(true);
  const MAP_SIZE = 132;
  let movesPlayed = [];
  const [playerShips, setPlayerShips] = useState([]);
  const [fieldSize, setFieldSize] = useState([...Array(MAP_SIZE)]);
  function gameEngine(id) {
    playerShips.map((element) => {
      element.location.map((index) => {
        if (index === `${id}`) {
          element.hit += 1;
          if (element.hit >= element.length) {
            console.log("hit", "ship destroyed");
            return;
          }
          console.log("hit");
          return;
        }
      });
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
  function handlerPlayerSelection(e) {
    const currentSelection = e.target.id;
    const currentSelectionTwo = `${parseInt(currentSelection) + 1}`;
    const currentSelectionThree = `${parseInt(currentSelection) + 2}`;
    shipMaker(currentSelection, currentSelectionTwo, currentSelectionThree);
  }
  function shipMaker(locationOne, locationTwo, locationThree) {
    const tempShipArray = playerShips;
    const tempShip = {};
    tempShip.location = [locationOne, locationTwo, locationThree];
    tempShip.length = tempShip.location.length;
    tempShip.hit = 0;
    tempShipArray.push(tempShip);
    setPlayerShips(tempShipArray);
    console.log(playerShips);
  }
  function tester() {
    setHasStarted(false);
  }
  return (
    <div className="main">
      <div className="title">
        <h1>Battleship</h1>
        <h2>Can you defeat the most intelligent Ai space has to offer?</h2>
      </div>
      {hasStarted ? (
        <div className="firstpage">
          <h1>Place your ships!</h1>
          <div className="boardone">
            <GameBoard
              array={fieldSize}
              field="playerfield"
              onClick={(e) => handlerPlayerSelection(e)}
            />
          </div>
          <button onClick={() => tester()}> Start Battling!</button>
        </div>
      ) : (
        <div className="secondpage">
          <div className="boards">
            <div className="boardone">
              <GameBoard
                array={fieldSize}
                field="playerfield"
                onClick={(e) => handlerOnClick(e)}
              />
            </div>
            <div className="boardtwo">
              <GameBoard
                array={fieldSize}
                field="aifield"
                onClick={(e) => handlerOnClick(e)}
              />
            </div>
          </div>
          <button onClick={() => tester()}>Testing</button>
        </div>
      )}
    </div>
  );
}
