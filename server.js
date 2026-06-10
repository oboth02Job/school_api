const express = require("express")
const app = express()
const port = 3000;
const coursesRoutes = require("./routes/coursesRoutes");
const lessonsRoutes = require("./routes/lessonsRoutes");
const studentRoutes = require("./routes/studentRoutes");
const dotenv = require("dotenv").config();
const mongodb = require("./data/database");
const cors = require("cors")


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello from Server")
})

app.use("/api-docs", require("./routes/swagger"));
app.use("/courses", require("./routes/coursesRoutes"));
app.use("/lessons", require("./routes/lessonsRoutes"));
app.use("/student", require("./routes/studentRoutes"));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  next();
});


mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`The server is running on port: ${port}`);
    });
  }
});