import { useState, useEffect } from "react";
import axios from "axios";

export default function useUser() {
  const [users, setUsers] = useState([]);

  //get users
  const getUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/user/get-user");
      setUsers(data?.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return users;
}
