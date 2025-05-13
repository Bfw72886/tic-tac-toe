"use client";

import Board from "@/app/ui/Board";
import { useState } from "react";
import { getCurrentBoard } from "./lib/tic-tac-toe";

export default function Page() {
  const [board, setBoard] = useState(getCurrentBoard);

  return (
    <div>
      <Board board={board} />
    </div>
  );
}
