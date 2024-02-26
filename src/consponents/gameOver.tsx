import React, {useEffect, useState} from 'react'
import {socket} from '../store/service'
import {useAppSelector} from '../store/hooks'

const GameOverScreen = () => {
  const [winner, setWinner] = useState<string | null>(null)
  const {userData: userName} = useAppSelector(state => state.userData)

  useEffect(() => {
    socket.on('gameOver', (data: any) => {
      setWinner(data.user)
    })
  }, [])

  const handleLeaveClick = () => {
    socket.emit('leaveRoom')
  }

  const imageSrc = userName === winner ? './win.svg' : './lose.svg'
  const altText =  userName === winner ? 'Congratulations! You won!' : 'Sorry, you lost the game'

  return winner ? (
    <div className="game-over">
      <img src={imageSrc} alt={altText} />
      <h2>Gameover</h2>
      <p>Winner is {winner}</p>
      <button onClick={handleLeaveClick}>Leave the room</button>
    </div>
  ) : null
}

export default GameOverScreen