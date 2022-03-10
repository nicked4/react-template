import React from 'react';
import calculateWinner from 'lib/rule';
import '../sass/game.scss';
import { useState } from 'react';

const Square = (props: {
  // onClick: () => void も可
  value?: string;
  onClick: React.MouseEventHandler;
}): JSX.Element => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
};

const Board = (props: {
  squares: (string | undefined)[];
  onClick: (param: number) => void;
}): JSX.Element => {
  const renderSquare = (i: number): JSX.Element => (
    <Square
      value={props.squares[i]}
      onClick={() => props.onClick(i)}
    />
  );

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

const Game = (): JSX.Element => {
  const [history, setHistory] = useState([{
    squares: Array(9).fill(null),
  }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i: number): void => {
    const real = history.slice(0, stepNumber + 1);
    const current = real[real.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(real.concat([{
      squares: squares,
    }]));
    setStepNumber(real.length);
    setXIsNext(!xIsNext);
  }

  const jupmTo = (step: number): void => {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
  }

  const real = history;
  const current = real[stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = real.map((_: object, move: number): JSX.Element => {
    const desc = move ?
      'Go to move #' + move :
      'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jupmTo(move)}>{desc}</button>
      </li>
    );
  })

  let status: string;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;
