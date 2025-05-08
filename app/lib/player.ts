import { playerToken } from "./definitions";

const player = (token: playerToken, name: string) => {
  let playerName = name;
  const playerToken = token;

  return { playerName, playerToken };
};

export default player;
