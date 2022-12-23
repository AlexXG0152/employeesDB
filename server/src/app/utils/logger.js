import winston from "winston";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
};

const level = () => {
  const env = process.env.NODE_ENV || "development";
  const isDevelopment = env === "development";
  return isDevelopment ? "debug" : "warn";
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
  verbose: "white",
  silly: "white",
};

winston.addColors(colors);

const transports = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.align(),
      winston.format.timestamp({ format: "DD.MM.YYYY HH:mm:ss:ms" }),
      winston.format.colorize({ all: true }),
      winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`
      )
    ),
  }),
  new winston.transports.File({
    filename: "logs/error.log",
    level: "error",
    maxsize: 1024 * 1024 * 10,
    format: winston.format.combine(
      winston.format.align(),
      winston.format.json(),
      winston.format.timestamp({ format: "DD.MM.YYYY HH:mm:ss:ms" }),
      winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`
      )
    ),
  }),
  new winston.transports.File({
    filename: "logs/all.log",
    maxsize: 1024 * 1024 * 10,
    format: winston.format.combine(
      winston.format.align(),
      winston.format.json(),
      winston.format.timestamp({ format: "DD.MM.YYYY HH:mm:ss:ms" }),
      winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`
      )
    ),
  }),
];

const logger = winston.createLogger({
  level: level(),
  levels,
  transports,
});

export default logger;
