import { UserList } from "../UserList/UserLIst";
import { users } from "../../data/usersData";
import { Controls } from "../Controls/Controls";
import { useCallback, useState, type ChangeEvent } from "react";
import type { Sort } from "../../types/types";

export const App = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<Sort>("none");
  const [highlight30, setHighlight30] = useState(false);
  const handleSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
      setSearch(event.target.value);
    },
    [],
  );

  const handleSort = useCallback(
    (event: ChangeEvent<HTMLSelectElement, HTMLSelectElement>) =>
      setSort(event.target.value as Sort),

    [],
  );

  const handleToggleHighlight = useCallback(() => {
    setHighlight30(prev => !prev);
  }, []);
  return (
    <main>
      <Controls
        search={search}
        sort={sort}
        onSearch={handleSearch}
        onSort={handleSort}
        onToggleHighlight={handleToggleHighlight}
      />
      <UserList
        data={users}
        search={search}
        sort={sort}
        highlight30={highlight30}
      />
    </main>
  );
};
