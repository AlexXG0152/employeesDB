export function disablePoweredBy(req, res, next) {
  res.setHeader("X-Powered-By", "PHP/5.1.5");
  next();
}
