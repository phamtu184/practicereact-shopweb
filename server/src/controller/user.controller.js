let User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
//var nodemailer = require('nodemailer');

module.exports.postLogin = function(req, res){
  const {email, password} = req.body;
  if(!email||!password){
    return res.status(400).json({msg:'Không có email, password'})
  }
  User.findOne({email})
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
        { id: user.id, name: user.fullname, role: user.role },
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
module.exports.register = async function(req, res, next){
  const {fullname, phone, email, password, confirmed} = req.body;
  const role = 2;
  const newUser = new User({fullname, phone, email, password, role, confirmed});
  const te = await User.find({email: email});
  if(te.length>0){
    res.json("exist")
  }
  else{
    newUser.save()
    .then(res.json('added'))
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

// module.exports.sendMail = async function(req, res){
//   const {email} = req.body;
//   const emailUser = await User.findOne({email});
//   const url = `http://localhost:3000/confirmation/${emailToken}`;
  // var transporter = nodemailer.createTransport({
  //   auth: {
  //     user: "481ntwayd@yahoo.com",
  //     pass: process.env.PASSWORDEMAIL
  //   }
  // });
//   const emailToken = jwt.sign(
//     {
//       id: emailUser.id,
//     },
//     process.env.EMAILJWT,
//     {
//       expiresIn: 1000*60*60*24,
//     }
//   ).then(
    // transporter.sendMail({
    //   to: email,
    //   subject: 'Confirm Email',
    //   html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
    // })
//   ) 
// }

module.exports.userlist = function(req, res){
  User.find()
  .then(users => res.json(users))
  .catch(err => res.status(400).json('Error:'+err))
}

// module.exports.confirmEmail = async function(req, res){
//   try{
//     const { user: {id}}= jwt.verify(req.params.token, process.env.EMAILJWT);
//     await User.findByIdAndUpdate(id, {confirmed: true});
//     console.log('success')
//   }
//   catch(e){
//     console.log('err')
//     res.send('error: '+e);
//   }
// }