import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { useAppSelector, useAppDispatch } from './App/hooks';
import axios from 'axios';

import { setNickname } from './App/authSlice';

import LogoElement from './Common/LogoElement';
import { Form, Input, Button } from './Common/FormElements';

export default function Invitation() {
  const router = useRouter();
  const { invitation } = router.query;
  const [cookies, setCookie] = useCookies();

  const dispatch = useAppDispatch();
  const { nickname } = useAppSelector(state => state.auth);

  const joinGame = async () => {
    axios(`https://scrum-poker.space/api/auth/login`, {
      method: 'POST',
      headers: {
        Authorization: cookies.Authorization,
      },
      data: {
        username: nickname,
      },
    })
      .then(r => {
        console.log(`%c LogIN`, `color: green`);
        setCookie('Authorization', r.data.data, { path: '/' });
        return r.data.data;
      })
      .then(r => {
        console.log(invitation);
        axios(`https://scrum-poker.space/scrum/poker/sessions/${invitation}`, {
          method: 'GET',
          headers: {
            Authorization: r,
          },
          data: {
            username: nickname,
          },
        })
          .then(r => {
            console.log(`%c JOIN`, `color: green`);
            setCookie('PokerSession', r.data.data.id, { path: '/' });
          })
          .then(() => {
            router.push('/game');
          });
      });
  };

  return (
    <>
      <LogoElement />
      <Form
        onSubmit={e => {
          e.preventDefault();
          if (nickname) {
            joinGame();
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
          type="submit"
          disabled={!nickname}
          text={'Join'}
          width={'150px'}
          height={'45px'}
        />
      </Form>
    </>
  );
}
