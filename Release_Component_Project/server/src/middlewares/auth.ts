import jwt from "jsonwebtoken";
import env from "dotenv";
import { ErrorHandler } from "../utils/errorHandler";
import catchAsyncErrors from "./catchAsyncErrors";
import User from "../models/userSchema";
env.config();

// Checks if user is authenticated or not
export const isAuthenticatedUser = catchAsyncErrors(
  async (req: any, res: any, next: any) => {
    const header = req.header("Authorization");
    console.log(header);

    const token = header && header.split(" ")[1];

    if (token === null) {
      return res.sendStatus(401);
    }
    jwt.verify(token, "Alpha", (err: any, user: any) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json("session expired...Please login Again!");
        }
        return res.status(403).json("Something went wrong: " + err.message);
      }

      req.user = user;
      console.log(user);
      next();
    });
  }
);

// export const isAuthenticatedUser = catchAsyncErrors(
//   async (req: any, res: any, next: any) => {
//     const header: any = req.header("Authorization");
//     const token: any = header && header.split(" ")[1];

//     if (!token) {
//       return next(
//         new ErrorHandler("Login first to access this resource.", 401)
//       );
//     }

//     const decoded: any = jwt.verify(token, "Alpha", (err: any, user: any) => {
//       if (err) {
//         if (err.name === "TokenExpiredError") {
//           return res.status(401).json("session expired...Please login Again!");
//         }
//         return res.status(403).json("Something went wrong: " + err.message);
//       }
//     });
//     console.log(decoded);
//     req.user = await User.findById(decoded.id);

//     next();
//   }
// );
// Handling users roles
export const authorizeRoles = (...roles: any) => {
  // console.log(roles);
  return (req: any, res: any, next: any) => {
    console.log(res.user.role);
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to acccess this resource`,
          403
        )
      );
    }
    next();
  };
};
