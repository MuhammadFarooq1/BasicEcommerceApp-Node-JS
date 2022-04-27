import User from "../models/user.js";
import expressJWT from "express-jwt";
import jsonWebToken from "jsonwebtoken";
import { errorHandler } from "../halpers/dbErrorHandler.js";

export function signUp(req, res) {
  console.log("req.body", req.body);
  const user = new User(req.body);

  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err),
      });
    }
    user.salt = undefined;
    user.hashed_Password = undefined;
    res.json({
      user,
    });
  });
}

export function signIn(req, res) {
  // find user by email
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      res.status(400).json({
        error: "User with this email does not exist. please signUP First ",
      });
    }
    // if user found make shure the email and password is match

    // create authenticated methode in user model
    if (!user.Authenticate(password)) {
      return res.status(401).json({
        error: "Email and Password Does not Match",
      });
    }

    //generate a signed token with user id and  secrete

    const token = jsonWebToken.sign({ _id: user._id }, process.env.JWT_SECRET);
    // persist token as 't_token" in cookei expiry date
    res.cookie("t_token", token, { expire: new Date() + 9999 });
    // return response with user and token to frent end client
    const { _id, email, name, role } = user;
    return res.json({ token, user: { _id, email, name, role } });
  });
}

export function signOut(req, res) {
  res.clearCookie("t_token");
  res.json({ Message: "SigOut successfully " });
}

// export default  requireSignIN = expressJWT({
//   secret: "dksdmksdksmdksmdk",
//   algorithms: ["HS256"],
//   userProperty: "auth",
// });

export function isAuth(req, res, next) {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      err: "Access denied",
    });
  }
  next();
}

export function isAdmin(req, res, next) {
  if (req.profile.role === 0) {
    return res.status(403).json({
      err: "Admin Resource! Access Denied",
    });
  }
  next();
}
