const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
let User = require('../models/user.model');
const bcrypt = require('bcryptjs');

module.exports.postLogin = function (req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ msg: 'Không có username, password' })
  }
  User.findOne({ username })
    .then(user => {
      if (!user) {
        return res.json('notuser');
      }
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) {
            return res.json('wrongpw');
          }
          jwt.sign(
            { id: user.id, username: user.username, role: user.role, email: user.email },
            process.env.JWTSECRET,
            { expiresIn: 1000 * 60 * 60 * 24 },
            (err, token) => {
              if (err) throw err;
              res.cookie('xauthtoken', token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
              User.findByIdAndUpdate(user.id, { token: token }).then();
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
module.exports.register = async function (req, res, next) {
  const { username, phone, email, password } = req.body;
  const role = 2;
  const newUser = new User({ username, phone, email, password, role });
  const checkUsername = await User.find({ username: username });
  const checkEmail = await User.find({ email: email })
  if (checkUsername.length > 0) {
    res.json("USERNAME_EXIST")
  }
  else if (checkEmail.length > 0) {
    res.json("EMAIL_EXIST")
  }
  else {
    newUser.save()
      .then(user => {
        jwt.sign(
          { id: user.id, username: user.username, role: user.role, email: user.email },
          process.env.JWTSECRET,
          { expiresIn: 1000 * 60 * 60 * 24 },
          (err, token) => {
            if (err) throw err;
            res.cookie('xauthtoken', token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
            User.findByIdAndUpdate(user.id, { token: token }).then();
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
      .catch(err => console.log(err));
  }
}

module.exports.islogin = async function (req, res) {
  const token = req.cookies.xauthtoken;
  if (!token) res.json('login:false');
  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    res.json(decoded);
  } catch (e) {
    console.log('token faile');
  }
}
module.exports.islogout = function (req, res) {
  try {
    res.clearCookie("xauthtoken");
    return res.sendStatus(200);
  }
  catch (e) {
    console.log(e)
  }
}

module.exports.sendMail = async function (req, res) {
  const token = req.cookies.xauthtoken;
  if (!token) res.status(401).json({ msg: 'No token, authorizaton denied' });
  const decoded = jwt.verify(token, process.env.JWTSECRET);
  const email = decoded.email;
  const emailUser = await User.findOne({ email });
  const emailToken = jwt.sign(
    {
      id: emailUser.id,
    },
    process.env.EMAILJWT,
    {
      expiresIn: 1000 * 60 * 60 * 24,
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

module.exports.confirmEmail = async function (req, res) {
  const user = jwt.verify(req.body.token, process.env.EMAILJWT);
  try {
    await User.findByIdAndUpdate(user.id, { isAuthenticated: true });
    res.json('active success')
  }
  catch (e) {
    console.log(e)
    res.json('active failed')
  }
}