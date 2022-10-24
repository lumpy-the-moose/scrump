import Home from './Home/Home';
import Login from './Home/Login';
import Game from './Game/Game';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

function App() {
  let [cookies, setCookie] = useCookies();

  let [gameId, setGameId] = useState();
  let [deckType, setDeckType] = useState();
  let [nickname, setNickname] = useState();

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
  }, []);

  function gameIdHandler(value) {
    setGameId(value);
  }

  function deckTypeHandler(value) {
    setDeckType(value);
  }

  function nicknameHandler(value) {
    setNickname(value);
  }

  return (
    <>
      <Router basename="/scrump">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                gameId={gameId}
                deckType={deckType}
                setGameId={gameIdHandler}
                setDeckType={deckTypeHandler}
              />
            }
          />
          <Route
            path="/login"
            element={<Login nickname={nickname} setNickname={nicknameHandler} />}
          />
          <Route
            path="/game"
            element={
              <Game
                gameId={gameId}
                setGameId={gameIdHandler}
                deckType={deckType}
                nickname={nickname}
                setNickname={nicknameHandler}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
