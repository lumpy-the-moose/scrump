import Refresh from './Game/Refresh';
import Header from './Game/Header';
import Task from './Game/Task';
import Team from './Game/Team';
import Deck from './Game/Deck';

import { useCookies } from 'react-cookie';
import { useAppSelector } from './App/hooks';

import { IconContext } from 'react-icons';
import { FaLink } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

import { GameInfo, GameTitle, GameTitleAccent } from './Styled/Game.styled';
import { StyledLink } from './Styled/Link.styled';

export default function Game() {
  const [cookies] = useCookies();

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
          onClick={() => {
            navigator.clipboard.writeText(
              window.location.href.slice(0, -4) + cookies.PokerSession
            );
          }}
        >
          <IconContext.Provider value={{ size: '32px' }}>
            <FaLink />
          </IconContext.Provider>
        </StyledLink>
        <Tooltip anchorId="gameLink" content="Copy Game Link" place="top" />
      </GameInfo>
      <Task />
      <Team />
      <Deck />
    </>
  );
}
