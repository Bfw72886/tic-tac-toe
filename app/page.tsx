"use client";

import Board from "@/app/ui/Board";
import { useState } from "react";
import { getCurrentBoard } from "./lib/tic-tac-toe";

export default function Page() {
  return (
    <div className="flex justify-center items-center">
      <Board />
    </div>
  );
}
