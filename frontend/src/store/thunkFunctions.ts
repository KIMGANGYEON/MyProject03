import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../utils/axios";
import { ProductUpload } from "../routes/screens/User/UserUploadProduct";

export const joinUser = createAsyncThunk(
  "user/joinUser",
  async (
    body: {
      email: string;
      password: string;
      password2: string;
      name: string;
      image: string;
    },
    thunkAPI
  ) => {
    try {
      const response = await axiosInstance.post(`/user/join`, body);
      return response.data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (
    body: {
      email: string;
      password: string;
    },
    thunkAPI
  ) => {
    try {
      const response = await axiosInstance.post(`/user/login`, body);
      return response.data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const authUser = createAsyncThunk(
  "user/authUser",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/user/auth`);
      return response.data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const LogoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/user/logout`);
      return response.data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const enterUserInfo = createAsyncThunk(
  "user/enterUserInfo",
  async (body: { userId: string; userPassword: string }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/user/enter/userinfo`, body);
      return response.data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const editUserInfo = createAsyncThunk(
  "user/editUserInfo",
  async (
    body: { userId: string; editEmail: string; editName: string },
    thunkAPI
  ) => {
    try {
      const response = await axiosInstance.post(`/user/edit/userinfo`, body);
      return response.data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const editUserPassword = createAsyncThunk(
  "user/editUserPassword",
  async (
    body: {
      newUserPassword: string;
      newUserPassword2: string;
      userId: string;
      userPassword: string;
    },
    thunkAPI
  ) => {
    try {
      const response = await axiosInstance.post(
        `/user/edit/userpassword`,
        body
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const uploadUserProduct = createAsyncThunk(
  "user/uploadUserProduct",
  async (formData: FormData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `/user/upload/product`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const enterUserProduct = createAsyncThunk(
  "user/enterUserProduct",
  async (user: string, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/user/enter/user/product`, {
        user,
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const editUserProduct = createAsyncThunk(
  "user/editUserProduct",
  async (id: string | undefined, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/user/edit/user/product`, {
        id,
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const editUserProduct2 = createAsyncThunk(
  "user/editUserProduct2",
  async (formData: FormData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `/user/edit/user/product2`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const deleteUserProduct = createAsyncThunk(
  "user/deleteUserProduct",
  async (id: string | undefined, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/user/delete/user/product`, {
        id,
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const userAddCart = createAsyncThunk(
  "user/addCart",
  async (id: string | undefined, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/user/add/cart`, {
        id,
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const getUsedProduct = createAsyncThunk(
  "user/getUsedProduct",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/product/get/used/product`);
      return response.data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const getUsedProductDetail = createAsyncThunk(
  "user/getUsedDetail",
  async (id: any, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `/product/get/used/product/detail`,
        { id }
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const userAddUsedProduct = createAsyncThunk(
  "user/userAddUsedProduct",
  async (id: any, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/user/add/cart/used`, { id });
      return response.data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const getUserNewCart = createAsyncThunk(
  "user/newCart",
  async (userId: string, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/user/new/cart`, { userId });
      return response.data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

// export const productImgDelete = createAsyncThunk(
//   "product/deleteProductImg",
//   async (img: string, thunkAPI) => {
//     try {
//       const response = await axiosInstance.post(`/product/delete/productimg`, {
//         img,
//       });
//       return response.data;
//     } catch (error: any) {
//       console.log(error);
//       return thunkAPI.rejectWithValue(error.response.data || error.message);
//     }
//   }
// );
