import dotenv from "dotenv";
import express, { json, urlencoded } from "express";
import router from "./src/app/routes/index.js";
import db from "./src/app/models/index.js";
import morganMiddleware from "./src/app/middlewares/morgan.js";
import { initial } from "./src/app/utils/initial_user_roles_db.js";
import { secure } from "./src/app/middlewares/secure.js";
import logger from "./src/app/utils/logger.js";
import compression from "compression";

dotenv.config({ path: "./src/environments/.env" });

const app = express();
secure(app);

const PORT = process.env.PORT || 8080;
app.set("trust proxy", 1);


app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static("assets"));
app.use(compression());

app.use(morganMiddleware);
app.use(router);

const Role = db.role;

db.mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    logger.info("Successfully connect to MongoDB.");
    await initial(Role);
  })
  .catch((err) => {
    logger.error("Connection error", err);
    process.exit();
  });

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}.`);
});
