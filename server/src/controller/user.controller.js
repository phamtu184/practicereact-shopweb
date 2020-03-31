let User = require('../models/user.model');


module.exports.userlist = function (req, res) {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error:' + err))
}
