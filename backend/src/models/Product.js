import mongoose, { Schema } from "mongoose";

const productSchema = mongoose.Schema({
  writer: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
  },
  price: {
    type: String,
  },
  description: String,
  images: {
    type: Array,
    default: [],
  },

  like: {
    type: Number,
    default: 0,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
