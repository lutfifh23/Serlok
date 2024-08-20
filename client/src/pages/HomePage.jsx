import { useEffect } from "react";
import MapComponent from "../components/MapComponent";
import socket from "../helpers/socket";
import { useState } from "react";
import { useContext } from "react";
import { UsersContext } from "../contexts/UsersContext";

export default function HomePage() {
  const { users, updateData } = useContext(UsersContext);

  socket.on("online:users", (args) => {
    updateData(args);
  });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude, position.coords.longitude);
      socket.auth = {
        name: localStorage.getItem("name"),
        position: [position.coords.latitude, position.coords.longitude],
      };

      socket.disconnect().connect();
    });
  }, []);
  navigator.geolocation.watchPosition((position) => {
    socket.emit("update:location", {
      name: localStorage.getItem("name"),
      position: [position.coords.latitude, position.coords.longitude],
    });
    console.log(
      position.coords.latitude,
      position.coords.longitude,
      "<<<<NEW LOCATION"
    );
  });
  return (
    <>
      <MapComponent users={users} />
    </>
  );
}
