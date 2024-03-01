// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getRooms = (isMockRest = false) => fetch('http://localhost:3004/rooms')
  .then((response) => response.json())
  .then((data) => data)
  .catch((error) => console.error(error));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getUsers = (isMockRest = false) => fetch('http://localhost:3004/users')
  .then((response) => response.json())
  .then((data) => data)
  .catch((error) => console.error(error));
