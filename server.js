const express = require("express");
const app = express();
const cors = require("cors");
const dbconnection = require("./config/dbconnect");
dbconnection();
require("dotenv").config();
const PORT = process.env.PORT;
const { userroute } = require("./routes/charrouter");
const chatroute = require("./routes/chatRoute");
const { notFound, errorHandler } = require("./middleware/errorHandeler");
const messageRoute = require("./routes/messageRoute");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/user", userroute);
app.use("/api/chat", chatroute);
app.use("/api/message", messageRoute);

app.use(notFound);
app.use(errorHandler);

let server = app.listen(PORT, () => {
  console.log(`server running in ${PORT}`);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");

  socket.on("setup", (userdata) => {
    socket.join(userdata._id);
    console.log(userdata._id);
    socket.emit("connected");
  });
  socket.on("joinChat", (room) => {
    socket.join(room);
    console.log("user join room " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));

  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("newMessage", (newMessageRecived) => {
    var chat = newMessageRecived.chat;
    if (!chat.users) return console.log("chat.user not defined");
    chat.users.forEach((user) => {
      console.log(user);
      if (user._id === newMessageRecived.sender._id) return;
      socket.in(user._id).emit("message recieved", newMessageRecived);
    });
  });
  socket.off("setup", () => {
    console.log("user disconnected");
    socket.leave(userdata._id);
  });
});
