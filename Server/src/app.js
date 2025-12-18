const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const path = require("path");


// Middlewares
app.use(cors());
app.use(express.json());



app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);


const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const RSVPRoutes = require("./routes/RSVPRoutes");
const userRoutes = require("./routes/userRoutes");



app.use("/api/RSVP", RSVPRoutes);

app.use("/api/events", eventRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);



// Test route
app.get("/", (req, res) => {
  res.send("API running...");
});

module.exports = app;
