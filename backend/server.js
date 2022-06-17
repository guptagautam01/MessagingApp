const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const app = express();
dotenv.config();

connectDB();

app.use(express.json()); // to accept JSON data

app.get("/", (req, res) => {
  res.send("API is running sucessfully");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server start on PORT ${PORT}`));

const io = require('socket.io')(server, {
  pingTimeout : 60000,
  cors:{
    origin: "http://localhost:3000",
  }
});

io.on("connection", (socket) => {
  console.log("connected to socket.io")
  socket.on('setup', (userData) => {
    socket.join(userData._id);
    console.log(userData._id);
    socket.emit('connected');
  })
})
 