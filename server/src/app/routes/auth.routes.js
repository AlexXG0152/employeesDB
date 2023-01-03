import { signup, signin, signout, refresh } from "../controllers/auth.controller.js";
import authJwt from "../middlewares/authJwt.js";
import { Router } from "express";
import verifySignUp from "../middlewares/verifySignUp.js"

const authRouter = Router();

// authRouter.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
//   res.header("Access-Control-Allow-Credentials", "true");
//   next();
// });

authRouter.post(
  "/api/auth/signup",
  [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  signup
);

authRouter.post("/api/auth/signin", signin);

authRouter.post("/api/auth/signout", signout);
authRouter.post("/api/auth/refresh", [authJwt.refreshToken], refresh);


export default authRouter;
