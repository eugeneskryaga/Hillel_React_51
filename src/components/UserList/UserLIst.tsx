import { useCallback, useMemo, useState } from "react";
import type { Sort, User } from "../../types/types";
import { UserItem } from "../UserItem/UserItem";

interface Props {
  data: User[];
  sort: Sort;
  search: string;
  highlight30: boolean;
}

export const UserList = ({ data, search, sort, highlight30 }: Props) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

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

  const handleSelectUser = useCallback((id: string) => {
    setSelectedUsers(prev =>
      prev.includes(id) ? prev.filter(userId => userId !== id) : [...prev, id],
    );
  }, []);

  return (
    <>
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
