import dotenv from "dotenv";
import express, { json, urlencoded } from "express";
import router from "../server/src/app/routes/index";
import db from "./src/app/models/index";
import morganMiddleware from "./src/app/middlewares/morgan";
import expressAsyncErrors from "express-async-errors";
import logger from "../server/src/utils/logger";
import cors from "cors";
import cookieSession from "cookie-session";

dotenv.config({ path: "./src/app/environments/.env" });

const app = express();
const PORT = process.env.PORT || 8080;

var corsOptions = {
  origin: ["http://localhost:4200", "http://localhost:8080"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));
app.use(express.static('assets'))

app.use(
  cookieSession({
    name: "empl-session",
    keys: ["key1", "key2"],
    secret: process.env.COOKIE_SECRET,
    httpOnly: true,
  })
);

app.use(morganMiddleware);
app.use(router);

const Role = db.role;

db.mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    logger.error("Connection error", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to empl application." });
});

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}.`);
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
