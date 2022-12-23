import helmet from "helmet";
import cors from "cors";
import cookieSession from "cookie-session";
import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";
import { disablePoweredBy } from "./disablePoweredBy.js";

export function secure(app) {
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

  var corsOptions = {
    origin: ["http://localhost:4200", "http://localhost:8080"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  };
  app.use(cors(corsOptions));

  app.use(
    cookieSession({
      name: "empl-session",
      keys: ["key1", "key2"],
      secret: process.env.COOKIE_SECRET,
      maxAge: 60 * 60 * 1000,
      expires: new Date(Date.now() + 60 * 60 * 1000),
    })
  );

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
}
