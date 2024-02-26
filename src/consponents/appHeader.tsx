import React from 'react'
import './style.css'

type AppHeaderType = {
  opponentName: string
}

const AppHeader = (props: AppHeaderType) => {
  const {opponentName} = props

  return (
    <header className="App-header">
      <img src="./logo.svg" alt="Logo of TakeAway" className="App-header__logo" />
      <p className="App-header__header header-text">Playing with {opponentName}</p>
      <p className="App-header__subheader header-text">Win the game or win the job</p>
    </header>
  )
}

export default AppHeader