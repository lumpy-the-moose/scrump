import { useNavigate, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { setNickname } from '../App/authSlice';

import LogoElement from '../Common/LogoElement';
import { Form, Input, Button } from '../Common/FormElements';

export default function Home() {
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
      <LogoElement />
      <Form
        onSubmit={e => {
          e.preventDefault();
          if (nickname) {
            logIn();
          }
        }}
      >
        <Input
          placeholder="Nickname"
          onChange={e => {
            dispatch(setNickname(e.target.value));
            setCookie('nickname', e.target.value, { path: '/' });
          }}
          value={nickname}
        />
        <Button
          onClick={logIn}
          disabled={!nickname}
          text={'Join'}
          width={'150px'}
          height={'45px'}
        />
      </Form>
    </>
  );
}
