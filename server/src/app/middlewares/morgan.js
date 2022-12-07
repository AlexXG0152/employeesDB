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
  return req.params[param];
});
morgan.token("body", function (req, res, param) {
  delete req.body.password
  return JSON.stringify(req.body);
});
morgan.token("userID", function (req, res, param) {
  return req.userId
});

export default morganMiddleware;
