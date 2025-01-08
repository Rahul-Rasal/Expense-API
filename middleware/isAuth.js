import jwt from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
  let token = req.headers.authorization;
  try {
    if (token) {
      token = token.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.userId = decoded.id;
      next();
    } else {
      res.status(401).json({ message: "Unauthorized User" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "error in authorization" });
  }
};
