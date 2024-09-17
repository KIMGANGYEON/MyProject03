import path from "path";
import fs from "fs";
import Product from "../models/Product";

export const postProductDeleteImg = async (req, res, next) => {
  const { img } = req.body;
  const imgPath = path.join(__dirname, "../../uploads", img);
  try {
    fs.unlinkSync(imgPath);
  } catch (error) {
    next(error);
  }
};

export const getUsedProduct = async (req, res, next) => {
  const products = await Product.find();

  try {
    return res.status(200).json({ products });
  } catch (error) {
    next(error);
  }
};

export const getUsedProductDetail = async (req, res, next) => {
  const { id } = req.body;
  const product = await Product.find({ _id: id });

  try {
    return res.status(200).json({ product });
  } catch (error) {
    next(error);
  }
};
