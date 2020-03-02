let User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports.postLogin = function(req, res){
  const {username, password} = req.body;
  if(!username||!password){
    return res.status(400).json({msg:'Không có username, password'})
  }
  User.findOne({username})
  .then(user=>{
    if(!user){
      return res.json('notuser');
    }
    bcrypt.compare(password, user.password)
    .then(isMatch=>{
      if(!isMatch){
        return res.json('wrongpw');
      }
      jwt.sign(
        { id: user.id, username: user.username, role: user.role, email: user.email },
        process.env.JWTSECRET,
        { expiresIn: 1000*60*60*24 },
        (err, token) => {
          if(err) throw err;
          res.cookie('xauthtoken', token, { maxAge: 1000*60*60*24, httpOnly: true});
          User.findByIdAndUpdate(user.id, {token:token}).then();
          res.json({
            token,
            user: {
              id: user.id,
              username: user.username
            }
          });
        }
      )
    })
  })
}
module.exports.register = async function(req, res, next){
  const {username, phone, email, password} = req.body;
  const role = 2;
  const newUser = new User({username, phone, email, password, role});
  const te = await User.find({username: username});
  if(te.length>0){
    res.json("exist")
  }
  else{
    newUser.save()
    .then(user=>{
      jwt.sign(
        { id: user.id, username: user.username, role: user.role, email: user.email},
        process.env.JWTSECRET,
        { expiresIn: 1000*60*60*24 },
        (err, token) => {
          if(err) throw err;
          res.cookie('xauthtoken', token, { maxAge: 1000*60*60*24, httpOnly: true});
          User.findByIdAndUpdate(user.id, {token:token}).then();
          res.json({
            token,
            user: {
              id: user.id,
              username: user.username
            }
          });
        }
      )
    })
    .catch(err =>console.log(err));
  }
}

module.exports.islogin = async function(req, res){
  const token = req.cookies.xauthtoken;
  if(!token) res.json('login:false');
  try{
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    res.json(decoded);
  }catch(e){
    console.log('token faile');
  }
}
module.exports.islogout = function(req, res){
  try{
    res.clearCookie("xauthtoken");
    return res.sendStatus(200);
  }
  catch(e){
    console.log(e)
  }
}

module.exports.userlist = function(req, res){
  User.find()
  .then(users => res.json(users))
  .catch(err => res.status(400).json('Error:'+err))
}
