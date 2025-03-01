const { default: mongoose } = require("mongoose");
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    minLength: 5,
  },

  role: {
    type: Number,
    default: 0,
  },
  image: String,

  cart: {
    new: {
      type: Array,
      default: [],
    },
    used: {
      type: Array,
      default: [],
    },
  },

  history: {
    type: Array,
    new: [],
    used: [],
  },
});

userSchema.pre("save", async function (next) {
  let user = this;

  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  }
  next();
});

userSchema.methods.comparePassword = async function (plainPassword) {
  let user = this;
  const match = bcrypt.compare(plainPassword, user.password);
  return match;
};

const User = mongoose.model("User", userSchema);

export default User;
