// @ts-ignore
import io from 'socket.io-client';
export const getRooms = (isMockRest = false) => {
  return fetch('http://localhost:3004/rooms')
    .then(response => response.json())
    .then(data => {
      return data
    })
    .catch(error => console.error(error));
}

export const getUsers = (isMockRest = false) => {
  return fetch('http://localhost:3004/users')
    .then(response => response.json())
    .then(data => {
      return data
    })
    .catch(error => console.error(error));
}

export const socket = io.connect('ws://localhost:8082');