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

const WinningPattern = ["012", "036", "048", "147", "258", "246", "345", "678"];

function TicTacToe() {
  const [activePlayer, setActivePlayer] = useState(Players.A);
  const [playerTurns, setPlayerTurns] = useState(structuredClone(DefaultTurns));
  const [message, setMessage] = useState("");

  const buttons = Array.from(new Array(9));

  const handleTurn = (index) => {
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

      const isWon = isPlayerWon(oldPlayerTurn[activePlayer]);

      if (isWon) {
        setMessage(`player ${activePlayer} win the Game!`);
      }
      setPlayerTurns(oldPlayerTurn);
      setActivePlayer(newPlayer);
    };
  };

  const isPlayerWon = (turns) => {
    const turnsIsStr = turns.sort().join("");
    const isWon = WinningPattern.some((t) => moreStrict(t, turnsIsStr));
    return isWon;
  };

  const moreStrict = (singlePattern, turnsIsStr) => {
    return singlePattern.split("").every((p) => turnsIsStr.includes(p));
  };

  const handleRestart = () => {
    setPlayerTurns(DefaultTurns);
    setActivePlayer(Players.A);
    setMessage("");
  };


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
      <div className="message">
        {!!message && (
          <>
            <h5>{message}</h5>
            <button onClick={handleRestart} className="restart-button">Restart</button>
          </>
        )}
      </div>
    </>
  );
}

export default TicTacToe;
