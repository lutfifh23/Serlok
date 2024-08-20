import { useState } from "react";
import { createContext } from "react";
import socket from "../helpers/socket";
import { useEffect } from "react";

export const UsersContext = createContext({
  users: [],
  updateData: () => {},
});

export default function UsersProvider(props) {
  const [users, setUsers] = useState([]);

  function updateData(data) {
    console.log("APDET DATA");
    setUsers(data);
  }
  // doSomething(position.coords.latitude, position.coords.longitude);

  return (
    <UsersContext.Provider value={{ users: users, updateData: updateData }}>
      {props.children}
    </UsersContext.Provider>
  );
}
