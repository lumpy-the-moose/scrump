import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
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
  let [cookies] = useCookies();

  const dispatch = useDispatch();
  const { selectedCard } = useSelector(state => state.game);

  const fetchPokerSession = () => {
    axios(`https://scrum-poker.space/scrum/poker/sessions/${cookies.PokerSession}`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        Authorization: cookies.Authorization,
      },
    }).then(r => {
      console.log(r.data.data);

      dispatch(setGameName(r.data.data.name));
      dispatch(
        setTaskMessage(
          r.data.data.taskDescription && r.data.data.taskDescription !== 'false'
            ? r.data.data.taskDescription
            : ''
        )
      );
      dispatch(updateActiveUsers(r.data.data.users));
      dispatch(updateCurrentSet(r.data.data.estimates));
      dispatch(
        setIsAdmin(
          r.data.data.users.filter(user => user.admin)[0].nickname ===
            cookies.nickname
        )
      );

      if (!selectedCard) {
        dispatch(
          setSelectedCard(
            r.data.data.users.filter(user => user.nickname === cookies.nickname)[0]
              .estimate
          )
        );
      }

      if (r.data.data.estimatingInProgress) {
        dispatch(toVoting());
      }

      if (
        !r.data.data.estimatingInProgress &&
        r.data.data.taskDescription !== null &&
        r.data.data.taskDescription !== 'false'
      ) {
        console.log('results');
        dispatch(toResults());
        return;
      }

      if (!r.data.data.estimatingInProgress) {
        console.log('waiting');
        dispatch(toWaiting());
      }
    });
  };

  useEffect(() => {
    fetchPokerSession();
    const interval = setInterval(fetchPokerSession, 3000);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line
  }, []);
}
