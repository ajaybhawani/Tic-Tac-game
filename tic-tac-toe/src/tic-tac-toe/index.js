import React, { useState } from "react";
import "./style.css";

const Players = {
  A: 0,
  B: 1,
};

const PlayerIcon = {
  [Players.A]: "X",
  [Players.B]: "O",
};

const DefaultTurns = {
  [Players.A]: [],
  [Players.B]: [],
};

function TicTacToe() {
  const [activePlayer, setActivePlayer] = useState(Players.A);
  const [playerTurns, setPlayerTurns] = useState(structuredClone(DefaultTurns));

  const buttons = Array.from(new Array(9));

  const handleTurn = (index) => {
    console.log(index);
    return () => {
      const newPlayer = activePlayer === Players.A ? Players.B : Players.A;
      const playersATruns = playerTurns[Players.A];
      const playersBTruns = playerTurns[Players.B];
      if (playersATruns.join("").includes(String(index))) {
        return;
      } else if (playersBTruns.join("").includes(String(index))) {
        return;
      }
      const oldPlayerTurn = structuredClone(playerTurns);
      oldPlayerTurn[activePlayer].push(String(index));
      setPlayerTurns(oldPlayerTurn);
      setActivePlayer(newPlayer);
    };
  };
  console.log(playerTurns);

  return (
    <>
      <div className="tic-tac-toe">
        {buttons.map((_, index) => {
          const otherPlayer =
            activePlayer === Players.A ? Players.B : Players.A;
          const currentPlayerTurn = playerTurns[activePlayer];
          const otherPlayerTurn = playerTurns[otherPlayer];
          let icon = "";
          if (currentPlayerTurn.join("").includes(String(index))) {
            icon = PlayerIcon[activePlayer];
          } else if (otherPlayerTurn.join("").includes(String(index))) {
            icon = PlayerIcon[otherPlayer];
          }

          return (
            <button onClick={handleTurn(index)} key={index}>
              {icon}
            </button>
          );
        })}
      </div>
    </>
  );
}

export default TicTacToe;
