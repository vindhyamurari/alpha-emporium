import User from "../models/userSchema";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const registerUser = async (req: any, res: any) => {
  try {
    const { name, email, phoneNumber, password,role } = req.body;
    let user: any;
    try {
      user = await User.create({
        name,
        email,
        phoneNumber,
        password,
        role
      });
      bcrypt.genSalt(10, (err: any, salt: any) => {
        bcrypt.hash(user.password, salt, (err: any, hash: any) => {
          if (err) {
            return res
              .status(404)
              .send({ message: "Error while hashing password" });
          }
          user.password = hash;
          user.save().then((user: any) => {
            res.send(user);
          });
        });
      });
      res
        .status(200)
        .json({ success: true, message: "Registration successful", user });
    } catch (err) {
      res.status(404).send({
        success: false,
        message: err.message,
      });
    }
  } catch (err) {
    console.log(`from register err.message`, err.message);
    res.status(404).send({
      success: false,
      message: "Error in Register User",
    });
  }
};

export const loginUser = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "credentials are not matched", success: false });
    }

    User.findOne({ email }).then((user: any) => {
      if (!user) {
        return res
          .status(400)
          .json({ message: "user does not exists", success: false });
      }
      //validate password
      bcrypt.compare(password, user.password).then((isMatch: any) => {
        //   if (!isMatch) return res.status(400).json({ message: "invalid credentials" });
        if (!isMatch) {
          return res
            .status(401)
            .send({ message: "Password is not matched", success: false });
        }

        jwt.sign(
          { id: user._id,name:user.name},
          `${process.env.jwtSecret}`,
          { expiresIn: "1d" },
          (err: any, token: any) => {
            if (err) {
              return res
                .status(404)
                .send({ message: "token expired", success: false });
            }
           else{
            return res.status(200).send({
              user: {
                id:user._id,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
              },
              token: token,
              message: "Successfully logged-in",
              success: true,
            });
           }
          }
        );
      });
    });
  } catch (err) {
    res.status(404).send({
      success: false,
      message: "Error while logging User",
    });
  }
};
