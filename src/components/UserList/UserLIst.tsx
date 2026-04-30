import { useCallback, useMemo, useState, type ChangeEvent } from "react";
import type { User } from "../../types/types";
import { UserItem } from "../UserItem/UserItem";

interface Props {
  data: User[];
}

export const UserList = ({ data }: Props) => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
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
            return Number(a.age) - Number(b.age);
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
    (event: ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {
      setSort(event.target.value);
    },
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
      <label>
        Пошук:
        <input
          type="text"
          name="search"
          onChange={event => handleSearch(event)}
        />
      </label>
      <select
        name="sort"
        onChange={event => handleSort(event)}
      >
        <option value="name">За ім'ям</option>
        <option value="age">За віком</option>
      </select>
      <button onClick={handleToggleHighlight}>Обрати старших 30</button>
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id}>
            <UserItem
              item={user}
              onSelect={handleSelectUser}
              isSelected={selectedUsers.includes(user.id)}
              isHighlighted={highlight30 && Number(user.age) > 30}
            />
          </li>
        ))}
      </ul>
    </>
  );
};
