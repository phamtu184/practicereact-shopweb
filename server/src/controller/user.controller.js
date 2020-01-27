let User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports.postLogin = function(req, res){
  const {email, password} = req.body;
  if(!email||!password){
    return res.status(400).json({msg:'Không có email, password'})
  }
  User.findOne({email})
  .then(user=>{
    if(!user){
      res.json('notuser');
    }
    bcrypt.compare(password, user.password)
    .then(isMatch=>{
      if(!isMatch){
        return res.json('wrongpw');
      }
      jwt.sign(
        { id: user.id },
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
              name: user.name,
              email: user.email
            }
          });
        }
      )
    })
  })
}
module.exports.register = async function(req, res){
  const {fullname, phone, email, password, role, confirmed} = req.body;
  const newUser = new User({fullname, phone, email, password, role, confirmed});
  const te = await User.find({email: email});
  if(te.length>0){
    res.json("exist")
  }
  else{
    newUser.save()
    .then(() =>{
      res.json('added')
    })
    .catch(err => res.status(400).json('err: '+err));
  }
}

module.exports.userlist = function(req, res){
  User.find()
  .then(users => res.json(users))
  .catch(err => res.status(400).json('Error:'+err))
  //res.send(req.user)
}

module.exports.confirmEmail = function(req, res){
  res.send('confirm email')
}