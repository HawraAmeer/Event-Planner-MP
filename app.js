const express = require("express");

const db = require("./db/models");

const eventsRoutes = require("./routes/events");

const app = express();

app.use(express.json());

app.use("/events", eventsRoutes);

db.sequelize.sync();

app.listen(8000, () =>
  console.log("The application is running on localhost:8000")
);
