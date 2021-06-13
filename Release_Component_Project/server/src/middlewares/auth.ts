import jwt from "jsonwebtoken";
import env from "dotenv";
import { ErrorHandler } from "../utils/errorHandler";
import catchAsyncErrors from "./catchAsyncErrors";
import User from "../models/userSchema";
env.config();

// Checks if user is authenticated or not
export const isAuthenticatedUser = catchAsyncErrors(
  async (req: any, res: any, next: any) => {
    try {
      const header = req.header("Authorization");
      console.log(header);

      const token = header && header.split(" ")[1];

      if (token === null) {
        return res.sendStatus(401);
      }
      jwt.verify(token, "Alpha", (err: any, user: any) => {
        if (err) {
          if (err.name === "TokenExpiredError") {
            return res.status(401).json({
              message: "session expired...Please login Again!",
              success: false,
            });
          }
          return res.status(403).json({
            message: "Something went wrong: " + err.message,
            success: false,
          });
        }

        req.user = user;
        console.log("user----->",user);
        next();
      });
    } catch (err) {
      res.status(404).send({
        success: false,
        message: "Error while Authenticating the User",
      });
    }
  }
);

// Handling users roles
export const authorizeRoles = (...roles: any) => {
  return async (req: any, res: any, next: any) => {
    let u: any = await User.findById(req.user.id);
    if (!roles.includes(u.role)) {
      return next(
        new ErrorHandler(
          `Role (${u.role}) is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
