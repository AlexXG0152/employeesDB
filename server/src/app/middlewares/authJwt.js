import jsonwebtoken from "jsonwebtoken";
// import { secret } from "../config/auth.config.js";
import dotenv from "dotenv";
dotenv.config({ path: "../../environments/.env" });
import User from "../models/user.model.js";
import Role from "../models/role.model.js";

const verifyToken = (req, res, next) => {
  const token = req.header("authorization")?.split(" ")[1] || "";

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jsonwebtoken.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

const refreshToken = (req, res, next) => {
  const refreshToken = req.cookies["refreshToken"];

  if (!refreshToken) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jsonwebtoken.verify(
    refreshToken,
    process.env.REFRESH_SECRET,
    (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.userId = decoded.id;
      next();
    }
  );
};

const isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      return res.status(500).send({ message: err });
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          return res.status(500).send({ message: err });
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        return res.status(403).send({ message: "Require Admin Role!" });
      }
    );
  });
};

const isModerator = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      return res.status(500).send({ message: err });
    }
    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          return res.status(500).send({ message: err });
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }
        }

        return res.status(403).send({ message: "Require Moderator Role!" });
      }
    );
  });
};

const authJwt = {
  verifyToken,
  refreshToken,
  isAdmin,
  isModerator,
};
export default authJwt;
