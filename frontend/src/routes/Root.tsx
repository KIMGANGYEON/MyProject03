import React, { useEffect } from "react";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Join from "./screens/Join";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { authUser } from "../store/thunkFunctions";
import ProtectedRoutes from "./ProtectedRoutes";
import NotAuthRoutes from "./NotAuthRoutes";
import NotFound from "./NotFound";
import UserEditUserInfo from "./screens/User/UserEditUserInfo";
import ProductDetail from "./screens/Product/ProductDetail";
import ProductList from "./screens/Product/ProductList";
import UserEditUserPassword from "./screens/User/UserEditUserPassword";
import UserUploadProduct from "./screens/User/UserUploadProduct";
import UserEnterUserProduct from "./screens/User/UserEnterUserProduct";
import UserEditUserProduct from "./screens/User/UserEditUserProduct";
import UsedProductList from "./screens/Product/UsedProductList";
import UsedProductDetail from "./screens/Product/UsedProductDetail";
import UserCart from "./screens/Cart/UserCart";

const Layout = () => {
  return (
    <div>
      <ToastContainer
        position="bottom-right"
        theme="light"
        autoClose={2000}
        pauseOnHover
      />
      <Navbar />
      <main style={{ marginTop: 150 }}>
        <Outlet />
      </main>
    </div>
  );
};

const Root = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuth = useSelector((state: RootState) => state.user?.isAuth);
  const { pathname } = useLocation();

  useEffect(() => {
    if (isAuth) {
      dispatch(authUser());
    }
  }, [isAuth, pathname, dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/product/detail/:id" element={<ProductDetail />} />
        <Route path="/product/list/:id" element={<ProductList />} />
        <Route path="/used/product/list" element={<UsedProductList />} />
        <Route
          path="/used/product/detail/:id"
          element={<UsedProductDetail />}
        />
        //로그인한 사람만 갈 수 있음
        <Route element={<ProtectedRoutes isAuth={isAuth} />}>
          <Route path="/user/edit/userinfo" element={<UserEditUserInfo />} />
          <Route
            path="/user/edit/userpassword"
            element={<UserEditUserPassword />}
          />
          <Route path="/user/upload/product" element={<UserUploadProduct />} />
          <Route
            path="/user/enter/userproduct"
            element={<UserEnterUserProduct />}
          />
          <Route
            path="user/edit/userproduct/:id"
            element={<UserEditUserProduct />}
          />
          <Route path="user/cart" element={<UserCart />} />
        </Route>
        //로그인 한 사람은 못감
        <Route element={<NotAuthRoutes isAuth={isAuth} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default Root;
