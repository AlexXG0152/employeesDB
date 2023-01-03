// import { secret } from "../config/auth.config.js";
import dotenv from "dotenv";
dotenv.config({ path: "../../environments/.env" });
import User from "../models/user.model.js";
import Role from "../models/role.model.js";

import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";

export async function signup(req, res) {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcryptjs.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      return res.status(500).send({ message: err });
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            return res.status(500).send({ message: err });
          }

          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              return res.status(500).send({ message: err });
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          return res.status(500).send({ message: err });
        }

        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            return res.status(500).send({ message: err });
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
}

export async function signin(req, res) {
  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        return res.status(500).send({ message: err });
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcryptjs.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res
          .status(401)
          .send({ accessToken: null, message: "Invalid Password!" });
      }

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }

      const token = jsonwebtoken.sign(
        {
          id: user._id,
        },
        process.env.ACCESS_SECRET,
        { expiresIn: "30m" }
      );

      const refreshToken = jsonwebtoken.sign(
        {
          id: user._id,
        },
        process.env.REFRESH_SECRET,
        { expiresIn: "1w" }
      );

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        token: token,
      });
    });
}

export async function refresh(req, res) {
  try {
    const token = jsonwebtoken.sign(
      {
        id: req.userId,
      },
      process.env.ACCESS_SECRET,
      { expiresIn: "30m" }
    );
    return res.status(200).send({token});
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized!" });
  }
}

export async function signout(req, res) {
  try {
    res.cookie("refreshToken", "", { maxAge: 0 });
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
}
