const jwt = require('jsonwebtoken');

function auth(req, res, next){
  const token = req.cookies.xauthtoken;
  if(!token) res.status(401).json({msg:'No token, authorizaton denied'});
  try{
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    req.user = decoded;
    next();
  }catch(e){
    res.status(400).json({msg:'Token is not valid'})
  }
}

module.exports = auth;