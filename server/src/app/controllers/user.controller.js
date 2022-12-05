import asyncHandler from "express-async-handler";
import User from "../models/user.model";

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
    const users = await User.find({}, { password: 0 }).populate('roles');
    res.json(users);
  } catch (error) {
    return res.status(200).send({ error });
  }
});
