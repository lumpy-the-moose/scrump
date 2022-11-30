import Home from './Home/Home';
import Create from './Home/Create';
import Game from './Game/Game';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router basename="/scrump">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
