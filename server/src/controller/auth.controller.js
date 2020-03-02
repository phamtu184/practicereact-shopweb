const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
let User = require('../models/user.model');

module.exports.sendMail = async function(req, res){
  const token = req.cookies.xauthtoken;
  if(!token) res.status(401).json({msg:'No token, authorizaton denied'});
  const decoded = jwt.verify(token, process.env.JWTSECRET);
  const email = decoded.email;
  const emailUser = await User.findOne({email});
  const emailToken = jwt.sign(
    {
      id: emailUser.id,
    },
    process.env.EMAILJWT,
    {
      expiresIn: 1000*60*60*24,
    }
  )
  const url = `${process.env.URLHOST}/verifytoken/${emailToken}`;
  const mailHost = 'smtp.gmail.com';
  const mailPort = 587;
  const transporter = nodemailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: false,
    auth: {
      user: process.env.NAMEEMAIL,
      pass: process.env.PASSWORDEMAIL
    }
  });
  const options = {
    from: process.env.NAMEEMAIL, 
    to: email,
    subject: 'Kích hoạt Email',
    html: `Kích vào đường dẫn để kích hoạt email của bạn: <a href="${url}">${url}</a>`,
  }
  transporter.sendMail(options)
}

module.exports.confirmEmail = async function(req, res){
  const user = jwt.verify(req.body.token, process.env.EMAILJWT);
  try{
    await User.findByIdAndUpdate(user.id, {isAuthenticated: true});
    res.json('active success')
  }
  catch(e){
    console.log(e)
    res.json('active failed')
  }
}