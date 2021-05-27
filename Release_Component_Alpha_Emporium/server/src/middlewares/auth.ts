import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/errorHandler";
import catchAsyncErrors from "./catchAsyncErrors";

// Checks if user is authenticated or not
export const isAuthenticatedUser = catchAsyncErrors(
  async (req: any, res: any, next: any) => {
    const header = req.header("Authorization");
    console.log(header);

    const token = header && header.split(" ")[1];

    if (token === null) {
      return res.sendStatus(401);
    }
    jwt.verify(token, "bhanu01", (err: any, user: any) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json("session expired...Please login Again!");
        }
        return res.status(403).json("Something went wrong: " + err.message);
      }

      req.user = user;
      next();
    });
  }
);

// Handling users roles
export const authorizeRoles = (...roles: any) => {
  return (req: any, res: any, next: any) => {
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
