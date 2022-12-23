import dotenv from "dotenv";
dotenv.config({ path: "./src/environments/.env" });
import { promisify } from "util";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";

var storage = new GridFsStorage({
  url: process.env.MONGODBUPLOAD,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: async (req, file) => {
    const match = ["image/png", "image/jpeg", "image/jpg", "application/pdf"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-employee-${file.originalname}`;
      return filename;
    }

    return {
      filename: `${Date.now()}-employee-${file.originalname}`,
      bucketName: process.env.FILESBUCKET,
      metadata: JSON.parse(req.body.data),
    };
  },
});

var uploadFiles = multer({ storage: storage }).array("file", 10);
var uploadFilesMiddleware = promisify(uploadFiles);

export default uploadFilesMiddleware;
