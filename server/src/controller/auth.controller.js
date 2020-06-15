const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
let User = require("../models/user.model");
let Product = require("../models/product.model");
const bcrypt = require("bcryptjs");

module.exports.postLogin = async function (req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ msg: "Không có username, password" });
  }
  const user = await User.findOne({ username }).lean();
  if (!user) {
    return res.status(400).json({ message: "Tài khoản không tồn tại!" });
  }
  const records = await Product.find().where("_id").in(user.cart).exec();
  bcrypt.compare(password, user.password).then((isMatch) => {
    if (!isMatch) {
      return res.status(400).json({ message: "Sai mật khẩu!" });
    }
    jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
        isAuthenticated: user.isAuthenticated,
      },
      process.env.JWTSECRET,
      { expiresIn: 1000 * 60 * 60 * 24 },
      (err, token) => {
        if (err) return res.status(400).json({ message: "Lỗi server" });
        User.findByIdAndUpdate(user.id, { token: token }).then(
          res.status(200).json({
            token,
            user: {
              id: user.id,
              username: user.username,
              role: user.role,
              email: user.email,
              isAuthenticated: user.isAuthenticated,
            },
            cart: records,
          })
        );
      }
    );
  });
};
module.exports.register = async function (req, res, next) {
  const { username, phone, email, password } = req.body;
  const role = 2;
  const newUser = new User({ username, phone, email, password, role });
  const checkUsername = await User.find({ username: username }).lean();
  const checkEmail = await User.find({ email: email }).lean();
  if (checkUsername.length > 0) {
    return res.status(400).json({ message: "Tên đăng nhập đã tồn tại!" });
  }
  if (checkEmail.length > 0) {
    return res.status(400).json({ message: "Email đã tồn tại!" });
  }
  newUser
    .save()
    .then((user) => {
      jwt.sign(
        {
          id: user.id,
          username: user.username,
          role: user.role,
          email: user.email,
          isAuthenticated: user.isAuthenticated,
        },
        process.env.JWTSECRET,
        { expiresIn: 1000 * 60 * 60 * 24 },
        (err, token) => {
          if (err) throw err;
          User.findByIdAndUpdate(user.id, { token: token }).then(
            res.status(200).json({
              token,
              user: {
                id: user.id,
                username: user.username,
                role: user.role,
                email: user.email,
                isAuthenticated: user.isAuthenticated,
              },
            })
          );
        }
      );
    })
    .catch((e) => res.status(500).json({ message: "Lỗi server" }));
};

module.exports.islogin = async function (req, res) {
  const token = req.body.authToken;
  if (!token) res.status(500).json({ message: "Đăng nhập thất bại" });
  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    const productId = await User.findById(decoded.id, "cart");
    if (productId) {
      const records = await Product.find()
        .where("_id")
        .in(productId.cart)
        .exec();
      return res.status(200).json({ auth: decoded, cart: records });
    }
    return res.status(200).json({ auth: decoded });
  } catch (e) {
    console.log(e);
  }
};

module.exports.sendMail = async function (req, res) {
  const token = req.body.authToken;
  if (!token) res.status(401).json({ msg: "No token, authorizaton denied" });
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
  );
  const url = `${process.env.URLHOST}/verifytoken/${emailToken}`;
  const mailHost = "smtp.gmail.com";
  const mailPort = 587;
  const transporter = nodemailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: false,
    auth: {
      user: process.env.NAMEEMAIL,
      pass: process.env.PASSWORDEMAIL,
    },
  });
  const options = {
    from: process.env.NAMEEMAIL,
    to: email,
    subject: "KÍCH HOẠT EMAIL DOGSHOP",
    html: `Kích vào đường dẫn để kích hoạt email của bạn: <a href="${url}">${url}</a>`,
  };
  transporter.sendMail(options);
};

module.exports.confirmEmail = async function (req, res) {
  const users = jwt.verify(req.body.token, process.env.EMAILJWT);
  const productId = await User.findById(users.id, "cart");
  const records = await Product.find().where("_id").in(productId.cart).exec();
  User.findByIdAndUpdate(users.id, { isAuthenticated: true })
    .then(() => {
      User.findById(users.id).then((user) => {
        if (user) {
          jwt.sign(
            {
              id: user.id,
              username: user.username,
              role: user.role,
              email: user.email,
              isAuthenticated: user.isAuthenticated,
            },
            process.env.JWTSECRET,
            { expiresIn: 1000 * 60 * 60 * 24 },
            (err, token) => {
              if (err) throw err;
              User.findByIdAndUpdate(user.id, { token: token }).then(
                res.status(200).json({
                  token,
                  user: {
                    id: user.id,
                    username: user.username,
                    role: user.role,
                    email: user.email,
                    isAuthenticated: user.isAuthenticated,
                  },
                  cart: records,
                })
              );
            }
          );
        } else {
          res.status(200).json("server error");
        }
      });
    })
    .catch((e) => console.log(e));
};
