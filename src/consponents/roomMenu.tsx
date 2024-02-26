import React, {useCallback} from 'react'
import {RoomInterface} from '../store/roomsSlice'
import {socket} from '../store/service'

import './style.css'

interface RoomsMenuInterface {
  rooms: RoomInterface[] | null
  userName: string | null
}

// @todo: add wrapper for sockets with setted name
const RoomsMenu = ({rooms, userName}: RoomsMenuInterface) => {
  const handleJoinRoom = useCallback(({name, type}: {name: string, type: string}) => {
    socket.emit('joinRoom', {
      username: userName,
      room: name,
      roomType: type
    })
  }, [userName])

  return (
    <aside className="room-menu">
      <p className="room-menu__header">Choose you game room</p>
      <div className="room-menu__wrapper">
        {rooms && rooms.map((item) => {
          // @info found a bug on a BE - the same id's for rooms
          const {owner, name, type} = item
          return (<button key={owner} onClick={() => handleJoinRoom({name, type})}>{name}</button>)
        })}
      </div>
    </aside>
  )
}

export default RoomsMenu