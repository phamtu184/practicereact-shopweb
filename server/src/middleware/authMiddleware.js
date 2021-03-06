const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.body.authToken;
  if (!token) res.status(401).json({ msg: "No token, authorizaton denied" });
  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    req.user = decoded;
    next();
  } catch (e) {
    console.log(e);
  }
}

module.exports = auth;
