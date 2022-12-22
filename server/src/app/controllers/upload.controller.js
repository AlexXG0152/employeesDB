import dotenv from "dotenv";
dotenv.config({ path: "./src/environments/.env" });

import upload from "../middlewares/upload";
import { MongoClient } from "mongodb";
import { GridFSBucket } from "mongodb";

const baseUrl = "http://localhost:8080/files/";

const mongoClient = new MongoClient(process.env.MONGODBUPLOAD);

const uploadFiles = async (req, res) => {
  try {
    await upload(req, res);
    // console.log(req.files);

    if (req.files.length <= 0) {
      return res
        .status(400)
        .send({ message: "You must select at least 1 file." });
    }

    return res.status(200).send({
      message: "Files have been uploaded.",
    });
  } catch (error) {
    console.log(error);

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).send({
        message: "Too many files to upload.",
      });
    }
    return res.status(500).send({
      message: `Error when trying upload many files: ${error}`,
    });
  }
};

const getListFiles = async (req, res) => {
  try {
    await mongoClient.connect();

    const database = mongoClient.db(process.env.DATABASE);
    const images = database.collection(process.env.FILESBUCKET + ".files");
    const cursor = images.find({});

    if ((await images.estimatedDocumentCount()) === 0) {
      return res.status(500).send({
        message: "No files found!",
      });
    }

    let fileInfos = [];
    await cursor.forEach((doc) => {
      fileInfos.push({
        name: doc.filename,
        url: baseUrl + doc.filename,
      });
    });

    return res.status(200).send(fileInfos);
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const getEmployeeFiles = async (req, res) => {
  try {
    await mongoClient.connect();

    const database = mongoClient.db(process.env.DATABASE);
    const images = database.collection(process.env.FILESBUCKET + ".files");
    const cursor = images.find({ "metadata.employeeID": req.params.id });

    if ((await images.estimatedDocumentCount()) === 0) {
      return res.status(500).send({
        message: "No files found!",
      });
    }

    let fileInfos = [];
    await cursor.forEach((doc) => {
      fileInfos.push({
        name: doc.filename,
        url: baseUrl + doc.filename,
        metadata: doc.metadata,
      });
    });

    return res.status(200).send(fileInfos);
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const download = async (req, res) => {
  try {
    await mongoClient.connect();

    const database = mongoClient.db(process.env.DATABASE);
    const bucket = new GridFSBucket(database, {
      bucketName: process.env.FILESBUCKET,
    });

    let downloadStream = bucket.openDownloadStreamByName(req.params.name);

    downloadStream.on("data", function (data) {
      return res.status(200).write(data);
    });

    downloadStream.on("error", function (err) {
      return res.status(404).send({ message: "Cannot download the File!" });
    });

    downloadStream.on("end", () => {
      return res.end();
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

export default {
  uploadFiles,
  getListFiles,
  getEmployeeFiles,
  download,
};
