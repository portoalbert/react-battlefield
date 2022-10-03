import React from "react";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import { ARRAYOFSHIPS } from "./assets/ARRAYOFSHIPS";

export default function App() {
  const [hasStarted, setHasStarted] = useState(true);
  const MAP_SIZE = 132;
  let currentLocation = [];
  let movesPlayed = [];
  const [currentShip, setCurrentShip] = useState("Carrier");
  const [playerShips, setPlayerShips] = useState(ARRAYOFSHIPS);
  const [fieldSize, setFieldSize] = useState([...Array(MAP_SIZE)]);
  function gameEngine(id) {
    document.getElementById(id).style.backgroundColor = "blue";
    playerShips.map((element) => {
      element.location.map((index) => {
        if (index === `${id}`) {
          element.hit += 1;
          document.getElementById(id).style.backgroundColor = "purple";
          if (element.hit >= element.length) {
            console.log("hit", `${element.name} destroyed`);
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
    console.log(currentMove);
    if (movesPlayed.findIndex((move) => move === currentMove) !== -1) {
      console.log("invalid move");
      return;
    }
    movesPlayed.push(e.target.id);
    gameEngine(e.target.id);
  }
  function handlerPlayerSelection(e) {
    playerShips.map((element) => {
      if (element.name === currentShip) {
        element.location = currentLocation;
        if (currentShip === "Carrier") {
          setCurrentShip("Submarine");
        }
        if (currentShip === "Submarine") {
          setCurrentShip("Destroyer");
        }
        if (currentShip === "Destroyer") {
          tester();
        }
      }
    });
  }
  function idPicker(id) {
    let length = 3;
    const capOne = 11 - length;
    const capTwo = 22 - length;
    const capThree = 131 - length;
    currentLocation = [];
    if (id > capOne && id < 11) {
      for (let i = 0; i < 3; i++) {
        const tempId = parseInt(id) - i;
        currentLocation.push(`${tempId}`);
      }
      return;
    }
    if (id > capTwo && id < 22) {
      for (let i = 0; i < 3; i++) {
        const tempId = parseInt(id) - i;
        currentLocation.push(`${tempId}`);
      }
      return;
    }
    if (id > capThree) {
      for (let i = 0; i < 3; i++) {
        const tempId = parseInt(id) - i;
        currentLocation.push(`${tempId}`);
      }
      return;
    } else {
      for (let i = 0; i < 3; i++) {
        const tempId = parseInt(id) + i;
        currentLocation.push(`${tempId}`);
      }
    }
  }
  function tester() {
    setHasStarted(false);
  }
  function onEnterHandler(e) {
    idPicker(e.target.id);
    currentLocation.map((element) => {
      document.getElementById(element).style.backgroundColor = "red";
    });
  }
  function onLeaveHandler(e) {
    idPicker(e.target.id);
    currentLocation.map((element) => {
      document.getElementById(element).style.backgroundColor = "";
    });
  }
  return (
    <div className="main">
      <div className="title">
        <h1>Battleship</h1>
        <h2>Can you defeat the most intelligent Ai space has to offer?</h2>
      </div>
      {hasStarted ? (
        <div className="firstpage">
          <h1>Place your {currentShip}!</h1>
          <div className="boardone">
            <GameBoard
              array={fieldSize}
              field="playerfield"
              onClick={(e) => handlerPlayerSelection(e)}
              onMouseEnter={(e) => onEnterHandler(e)}
              onMouseLeave={(e) => onLeaveHandler(e)}
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
