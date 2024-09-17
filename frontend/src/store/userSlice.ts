import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  authUser,
  editUserInfo,
  editUserPassword,
  editUserProduct,
  editUserProduct2,
  enterUserInfo,
  enterUserProduct,
  joinUser,
  loginUser,
  LogoutUser,
  uploadUserProduct,
} from "./thunkFunctions";
import { toast } from "react-toastify";

interface UserState {
  id: string;
  email: string;
  name: string;
  role: number;
  isAuth: boolean;
}

const initialState = {
  userData: {
    id: "",
    email: "",
    name: "",
    role: 0,
    image: "",
  },
  isAuth: false,
  isLoading: false,
  edit: false,
  status: "idle",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
    },
    resetEdit: (state) => {
      state.edit = false;
    },
  },
  extraReducers: (builder) => {
    builder
      //회원가입
      .addCase(joinUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(joinUser.fulfilled, (state) => {
        state.isLoading = false;
        toast.info("회원가입을 성공했습니다");
      })
      .addCase(joinUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      //로그인
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.userData = action.payload;
        state.isAuth = true;

        localStorage.setItem("accessToken", action.payload.accessToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      //Auth
      .addCase(authUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.userData = action.payload;

        state.isAuth = true;
      })
      .addCase(authUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuth = false;
        localStorage.removeItem("accessToken");
      })
      // Logout
      .addCase(LogoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(LogoutUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.userData = initialState.userData;
        state.isAuth = false;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      })
      .addCase(LogoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })

      // EnterUserInfo
      .addCase(enterUserInfo.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
      })
      .addCase(enterUserInfo.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.status = "success";
      })
      .addCase(enterUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.status = "faild";

        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      //EditUserInfo
      .addCase(editUserInfo.pending, (state) => {
        state.isLoading = true;
        state.edit = false;
      })
      .addCase(editUserInfo.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.userData = action.payload;
        state.edit = true;
      })
      .addCase(editUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.edit = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      //Edit User Password
      .addCase(editUserPassword.pending, (state) => {
        state.isLoading = true;
        state.edit = false;
      })
      .addCase(
        editUserPassword.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.userData = action.payload;
          state.edit = true;
        }
      )
      .addCase(editUserPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.edit = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })

      //Upload User Product
      .addCase(uploadUserProduct.pending, (state) => {
        state.isLoading = true;
        state.edit = false;
      })
      .addCase(
        uploadUserProduct.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.edit = true;
        }
      )
      .addCase(uploadUserProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.edit = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      // User Enter User Product
      .addCase(enterUserProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        enterUserProduct.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
        }
      )
      .addCase(enterUserProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })

      //Get Edit Product Info
      .addCase(editUserProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        editUserProduct.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
        }
      )
      .addCase(editUserProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      .addCase(editUserProduct2.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        editUserProduct2.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
        }
      )
      .addCase(editUserProduct2.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      });
  },
});

export const { resetStatus } = userSlice.actions;
export const { resetEdit } = userSlice.actions;
export default userSlice.reducer;
