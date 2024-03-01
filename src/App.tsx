import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
} from 'react';

import { useAppSelector, useAppDispatch } from './store/hooks';
import { initSocket, login, startGame } from './slices/SocketSlice';

import AppHeader from './consponents/appHeader';
import LoginForm from './consponents/loginForm';
import RoomsMenu from './consponents/roomMenu';
import GameInterface from './consponents/gameInterface';
import GameOverScreen from './consponents/gameOver';

import './App.css';

function App() {
  const dispatch = useAppDispatch();

  const { rooms } = useAppSelector((state) => state.rooms);
  const userName = useAppSelector((state) => state.socket.login);
  const currentGameStep = useAppSelector((state) => state.socket.step);

  useEffect(() => {
    dispatch({ type: 'ROOMS_FETCH_REQUESTED' });
    dispatch(initSocket());
  }, [dispatch]);

  const letsPlay = useCallback(() => {
    dispatch(startGame());
  }, [dispatch]);

  const loginHandler = useCallback((user: string) => {
    dispatch(login({ username: user }));
  }, [dispatch]);

  const mainLayout = useCallback((children: ReactNode) => (
    <>
      <RoomsMenu rooms={ rooms } />
      <div className="container">
        { children }
      </div>
    </>
  ), [rooms]);

  const getUI = useMemo(() => {
    let screen = null;
    switch (currentGameStep) {
      case 'joinRoom':
      case 'leave':
        screen = mainLayout(<div>
          <p className="login-form__header">Hello, { userName }!</p>
          <p className="login-form__header">Please, choose room for your game</p>
        </div>);
        break;
      case 'playPrep':
        screen = mainLayout(<button onClick={ letsPlay } className="lets-play__button button">Lets play!</button>);
        break;
      case 'play':
        screen = <GameInterface />;
        break;
      case 'gameOver':
        screen = <GameOverScreen />;
        break;
      case 'login':
      default:
        screen = <LoginForm onSubmit={ loginHandler } />;
        break;
    }

    return screen;
  }, [currentGameStep, userName, letsPlay, loginHandler, mainLayout]);

  return (
    <div className="App">
      <AppHeader />
      <main>
        { getUI }
      </main>
    </div>
  );
}

export default App;
