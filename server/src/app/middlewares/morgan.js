import morgan from "morgan";
import logger from "../../utils/logger";

const stream = {
  write: (message) => logger.http(message.trim()),
};

const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};

const morganMiddleware = morgan(
  ':remote-addr - :remote-user [:date[clf]] ":method :url" "USERID::userID" :param[id] :body :status :res[content-length] ":referrer"',
  { stream, skip }
);

morgan.token("param", function (req, res, param) {
  try {
    return req.params[param];
  } catch (error) {
    console.log(error);
  }
});
morgan.token("body", function (req, res, param) {
  try {
    delete req.body.password;
    return JSON.stringify(req.body);
  } catch (error) {
    console.log(error);
  }
});
morgan.token("userID", function (req, res, param) {
  try {
    return req.userId;
  } catch (error) {
    console.log(error);
  }
});

export default morganMiddleware;
