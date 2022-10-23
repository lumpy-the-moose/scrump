import Home from './Home/Home';
import Login from './Home/Login';
import Game from './Game/Game';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {
  let [deckType, setDeckType] = useState('mod');
  let [gameId, setGameId] = useState();
  let [nickname, setNickname] = useState();

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
      <Router>
        <Routes>
          <Route
            path="/scrump/"
            element={
              <Home gameId={gameId} setGameId={gameIdHandler} setDeckType={deckTypeHandler} />
            }
          />
          <Route
            path="/scrump/login"
            element={<Login nickname={nickname} setNickname={nicknameHandler} />}
          />
          <Route
            path="/scrump/game"
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
