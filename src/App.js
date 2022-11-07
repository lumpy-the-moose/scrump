import Home from './Home/Home';
import Create from './Home/Create';
import Game from './Game/Game';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

function App() {
  let [cookies, setCookie] = useCookies();

  let [gameId, setGameId] = useState();
  let [deckType, setDeckType] = useState();
  let [nickname, setNickname] = useState();
  let [pokerSession, setPokerSession] = useState();

  useEffect(() => {
    if (!gameId) {
      setGameId(cookies.gameId);
    }

    if (!cookies.deckType) {
      setCookie('deckType', 'mod', { path: '/' });
    }

    if (!deckType) {
      setDeckType(cookies.deckType);
    }

    if (!nickname) {
      setNickname(cookies.user);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function gameIdHandler(value) {
    setGameId(value);
  }

  function deckTypeHandler(value) {
    setDeckType(value);
  }

  function nicknameHandler(value) {
    setNickname(value);
  }

  function sessionDataHandler(value) {
    setPokerSession(value);
  }

  return (
    <>
      <Router basename="/scrump">
        <Routes>
          <Route path="/" element={<Home nickname={nickname} setNickname={nicknameHandler} />} />
          <Route
            path="/create"
            element={
              <Create
                gameId={gameId}
                deckType={deckType}
                setGameId={gameIdHandler}
                setDeckType={deckTypeHandler}
                setPokerSession={sessionDataHandler}
              />
            }
          />
          <Route
            path="/game"
            element={
              <Game
                gameId={gameId}
                deckType={deckType}
                nickname={nickname}
                setGameId={gameIdHandler}
                setDeckType={deckTypeHandler}
                setNickname={nicknameHandler}
                pokerSession={pokerSession}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
