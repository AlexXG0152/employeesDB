import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import cookieSession from "cookie-session";
import session from "express-session";
import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";
import { disablePoweredBy } from "./disablePoweredBy.js";

dotenv.config({ path: "../../environments/.env" });

export function secure(app) {
  const sess = {
    name: "empl-session",
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60,
      expires: new Date(Date.now() + 60 * 60 * 1000),
    },
  };
  app.use(session(sess));

  if (app.get("env") === "production") {
    app.set("trust proxy", 1); // trust first proxy
    sess.cookie.secure = true; // serve secure cookies
    sess.cookie.httpOnly = true;
    sess.cookie.sameSite = "none";
  }

  const corsOptions = {
    origin: [
      "https://alexxg0152.github.io",
      "https://employeesdb-qx39.onrender.com",
      "https://onrender.com",
      "http://localhost:4200",
      "http://localhost:8080",
    ],
    methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  };
  app.use(cors(corsOptions));

  // app.use(
  //   cookieSession({
  //     name: "empl-session",
  //     keys: ["key1", "key2"],
  //     secret: process.env.COOKIE_SECRET,
  //     maxAge: 60 * 60 * 1000,
  //     expires: new Date(Date.now() + 60 * 60 * 1000),
  //     secure: true,
  //     // httpOnly: true,
  //     sameSite: "none",
  //   })
  // );

  app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          scriptSrc: [
            "'self'",
            "'unsafe-inline'",
            "https://cdn.jsdelivr.net",
            "https://fonts.gstatic.com",
            "https://fonts.googleapis.com",
            "https://cdnjs.cloudflare.com",
          ],
        },
      },
    })
  );

  app.use(disablePoweredBy);

  const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 120,
    message: "Too many requests created from this IP, please try again later",
  });
  app.use(limiter);

  const speedLimiter = slowDown({
    windowMs: 1 * 60 * 1000,
    delayAfter: 100,
    delayMs: 1000,
  });
  app.use(speedLimiter);
}
