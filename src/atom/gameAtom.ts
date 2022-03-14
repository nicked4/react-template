import Game from "model/game";
import { atom } from "recoil";

const gameState = atom<Game>({
  key: 'game',
  default: {
    history: [
      { squares: Array(9).fill(undefined) }
    ],
    stepNumber: 0,
    xIsNext: true,
  },
});

export default gameState;
