import type { User } from "../../types/types";

interface Props {
  item: User;
}

export const UserItem = ({ item }: Props) => {
  return (
    <>
      <strong>User name: {item.name}</strong>
      <p>User age: {item.age}</p>
    </>
  );
};
