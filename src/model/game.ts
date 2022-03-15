import Board from './board';

type Game = {
  history: Board[];
  stepNumber: number;
  xIsNext: boolean;
};

export default Game;
