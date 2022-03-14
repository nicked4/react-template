import gameState from "atom/gameAtom";
import Game from "model/game";
import { selector } from "recoil";

// 本来 selector は atom の値を加工したものを返す
// 今回はそのままの値を返しているため atom で完結させるのが正しい
const gameSelector = selector<Game>({
  key: 'gameSelector',
  get: ({ get }) => {
    const game = get(gameState);
    return game;
  }
});

export default gameSelector;
