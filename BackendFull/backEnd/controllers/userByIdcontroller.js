import User from "../models/user.js";

export function userById(req, res, next, id) {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        err: "User not found",
      });
    }
    req.profile = user;
    next();
  });
}

// user can see his profile

export function readUserProfile(req, res) {
  req.profile.hashed_Password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
}

// user can update his profile
export function updateUserProfile(req, res) {
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          err: "You are not authorized to perform this action ",
        });
      }
      user.hashed_Password = undefined;
      user.salt = undefined;
      res.json(user);
    }
  );
}
