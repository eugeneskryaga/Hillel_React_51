import type { ChangeEvent } from "react";
import type { Sort } from "../../types/types";

interface Props {
  search: string;
  sort: Sort;
  onSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  onSort: (event: ChangeEvent<HTMLSelectElement>) => void;
  onToggleHighlight: () => void;
}

export const Controls = ({
  search,
  sort,
  onSearch,
  onSort,
  onToggleHighlight,
}: Props) => {
  return (
    <>
      <label>
        Пошук:
        <input
          type="text"
          value={search}
          onChange={onSearch}
        />
      </label>

      <select
        value={sort}
        onChange={onSort}
      >
        <option value="name">За ім'ям</option>
        <option value="age">За віком</option>
      </select>

      <button onClick={onToggleHighlight}>Обрати старших 30</button>
    </>
  );
};
