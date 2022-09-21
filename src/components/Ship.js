import React from "react";

export default function Ship() {
  const SHIP_CREATOR = {
    length: 3,
    location: ["aifield1", "aifield2", "aifield3"],
    wasHit: hit(),
    wasSunk: isSunk(),
  };
  const hit = (number) => {
    return "was hit ";
  };

  return <div>Ship</div>;
}
