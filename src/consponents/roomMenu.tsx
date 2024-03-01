import React, { useCallback } from 'react';
import { RoomInterface } from '../slices/roomsSlice';

import './style.css';
import { joinRoom } from '../slices/socketSlice';
import { useAppDispatch } from '../store/hooks';

interface RoomsMenuInterface {
  rooms: RoomInterface[] | null
}

// @todo: add wrapper for sockets with setted name
const RoomsMenu = ({ rooms }: RoomsMenuInterface) => {
  const dispatch = useAppDispatch();
  const handleJoinRoom = useCallback(({ name, type }: { name: string, type: 'human' | 'cpu' }) => {
    dispatch(joinRoom({
      room: name,
      roomType: type,
    }));
  }, [dispatch]);

  return (
    <aside className="room-menu">
      <p className="room-menu__header">Choose you game room</p>
      <div className="room-menu__wrapper">
        {rooms && rooms.map((item) => {
          // @info found a bug on a BE - the same id's for rooms
          const { owner, name, type } = item;
          return (
            <button
              key={owner}
              onClick={() => handleJoinRoom({ name, type })}
            >
              {name}
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default RoomsMenu;
