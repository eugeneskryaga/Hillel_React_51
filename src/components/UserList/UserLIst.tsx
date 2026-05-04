import { memo, useMemo } from "react";
import type { Sort, User } from "../../types/types";
import { UserItem } from "../UserItem/UserItem";

interface Props {
  data: User[];
  sort: Sort;
  search: string;
  highlight30: boolean;
  selectedUsers: User["id"][];
  onSelectUser: (id: User["id"]) => void;
}

export const UserList = memo(
  ({ data, search, sort, highlight30, selectedUsers, onSelectUser }: Props) => {
    const filteredUsers = useMemo(
      () =>
        [...data]
          .filter(user =>
            user.name.toLowerCase().includes(search.toLowerCase()),
          )
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

    return (
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id}>
            <UserItem
              item={user}
              onSelect={onSelectUser}
              isSelected={selectedUsers.includes(user.id)}
              isHighlighted={highlight30 && user.age > 30}
            />
          </li>
        ))}
      </ul>
    );
  },
);
