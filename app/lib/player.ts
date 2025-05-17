import { cellValue } from "@/app/types/cellValue";

const player = (token: cellValue, name: string) => {
  const playerName = name;
  const playerToken = token;

  return { playerName, playerToken };
};

export default player;
