import authJwt from "../middlewares/authJwt";
import {
  allAccess,
  userBoard,
  moderatorBoard,
  adminBoard,
} from "../controllers/user.controller";
import { Router } from "express";

const userRouter = Router();

userRouter.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
});

userRouter.get("/api/test/all", allAccess);
userRouter.get("/api/test/user", [authJwt.verifyToken], userBoard);
userRouter.get(
  "/api/test/mod",
  [authJwt.verifyToken, authJwt.isModerator],
  moderatorBoard
);
userRouter.get(
  "/api/test/admin",
  [authJwt.verifyToken, authJwt.isAdmin],
  adminBoard
);
export default userRouter;
