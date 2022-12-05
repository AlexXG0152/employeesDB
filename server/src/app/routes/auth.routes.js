import { signup, signin, signout } from "../controllers/auth.controller";
import authJwt from "../middlewares/authJwt";
import { Router } from "express";
import verifySignUp from "../middlewares/verifySignUp"

const authRouter = Router();

authRouter.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

authRouter.post(
  "/api/auth/signup",
  [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  signup
);

authRouter.post("/api/auth/signin", signin);

authRouter.post("/api/auth/signout", signout);


export default authRouter;
