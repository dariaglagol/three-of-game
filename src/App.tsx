import React, {useCallback, useEffect, useState} from 'react'

import { useAppSelector, useAppDispatch } from './store/hooks'
import useSocket from './hooks/useSocket'
import {socket} from './store/service'
import {setUser} from './store/userDataSlice'

import AppHeader from './consponents/appHeader'
import LoginForm from './consponents/loginForm'
import RoomsMenu from './consponents/roomMenu'
import GameInterface from './consponents/GameInterface'

import './App.css'

function App() {
  const dispatch = useAppDispatch()

  const [userName, setUserName] = useState(null)
  const [room, setRoom] = useState(null)
  const [isGameStarted, setIsGameStarted] = useState(false)

  const {rooms} = useAppSelector(state => state.rooms)

  useSocket()

  useEffect(() => {
    dispatch({type: 'USER_FETCH_REQUESTED'})
  }, [])

  useEffect(() => {
    socket.on('message', (data: any) => {
      console.log('data', data)
      if (data.user && !userName) {
        setUserName(data.user)
        dispatch(setUser(data.user))
      }
      if (data.room) {
        setRoom(data.room)
      }
    })

    socket.on('error', (data: any) => {
      console.log('error', data)
    })
  }, [])

  const letsPlay = useCallback(()  => {
    socket.emit('letsPlay')
    setIsGameStarted(true)
  }, [])

  const loginHandler = useCallback((userName: string) => {
    socket.emit('login', {
      username: userName
    })
  }, [])

  // @todo надо изменить верстку логически, скорее всего на step
  return (
    <div className="App">
      <AppHeader opponentName={'123456789'} />
      <main>
        {!userName ? <LoginForm onSubmit={loginHandler} /> : (
          <>
            <RoomsMenu rooms={rooms} userName={userName} />
            <div className="container">
              {isGameStarted ? <GameInterface /> : room ? <button onClick={letsPlay} className="lets-play__button">Lets play!</button> : (
                <div>
                  <p className="login-form__header">Hello, {userName}!</p>
                  <p className="login-form__header">Please, choose room for your game</p>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
