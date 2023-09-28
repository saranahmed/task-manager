const express = require("express");
const tasks = require("./routes/tasks");
const connectDB = require("./db/dbconnect");
require("dotenv").config();

const app = express();

//middleware
app.use(express.json());

//routes

app.use("/api/v1/tasks", tasks);

const PORT = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
