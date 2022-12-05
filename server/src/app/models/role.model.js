import { model, Schema } from "mongoose";

const Role = model(
  "Role",
  new Schema({
    name: String
  },
  { timestamps: true })
);

export default Role;
