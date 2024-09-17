import multer from "multer";
import auth from "../middleware/auth";
import path from "path";

const express = require("express");
const {
  postUserJoin,
  postUserLogin,
  getUserAuth,
  postUserLogout,
  postUserEnterUserInfo,
  postUserEditUserInfo,
  postUserEditUserPassword,
  postUserUploadProduct,
  getUserEnterUserProduct,
  getUserEditUserProduct,
  postUserEditUserProduct,
  postUserDeleteUserProduct,
  postUserAddCart,
  postUserAddCartUsed,
  getUserNewCart,
  getUserOldCart,
  getUserOldCart2,
} = require("../controller/userController");

const userRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

userRouter.get("/auth", auth, getUserAuth);
userRouter.post("/join", postUserJoin);
userRouter.post("/login", postUserLogin);
userRouter.post("/logout", auth, postUserLogout);
userRouter.post("/enter/userinfo", auth, postUserEnterUserInfo);
userRouter.post("/edit/userinfo", auth, postUserEditUserInfo);
userRouter.post("/edit/userpassword", auth, postUserEditUserPassword);
userRouter.post(
  "/upload/product",
  auth,
  upload.array("uploadImg"),
  postUserUploadProduct
);
userRouter.post("/enter/user/product", auth, getUserEnterUserProduct);
userRouter.post("/edit/user/product", auth, getUserEditUserProduct);
userRouter.post(
  "/edit/user/product2",
  auth,
  upload.array("uploadImg"),
  postUserEditUserProduct
);
userRouter.post("/delete/user/product", auth, postUserDeleteUserProduct);
userRouter.post("/add/cart", auth, postUserAddCart);
userRouter.post("/add/cart/used", auth, postUserAddCartUsed);
userRouter.post("/new/cart", auth, getUserNewCart);
userRouter.post("/old/cart", auth, getUserOldCart);

export default userRouter;
