import { cellValue } from "@/app/types/cellValue";
import Symbol from "@/app/ui/Symbol";

type PageProps = {
  board: cellValue[][];
};

export default function Board({ board }: PageProps) {
  const symbolList = board.map((row, rowIndex) =>
    row.map((element, colIndex) => {
      return (
        <Symbol
          value={element}
          row={rowIndex}
          col={colIndex}
          key={`${rowIndex}${colIndex}`}
        />
      );
    })
  );

  return <div className="grid grid-rows-3 grid-cols-3">{symbolList}</div>;
}
