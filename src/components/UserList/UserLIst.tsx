import { useState, type ChangeEvent } from "react";
import type { User } from "../../types/types";
import { UserItem } from "../UserItem/UserItem";

interface Props {
  data: User[];
}

export const UserList = ({ data }: Props) => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("age");
  const filteredUsers = [...data]
    .filter(user => user.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "name") {
        return a.name.localeCompare(b.name);
      }
      if (sort === "age") {
        return Number(a.age) - Number(b.age);
      }
      return 0;
    });

  const handleSearch = (
    event: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setSearch(event.target.value);
  };

  const handleSort = (
    event: ChangeEvent<HTMLSelectElement, HTMLSelectElement>,
  ) => {
    setSort(event.target.value);
  };

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
      <button>Обрати старших 30</button>
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id}>
            <UserItem item={user} />
          </li>
        ))}
      </ul>
    </>
  );
};
