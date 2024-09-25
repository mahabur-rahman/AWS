import { useEffect, useState } from "react";
import axios from "axios";

// Define the User interface based on the expected structure from the API
interface User {
  id: number;
  name: string;
  email: string;
}

export default function ApiCall() {
  const [users, setUsers] = useState<User[]>([]); // Type the state as an array of User

  const fetchUsers = async () => {
    try {
      const response = await axios.get<User[]>("https://jsonplaceholder.typicode.com/users");
      setUsers(response.data); // Type safety ensured
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  console.log(users);

  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </>
  );
}
