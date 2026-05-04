import { UserList } from "../UserList/UserLIst";
import { users } from "../../data/usersData";
import { Controls } from "../Controls/Controls";
import { useCallback, useState, type ChangeEvent } from "react";
import type { Sort, User } from "../../types/types";

export const App = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<Sort>("none");
  const [highlight30, setHighlight30] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<User["id"][]>([]);

  const handleSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);

  const handleSort = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) =>
      setSort(event.target.value as Sort),

    [],
  );

  const handleToggleHighlight = useCallback(() => {
    setHighlight30(prev => !prev);
  }, []);

  const handleSelectUser = useCallback((id: User["id"]) => {
    setSelectedUsers(prev =>
      prev.includes(id) ? prev.filter(userId => userId !== id) : [...prev, id],
    );
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
        selectedUsers={selectedUsers}
        onSelectUser={handleSelectUser}
      />
    </main>
  );
};
