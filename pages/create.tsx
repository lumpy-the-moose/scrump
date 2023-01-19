import DeckType from '../components/Game/DeckType';

import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { useAppSelector, useAppDispatch } from '../components/App/hooks';
import { useEffect } from 'react';
import axios from 'axios';

import { setGameName } from '../components/App/authSlice';

import LogoElement from '../components/Common/LogoElement';
import { Form, Input, Button } from '../components/Common/FormElements';

export default function Create() {
  const router = useRouter();
  const [cookies, setCookie] = useCookies();

  const dispatch = useAppDispatch();
  const { gameName, deckType } = useAppSelector(state => state.auth);

  useEffect(() => {
    router.prefetch('/game');
  }, []);

  const newGame = async () => {
    axios('https://scrum-poker.space/scrum/poker/sessions', {
      method: 'POST',
      headers: {
        Authorization: cookies.Authorization,
      },
      data: {
        name: gameName,
        estimateSetName: deckType,
      },
    })
      .then(r => {
        setCookie('PokerSession', r.data.data.id, { path: '/' });
      })
      .then(() => {
        router.push('/game');
      });
  };

  return (
    <>
      <LogoElement />
      <Form
        onSubmit={e => {
          e.preventDefault();
          if (gameName) {
            newGame();
          }
        }}
      >
        <Input
          placeholder="Game#"
          onChange={e => {
            dispatch(setGameName(e.target.value));
          }}
        />
        <Button
          type="submit"
          disabled={!gameName}
          text={'Enter'}
          width={'150px'}
          height={'45px'}
        />
      </Form>
      <DeckType />
    </>
  );
}
