import User from "../models/userSchema";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const registerUser = async (req: any, res: any) => {
  const { name, email, phoneNumber, password, role } = req.body;
  let user: any;
  user = await User.create({
    name,
    email,
    phoneNumber,
    password,
    role,
  });
  bcrypt.genSalt(10, (err: any, salt: any) => {
    bcrypt.hash(user.password, salt, (err: any, hash: any) => {
      if (err) throw err;
      user.password = hash;
      user.save().then((user: any) => {
        res.send(user);
      });
    });
  });
  res
    .status(200)
    .json({ success: true, message: "Registration successful", user });
};

export const loginUser = async (req: any, res: any) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "credential missing" });
  }

  User.findOne({ email }).then((user: any) => {
    if (!user) {
      return res.status(400).json({ msg: "user doesnot exists" });
    }
    //validate password
    bcrypt.compare(password, user.password).then((isMatch: any) => {
      //   if (!isMatch) return res.status(400).json({ msg: "invalid credentials" });
      if (!isMatch) return res.json(401);

      jwt.sign(
        { id: user._id },
        `${process.env.jwtSecret}`,
        { expiresIn: 3600 },
        (err: any, token: any) => {
          if (err) throw err;
          res.json(token);
        }
      );
    });
  });
};
