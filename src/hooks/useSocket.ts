import {useEffect} from 'react'

import {socket} from '../store/service'
import {addNewMove} from '../store/gameMoveSlice'

const useSocket = () => {
  // useEffect(() => {
  //   socket.emit('connection');
  //   return () => {
  //     socket.emit('disconnect')
  //   }
  // }, [])
}

export default useSocket