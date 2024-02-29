import React, {useCallback, useEffect, useState} from 'react'
import PlayButtons from './playButtons'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import GameOverScreen from './gameOver'
import {handleClick, selectLastMove, GameState, leaveRoom} from '../store/SocketSlice'

const GameInterface = () => {
  const dispatch = useAppDispatch()

  const moves = useAppSelector(state => state.socket.moves)
  const {number} = useAppSelector(state => selectLastMove(state))
  const userName = useAppSelector(state => state.socket.login)
  const isTurnActive = useAppSelector(state => state.socket.isTurnActive)

  const sendNumber = useCallback((value: number) => {
    dispatch(handleClick({
      number: Number(number),
      selectedNumber: value
    }))
  }, [number])

  const currentPlayerMessage = (item: any, i: number) => {
    const {user, number} = item

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
    dispatch(leaveRoom())
  }

  return (
    <div className="main-game-area">
      <div>
        <p>You are playing with</p>
        <button onClick={handleLeaveRoom}>Leave the room</button>
      </div>
      <div className="message-scrollable-wrapper">
        <div className="message-wrapper">
          <div>
            {moves && moves.map((move, i) => {
              return move && currentPlayerMessage(move, i)
            })}
          </div>
        </div>
      </div>

      <PlayButtons onPlayBtnClick={sendNumber} disabled={isTurnActive === GameState.WAIT} />
    </div>
  )
}

export default GameInterface
