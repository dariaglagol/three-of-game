import React, { useCallback, useEffect, useState } from 'react';
import PlayButtons from './playButtons';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import {
  selectLastMove, sendNumber, leaveRoom,
} from '../slices/socketSlice';
import { selectUsers } from '../slices/usersSlice';
import { GameState, GameMove } from '../types';

const GameInterface = () => {
  const dispatch = useAppDispatch();

  const [opponentName, setOpponentName] = useState<string>('CPU');

  const moves = useAppSelector((state) => state.socket.moves);
  const userName = useAppSelector((state) => state.socket.login);
  const activeTurn = useAppSelector((state) => state.socket.activeTurn);
  const { users } = useAppSelector((state) => selectUsers(state));
  const { number } = useAppSelector((state) => selectLastMove(state));

  useEffect(() => {
    dispatch({ type: 'USERS_FETCH_REQUESTED' });
  }, [dispatch]);

  useEffect(() => {
    if (users && users.length) {
      const opponent = users.filter((user) => user.name !== userName)[0]?.name || 'CPU';
      setOpponentName(opponent);
    }
  }, [users]);

  const handleSendNumberClick = useCallback((value: number) => {
    dispatch(sendNumber({
      number: Number(number),
      selectedNumber: value,
    }));
  }, [number, dispatch]);

  const currentPlayerMessage = (item: GameMove, i: number) => {
    const { user, number: itemNumber } = item;
    const abbreviation = (user && user[0]) || 'C';

    const classNameValue = `message${user !== userName ? ' message--reverted' : ''}`;
    return (
      <div className={classNameValue} key={i}>
        <span className="message__avatar">{abbreviation}</span>
        <p className="message__content">New number: {itemNumber}</p>
      </div>
    );
  };

  const handleLeaveRoom = () => {
    dispatch(leaveRoom());
  };

  return (
    <div className="main-game-area">
      <div className="main-game-area__info">
        <p>You are playing with: { opponentName }</p>
        <button onClick={ handleLeaveRoom } className="button">Leave the room</button>
      </div>
      <div className="message-scrollable-wrapper">
        <div className="message-wrapper">
          <div>
            { moves && moves.map((move, i) => move && currentPlayerMessage(move, i)) }
          </div>
        </div>
      </div>

      <PlayButtons
        onPlayBtnClick={ handleSendNumberClick }
        disabled={ activeTurn === GameState.WAIT }
      />
    </div>
  );
};

export default GameInterface;
