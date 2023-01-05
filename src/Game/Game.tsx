import Refresh from './Refresh';
import Header from './Header';
import Task from './Task';
import Team from './Team';
import Deck from './Deck';

import { useCookies } from 'react-cookie';
import { useAppSelector } from '../App/hooks';

import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

import { GameInfo, GameTitle, GameTitleAccent } from '../Styled/Game.styled';
import { StyledLink } from '../Styled/Link.styled';

export default function Game() {
  let [cookies] = useCookies();

  const { gameName } = useAppSelector(state => state.auth);
  const { refreshing } = useAppSelector(state => state.game);

  return (
    <>
      {refreshing ? <Refresh /> : false}
      <Header />
      <GameInfo>
        <GameTitle>
          Game <GameTitleAccent>{gameName}</GameTitleAccent>
        </GameTitle>
        <StyledLink
          id="gameLink"
          size={'32px'}
          onClick={() => {
            navigator.clipboard.writeText(
              window.location.href.slice(0, -4) + cookies.PokerSession
            );
          }}
        />
        <Tooltip anchorId="gameLink" content="Copy Game Link" place="top" />
      </GameInfo>
      <Task />
      <Team />
      <Deck />
    </>
  );
}
