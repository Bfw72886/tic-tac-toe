import Symbol from "@/app/ui/Symbol";
import { cellValue } from "@/app/types/cellValue";

export default function Page() {
  return (
    <div>
      <Symbol value={cellValue.NONE} />
      <Symbol value={cellValue.X} />
      <Symbol value={cellValue.O} />
    </div>
  );
}
