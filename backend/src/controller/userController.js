import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Product from "../models/Product";
import path from "path";
import fs from "fs";

export const getUserAuth = async (req, res, next) => {
  return res.status(200).json({
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    image: req.user.image,
  });
};

export const postUserJoin = async (req, res, next) => {
  const { name, email, password, password2 } = req.body;
  const userEmailExists = await User.exists({ email });
  try {
    if (userEmailExists) {
      return res.status(400).send("해당 이메일은 다른 유저가 사용중 입니다");
    }

    if (password != password2) {
      return res.status(400).send("비밀번호가 일치하지 않습니다");
    }
    const user = new User({ name, email, password });
    await user.save();
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export const postUserLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("해당 이메일의 유저가 없습니다");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).send("잘못된 비밀번호 입니다");
    }

    const payload = {
      userId: user._id.toHexString(),
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    return res.json({ user, accessToken });
  } catch (error) {}
};

export const postUserLogout = async (req, res, next) => {
  try {
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export const postUserEnterUserInfo = async (req, res, next) => {
  const { userId, userPassword } = req.body;

  try {
    const user = await User.findOne({ _id: userId });

    const isMatch = await user.comparePassword(userPassword);
    if (!isMatch) {
      return res.status(400).send("잘못된 비밀번호 입니다");
    }

    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export const postUserEditUserInfo = async (req, res, next) => {
  const { editEmail, editName, userId } = req.body;
  const user = await User.findOne({ _id: userId });
  try {
    if (user.email != editEmail) {
      const userEmailExists = await User.exists({ email: editEmail });
      if (userEmailExists) {
        return res.status(400).send("이미 사용중인 이메일 입니다");
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        email: editEmail,
        name: editName,
      },
      { new: true }
    );
    req.user = updatedUser;
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export const postUserEditUserPassword = async (req, res, next) => {
  const user = req.user;
  const { userPassword, newUserPassword, newUserPassword2 } = req.body;

  try {
    const isMatch = await user.comparePassword(userPassword);
    if (!isMatch) {
      return res.status(400).send("이전 비밀번호가 일치하지 않습니다");
    }

    if (userPassword == newUserPassword) {
      return res.status(400).send("이전 비밀번호랑 일치합니다");
    }

    if (newUserPassword != newUserPassword2) {
      return res.status(400).send("신규 비밀번호가 일치하지 않습니다");
    }

    const hashedPassword = await bcrypt.hash(newUserPassword, 10);

    const updatedUser = await User.findByIdAndUpdate(
      user.id,
      {
        password: hashedPassword,
      },
      { new: true }
    );
    req.user = updatedUser;
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export const postUserUploadProduct = async (req, res, next) => {
  const { productTitle, productPrice, productDescription } = req.body;
  const files = req.files;
  const userId = req.user._id;
  try {
    const product = new Product({
      writer: userId,
      title: productTitle,
      price: productPrice,
      description: productDescription,
      images: files.map((file) => file.filename),
    });
    await product.save();
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export const getUserEnterUserProduct = async (req, res, next) => {
  const { user } = req.body;
  const product = await Product.find({ writer: user }).populate("writer");
  try {
    return res.status(200).json({ product });
  } catch (error) {
    next(error);
  }
};

export const getUserEditUserProduct = async (req, res, next) => {
  const { id } = req.body;
  const product = await Product.find({ _id: id });

  try {
    return res.status(200).json({ product });
  } catch (error) {
    next(error);
  }
};

export const postUserEditUserProduct = async (req, res, next) => {
  const {
    productTitle,
    productDescription,
    productPrice,
    productId,
    deleteImg,
  } = req.body;

  try {
    const product = await Product.findById(productId);
    let basicImg = product.images;

    let updateImg = basicImg;
    if (deleteImg && deleteImg.length > 0) {
      deleteImg.forEach((img) => {
        const imgPath = path.join(__dirname, "../../uploads", img);
        if (fs.existsSync(imgPath)) {
          fs.unlinkSync(imgPath);
        }
      });

      updateImg = basicImg.filter((img) => !deleteImg.includes(img));
    }

    const files = req.files.map((file) => file.filename);
    const updatedImages = [...updateImg, ...files];

    await Product.findByIdAndUpdate(
      productId,
      {
        title: productTitle,
        price: productPrice,
        description: productDescription,
        images: updatedImages,
      },
      { new: true }
    );

    return res.status(200).json({ state: "success" });
  } catch (error) {
    next(error);
  }
};

export const postUserDeleteUserProduct = async (req, res, next) => {
  const { id } = req.body;
  const product = await Product.find({ _id: id });
  const productImg = product[0].images;

  try {
    productImg.forEach((img) => {
      const imgPath = path.join(__dirname, "../../uploads", img);
      fs.unlinkSync(imgPath);
    });
    await Product.findByIdAndDelete(id);
    return res.status(200).json({ state: "success" });
  } catch (error) {
    next(error);
  }
};

export const postUserAddCart = async (req, res, next) => {
  const { id } = req.body;
  const user = req.user;

  const user2 = await User.findOne({ _id: user._id });
  try {
    let duplicate = false;
    user2.cart.new.forEach((item) => {
      if (item.id === id) {
        duplicate = true;
      }
    });

    if (duplicate) {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user2._id, "cart.new.id": id },
        { $inc: { "cart.new.$.quantity": 1 } },
        { new: true }
      );
      req.user.cart = updatedUser;
    } else {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user2._id },
        {
          $push: {
            "cart.new": {
              id,
              quantity: 1,
              date: Date.now(),
            },
          },
        },
        { new: true }
      );
      req.user.cart = updatedUser;
    }
    return res.status(200).json({ state: "success" });
  } catch (error) {
    next(error);
  }
};

export const postUserAddCartUsed = async (req, res, next) => {
  const { id } = req.body;
  const user = req.user;

  const user2 = await User.findOne({ _id: user._id });
  try {
    let duplicate = false;
    user2.cart.used.forEach((item) => {
      if (item.id === id) {
        duplicate = true;
      }
    });

    if (duplicate) {
      const updatedUser = await User.findOneAndUpdate(
        {
          _id: user2._id,
          "cart.used.id": id,
        },
        {
          $inc: { "cart.used.$.quantity": 1 },
        },
        { new: true }
      );
      req.user.cart = updatedUser;
    } else {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user2._id },
        {
          $push: {
            "cart.used": {
              id,
              quantity: 1,
              date: Date.now(),
            },
          },
        },
        {
          new: true,
        }
      );
      req.user.cart = updatedUser;
    }
    return res.status(200).json({ state: "success" });
  } catch (error) {
    next(error);
  }
};

export const getUserNewCart = async (req, res, next) => {
  const { userId } = req.body;
  const user = await User.findOne({ _id: userId });
  const userNewCart = user.cart.new;
  try {
    return res.status(200).json({ userNewCart });
  } catch (error) {
    next(error);
  }
};
