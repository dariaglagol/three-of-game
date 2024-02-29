export const getRooms = (isMockRest = false) => fetch('http://localhost:3004/rooms')
  .then((response) => response.json())
  .then((data) => data)
  .catch((error) => console.error(error));

export const getUsers = (isMockRest = false) => fetch('http://localhost:3004/users')
  .then((response) => response.json())
  .then((data) => data)
  .catch((error) => console.error(error));
