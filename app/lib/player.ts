import { cellValue } from "@/app/types/cellValue";

const player = (token: cellValue, name: string) => {
  let playerName = name;
  const playerToken = token;

  return { playerName, playerToken };
};

export default player;
