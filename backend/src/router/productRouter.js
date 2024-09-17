import express from "express";
import auth from "../middleware/auth";
import {
  getUsedProduct,
  getUsedProductDetail,
  postProductDeleteImg,
} from "../controller/productControllers";

const productRouter = express.Router();

productRouter.post("/delete/productimg", auth, postProductDeleteImg);
productRouter.get("/get/used/product", getUsedProduct);
productRouter.post("/get/used/product/detail", getUsedProductDetail);

export default productRouter;
