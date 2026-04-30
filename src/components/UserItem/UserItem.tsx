import { memo } from "react";
import type { User } from "../../types/types";
import css from "./UserItem.module.css";

interface Props {
  item: User;
  onSelect: (id: User["id"]) => void;
  isSelected: boolean;
  isHighlighted: boolean;
}

export const UserItem = memo(
  ({ item, onSelect, isSelected, isHighlighted }: Props) => {
    const className = `
   ${css.card}
    ${isSelected ? css.selected : ""}
    ${!isSelected && isHighlighted ? css.highlighted : ""}`;
    console.log("Рендеримо ", item.name);
    return (
      <div
        onClick={() => onSelect(item.id)}
        className={className}
      >
        <strong>User name: {item.name}</strong>
        <p>User age: {item.age}</p>
      </div>
    );
  },
);
