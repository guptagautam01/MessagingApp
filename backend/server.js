const express = require("express");
const dotenv = require("dotenv");
const {chats} = require("./data/data");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const app = express()
dotenv.config()

connectDB();

app.use(express.json()); // to accept JSON data

app.get("/", (req, res) => {
    res.send("API is running sucessfully");
});

app.use('/api/user', userRoutes)

app.use(notFound);
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server start on PORT ${PORT}`));

