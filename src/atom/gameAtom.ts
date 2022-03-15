import { atom } from 'recoil';

import Game from '../model/game';

const gameState = atom<Game>({
  key: 'game',
  default: {
    history: [
      { squares: Array(9).fill(undefined) as undefined[] },
    ],
    stepNumber: 0,
    xIsNext: true,
  },
});

export default gameState;
