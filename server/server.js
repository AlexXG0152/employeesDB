require("dotenv").config({ path: "./src/app/environments/.env" });
const express = require("express");
require("express-async-errors");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();
const PORT = process.env.PORT || 8080;

var corsOptions = {
  origin: ["http://localhost:4200", "http://localhost:8080"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "empl-session",
    keys: ["key1", "key2"],
    secret: process.env.COOKIE_SECRET,
    httpOnly: true,
  })
);

const db = require("./src/app/models");
const Role = db.role;

db.mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to empl application." });
});

require("./src/app/routes/auth.routes")(app);
require("./src/app/routes/user.routes")(app);
require("./src/app/routes/employee.routes")(app);
require("./src/app/routes/employeeEducation.routes")(app);
require("./src/app/routes/employeeGrowthPlan.routes")(app);
require("./src/app/routes/upload.routes")(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.error("error", err);
        }
        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.error("error", err);
        }
        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.error("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}
