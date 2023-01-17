import { useCookies } from 'react-cookie';
import { useAppSelector, useAppDispatch } from '../App/hooks';
import { useEffect } from 'react';
import axios from 'axios';

import { setGameName, setIsAdmin } from '../App/authSlice';
import {
  setTaskMessage,
  setSelectedCard,
  updateActiveUsers,
  updateCurrentSet,
  toVoting,
  toResults,
  toWaiting,
} from '../App/gameSlice';

export default function Refresh() {
  const [cookies] = useCookies();

  const dispatch = useAppDispatch();
  const { selectedCard } = useAppSelector(state => state.game);

  const fetchPokerSession = () => {
    axios(`https://scrum-poker.space/scrum/poker/sessions/${cookies.PokerSession}`, {
      method: 'GET',
      headers: {
        Authorization: cookies.Authorization,
      },
    })
      .then(r => r.data.data)
      .then(r => {
        console.log(r);

        dispatch(setGameName(r.name));
        dispatch(
          setTaskMessage(
            r.taskDescription && r.taskDescription !== 'false'
              ? r.taskDescription
              : ''
          )
        );
        dispatch(updateActiveUsers(r.users));
        dispatch(updateCurrentSet(r.estimates));
        dispatch(
          setIsAdmin(
            r.users.filter((user: any) => user.admin)[0].nickname ===
              cookies.nickname
          )
        );

        if (!selectedCard) {
          dispatch(
            setSelectedCard(
              r.users.filter((user: any) => user.nickname === cookies.nickname)[0]
                .estimate
            )
          );
        }

        if (r.estimatingInProgress) {
          dispatch(toVoting());
        }

        if (
          !r.estimatingInProgress &&
          r.taskDescription !== null &&
          r.taskDescription !== 'false'
        ) {
          console.log('results');
          dispatch(toResults());
          return;
        }

        if (!r.estimatingInProgress) {
          console.log('waiting');
          dispatch(toWaiting());
        }
      });
  };

  useEffect(() => {
    fetchPokerSession();
    const interval = setInterval(fetchPokerSession, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <></>;
}
