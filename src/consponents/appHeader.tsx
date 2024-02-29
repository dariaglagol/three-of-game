import React from 'react'
import './style.css'

const AppHeader = () => (
  <header className="App-header">
    <img src="./logo.svg" alt="Logo of TakeAway" className="App-header__logo" />
    <p className="App-header__header header-text">Playing with real user or CPU</p>
    <p className="App-header__subheader header-text">Win the game or win the job</p>
  </header>
)

export default AppHeader