import { mongo } from "mongoose";

export async function createInDB(req, res, modelName) {
  try {
    const data = await modelName.create(req.body.details);
    res.json(data);
  } catch (error) {
    return res.status(200).send({ error: "Operation failed!" });
  }
}

export async function readFromDB(req, res, modelName) {
  try {
    const data = await modelName.find({
      employeeID: Number(req.params.id),
    });
    res.json(data);
  } catch (error) {
    return res.status(200).send({ error: "Operation failed!" });
  }
}

export async function updateInDB(req, res, modelName) {
  try {
    const data = await modelName.findOneAndUpdate(
      { _id: new mongo.ObjectId(req.body.details._id) },
      req.body.details,
      { new: true }
    );
    res.json(data);
  } catch (error) {
    return res.status(200).send({ error: "Operation failed!" });
  }
}

export async function deleteFromDB(req, res, modelName) {
  try {
    const data = await modelName.findOneAndRemove({
      _id: new mongo.ObjectId(req.body._id),
    });
    res.json(data);
  } catch (error) {
    return res.status(200).send({ error });
  }
}
