import React from "react";
import "./style.css";

function TicTacToe() {
  const buttons = Array.from(new Array(9))

  return (
    <>
      <div className="tic-tac-toe">
        {buttons.map((index) => 
          <button key={index}>X{index}</button>
        )}
        <h1>Hello</h1>
      </div>
    </>
  );
}

export default TicTacToe;
