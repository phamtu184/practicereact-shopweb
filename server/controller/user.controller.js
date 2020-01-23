let User = require('../models/user.model');

module.exports.login = function(req, res){
  res.json({sayHi: 'hello from server, nice to meet you'})
}

module.exports.register = function(req, res){
  res.send('Register');
}

module.exports.userlist = async function(req, res){
  User.find()
  .then(users => res.json(users))
  .catch(err => res.status(400).json('Error:'+err))
}