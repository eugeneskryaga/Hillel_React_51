import { UserList } from "../UserList/UserLIst";
import { users } from "../../data/usersData";

export const App = () => {
  return (
    <main>
      <UserList data={users} />
    </main>
  );
};
