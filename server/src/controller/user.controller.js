let User = require('../models/user.model');
const jwt = require('jsonwebtoken')

module.exports.postLogin = function(req, res){
  res.json({sayHi: 'hello from server, nice to meet you'})
}

module.exports.register = async function(req, res){
  const {fullname, phone, email, password, role} = req.body;
  const newUser = new User({fullname, phone, email, password, role});
  const te = await User.find({email: email});
  if(te.length>0){
    res.json("exist")
  }
  else{
    newUser.save()
    .then((user) =>{
      jwt.sign(
        {id: user.id},
        process.env.jwtSecret,
        {expiresIn:3600}
      )
      res.json('added')
    })
    .catch(err => res.status(400).json('err: '+err));
  }
}

module.exports.userlist = async function(req, res){
  User.find()
  .then(users => res.json(users))
  .catch(err => res.status(400).json('Error:'+err))
}