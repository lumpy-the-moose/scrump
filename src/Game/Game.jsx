import Header from './Header';
import Task from './Task';
import Team from './Team';
import Deck from './Deck';
import Refresh from '../App/Refresh';

import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';

import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

import { GameInfo, GameTitle, GameTitleAccent } from '../Styled/Game.styled';
import { StyledLink } from '../Styled/Link.styled';

export default function Game() {
  let [cookies] = useCookies();

  const { gameName } = useSelector(state => state.auth);

  const { refreshing } = useSelector(state => state.game);

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
