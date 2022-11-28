const util = require("util");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const dbConfig = require("../config/db");

var storage = new GridFsStorage({
  url: dbConfig.url,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: async (req, file) => {
    const match = ["image/png", "image/jpeg", "image/jpg", "application/pdf"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-employee-${file.originalname}`;
      return filename;
    }

    return {
      filename: `${Date.now()}-employee-${file.originalname}`,
      bucketName: dbConfig.filesBucket,
      metadata: JSON.parse(req.body.data),
    };
  },
});

var uploadFiles = multer({ storage: storage }).array("file", 10);
var uploadFilesMiddleware = util.promisify(uploadFiles);

module.exports = uploadFilesMiddleware;
