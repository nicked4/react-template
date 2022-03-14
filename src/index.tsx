import ReactDOM from 'react-dom';
import GameCmp from 'component/gameCmp';
import { RecoilRoot } from 'recoil';

ReactDOM.render(
  <RecoilRoot>
    <GameCmp/>
  </RecoilRoot>,
  document.getElementById('root')
);
