import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import gameState from '../atom/gameAtom';
import calculateWinner from '../lib/rule';
import '../sass/game.scss';
import gameSelector from '../selector/gameSelector';

function SquareCmp(props: {
  // onClick: () => void も可
  value?: string;
  onClick: React.MouseEventHandler;
}): JSX.Element {
  return (
    <button className="square" type="button" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function BoardCmp(props: {
  squares: (string | undefined)[];
  onClick: (param: number) => void;
}): JSX.Element {
  const renderSquare = (i: number): JSX.Element => (
    <SquareCmp
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

function GameCmp(): JSX.Element {
  // useRecoilValue(Atom | Selector)
  const game = useRecoilValue(gameSelector);
  const setGame = useSetRecoilState(gameState);

  const { history, stepNumber, xIsNext } = game;

  const handleClick = (i: number): void => {
    const real = history.slice(0, stepNumber + 1);
    const current = real[real.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? 'X' : 'O';
    setGame({
      history: real.concat([{
        squares,
      }]),
      stepNumber: real.length,
      xIsNext: !xIsNext,
    });
  };

  const jupmTo = (step: number): void => {
    setGame({
      history: game.history,
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  };

  const real = history;
  const current = real[stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = real.map((_: object, move: number): JSX.Element => {
    const desc = move
      ? `Go to move #${move}`
      : 'Go to game start';
    return (
      <li key={move}>  {/* eslint-disable-line */}
        <button type="button" onClick={() => jupmTo(move)}>{desc}</button>
      </li>
    );
  });

  let status: string;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="game">
      <div className="game-board">
        <BoardCmp
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
}

export default GameCmp;
