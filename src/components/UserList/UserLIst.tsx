import { useCallback, useMemo, useState, type ChangeEvent } from "react";
import type { Sort, User } from "../../types/types";
import { UserItem } from "../UserItem/UserItem";
import { Controls } from "../Controls/Controls";

interface Props {
  data: User[];
}

export const UserList = ({ data }: Props) => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<Sort>("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [highlight30, setHighlight30] = useState(false);

  const filteredUsers = useMemo(
    () =>
      [...data]
        .filter(user => user.name.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
          if (sort === "name") {
            return a.name.localeCompare(b.name);
          }
          if (sort === "age") {
            return a.age - b.age;
          }
          return 0;
        }),
    [data, search, sort],
  );

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

  const handleSelectUser = useCallback((id: string) => {
    setSelectedUsers(prev =>
      prev.includes(id) ? prev.filter(userId => userId !== id) : [...prev, id],
    );
  }, []);

  const handleToggleHighlight = useCallback(() => {
    setHighlight30(prev => !prev);
  }, []);

  return (
    <>
      <Controls
        search={search}
        sort={sort}
        onSearch={handleSearch}
        onSort={handleSort}
        onToggleHighlight={handleToggleHighlight}
      />
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id}>
            <UserItem
              item={user}
              onSelect={handleSelectUser}
              isSelected={selectedUsers.includes(user.id)}
              isHighlighted={highlight30 && user.age > 30}
            />
          </li>
        ))}
      </ul>
    </>
  );
};
