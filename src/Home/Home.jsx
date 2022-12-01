import { ReactComponent as Logo } from '../logo.svg';

import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { setNickname } from '../App/authSlice';

function Home() {
  const navigate = useNavigate();
  let [cookies, setCookie] = useCookies();

  const dispatch = useDispatch();
  const { nickname, pokerSession } = useSelector(state => state.auth);

  const toCreate = () => {
    axios(
      `https://scrum-poker.space/api/auth/${pokerSession ? 'nickname' : 'login'}`,
      {
        method: pokerSession ? 'PATCH' : 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          Authorization: cookies.Authorization,
        },
        data: {
          [pokerSession ? 'name' : 'username']: nickname,
        },
      }
    ).then(r => {
      if (!pokerSession) {
        setCookie('Authorization', r.data.data, { path: '/' });
      }
      pokerSession ? navigate('/game') : navigate('/create');
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
            toCreate();
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
          value={nickname ? nickname : ''}
          autoFocus
        />
        <button
          type="button"
          className="home__button"
          onClick={toCreate}
          disabled={!nickname && !cookies.nickname}
        >
          Join
        </button>
      </form>
      <div className="home__loader"></div>
    </>
  );
}

export default Home;
