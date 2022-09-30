import React from "react";

export default function GameBoard(props) {
  return (
    <div className="gameboard">
      {props.array.map((e, index) => {
        return (
          <div
            className="field"
            key={props.field + index}
            id={index}
            onClick={props.onClick}
          ></div>
        );
      })}
    </div>
  );
}
////
