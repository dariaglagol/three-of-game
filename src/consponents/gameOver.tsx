import React from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { leaveRoom } from '../store/SocketSlice';

const GameOverScreen = () => {
  const dispatch = useAppDispatch();
  const userName = useAppSelector((state) => state.socket.login);
  const { user: winner } = useAppSelector((state) => state.socket.winner);

  const handleLeaveClick = () => {
    dispatch(leaveRoom());
  };

  const imageSrc = userName === winner ? './win.svg' : './lose.svg';
  const altText = userName === winner ? 'Congratulations! You won!' : 'Sorry, you lost the game';

  return winner ? (
    <div className="game-over">
      <img src={imageSrc} alt={altText} />
      <h2>Gameover</h2>
      <p>Winner is {winner}</p>
      <button onClick={handleLeaveClick}>Leave the room</button>
    </div>
  ) : null;
};

export default GameOverScreen;
