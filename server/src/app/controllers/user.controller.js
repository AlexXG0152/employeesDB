import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import Role from "../models/role.model.js";

export function allAccess(req, res) {
  res.status(200).send("Public Content.");
}

export function userBoard(req, res) {
  res.status(200).send("User Content.");
}

export function adminBoard(req, res) {
  res.status(200).send("Admin Content.");
}

export function moderatorBoard(req, res) {
  res.status(200).send("Moderator Content.");
}

export const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({}, { password: 0, __v: 0 }).populate(
      "roles"
    );
    res.json(users);
  } catch (error) {
    return res.status(200).send({ error });
  }
});

export const updateOne = asyncHandler(async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(404);
      throw new Error("No employeeID in request");
    }
    if (!req.body) {
      res.status(400);
      throw new Error("No updateQuery data in request");
    }
    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        async (err, roles) => {
          if (err) {
            return res.status(500).send({ message: err });
          }

          req.body.roles = roles.map((role) => role._id);
          const user = await User.findOneAndUpdate(
            { _id: req.body._id },
            { roles: req.body.roles },
            { new: true }
          );
          res.json(user);
        }
      );
    }
  } catch (error) {
    return res.status(200).send({ error });
  }
});
