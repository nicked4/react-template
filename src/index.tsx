import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';

import GameCmp from './component/gameCmp';

ReactDOM.render(
  <RecoilRoot>
    <GameCmp />
  </RecoilRoot>,
  document.getElementById('root'),
);
