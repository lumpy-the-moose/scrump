import { ReactComponent as Logo } from '../logo.svg';

import { useNavigate, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { setNickname } from '../App/authSlice';

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  let [cookies, setCookie] = useCookies();

  const dispatch = useDispatch();
  const { nickname } = useSelector(state => state.auth);

  const logIn = () => {
    axios(`https://scrum-poker.space/api/auth/login`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        Authorization: cookies.Authorization,
      },
      data: {
        username: nickname,
      },
    }).then(r => {
      setCookie('Authorization', r.data.data, { path: '/' });

      if (location.pathname !== '/') {
        joinGame(r.data.data);
      } else {
        navigate('/create');
      }
    });
  };

  const joinGame = Authorization => {
    axios(`https://scrum-poker.space/scrum/poker/sessions${location.pathname}`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        Authorization,
      },
      data: {
        username: nickname,
      },
    }).then(r => {
      setCookie('PokerSession', r.data.data.id, { path: '/' });
      navigate('/game');
    });
  };

  return (
    <>
      <div className="header">
        <div className="logo">
          <Logo />
          |ScrumP| <br /> |Planning Poker|
        </div>
      </div>
      <form
        className="home__form"
        onSubmit={e => {
          e.preventDefault();
          if (nickname) {
            logIn();
          }
        }}
      >
        <input
          className="home__field"
          type="text"
          placeholder="Nickname"
          onChange={e => {
            dispatch(setNickname(e.target.value));
            setCookie('nickname', e.target.value, { path: '/' });
          }}
          value={nickname}
          autoFocus
        />
        <button
          type="button"
          className="home__button"
          onClick={logIn}
          disabled={!nickname}
        >
          Join
        </button>
      </form>
      <div className="home__loader"></div>
    </>
  );
}

export default Home;
