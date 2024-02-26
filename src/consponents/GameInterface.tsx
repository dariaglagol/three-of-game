import React, {useCallback, useEffect, useState} from 'react'
import PlayButtons from './playButtons'
import {socket} from '../store/service'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import {addNewMove} from '../store/gameMoveSlice'
import GameOverScreen from './gameOver'

enum GameState {
  WAIT = "wait",
  PLAY = "play",
}
const GameInterface = () => {
  const dispatch = useAppDispatch()
  const [number, setNumber] = useState(null)
  const [isUserTurn, setIsUserTurn]  = useState<GameState>(GameState.PLAY)

  const {moves} = useAppSelector(state => state.moves)
  const {userData: userName} = useAppSelector(state => state.userData)

  const sendNumber = useCallback((value: number) => {
    socket.emit('sendNumber', {
      number: Number(number),
      selectedNumber: value
    })
  }, [number])

  useEffect(() => {
    socket.on('randomNumber', (data: any) => {
      dispatch(addNewMove(data))
      setNumber(data.number)
    })

    socket.on('activateYourTurn', (data: any) => {
      setIsUserTurn(GameState.PLAY)
    })
  }, [])

  const currentPlayerMessage = (item: any, i: number) => {
    const {user, number, selectedNumber} = item
    const classNameValue = `message${user !== userName ? ' message--reverted' : ''}`
    // добавить аватар первому ходу
    return (
      <div className={classNameValue} key={i}>
        <span className="message__avatar">{user && user[0]}</span>
        <p className="message__content">New number: {number}</p>
      </div>
    )
  }

  const handleLeaveRoom = () => {
    socket.emit('leaveRoom')
  }

  return (
    <div className="main-game-area">
      <div>
        <p>You are playing with</p>
        <button onClick={handleLeaveRoom}>Leave the room</button>
      </div>
      <div className='message-wrapper'>
        {moves && moves.map((move, i) => {
          return move && currentPlayerMessage(move, i)
        })}
      </div>
      <PlayButtons onPlayBtnClick={sendNumber} disabled={isUserTurn === GameState.WAIT} />
      <GameOverScreen />
    </div>
  )
}

export default GameInterface
