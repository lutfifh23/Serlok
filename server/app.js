if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const userController = require("./controller/userController");
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
const port = process.env.port || 3000;
var cors = require("cors");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/login");
app.post("/login/google", userController.googleLogin);
let usersOnline = [];
io.on("connection", (socket) => {
  // console.log('welcome to socket ', socket.id);
  socket.emit("message", "hello dunia ku");

  if (socket.handshake.auth.name) {
    let userFound = false;
    usersOnline.forEach((user) => {
      if (user.name === socket.handshake.auth.name) {
        userFound = true;
        user.name = socket.handshake.auth.name;
        user.id = socket.id;
        user.position = socket.handshake.auth.position;
      }
    });
    if (!userFound) {
      usersOnline.push({
        id: socket.id,
        name: socket.handshake.auth.name,
        position: socket.handshake.auth.position,
      });
    }
    socket.emit("online:users", usersOnline);
    socket.on("update:location", (args) => {
      usersOnline.forEach((user) => {
        if (user.name === args.name) {
          user.position = args.position;
          //   socket.emit("online:users", usersOnline);
          io.emit("online:users", usersOnline);
        }
      });
    });
    socket.on("disconnect", (reason) => {
      // ...
      console.log(usersOnline, "list user");
      usersOnline = usersOnline.filter(
        (user) => user.name !== socket.handshake.auth.name
      );
      io.emit("online:users", usersOnline);
      console.log(socket.handshake.auth.name, " disconnected", usersOnline);
    });
  }

  //   console.log(usersOnline);
});

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
