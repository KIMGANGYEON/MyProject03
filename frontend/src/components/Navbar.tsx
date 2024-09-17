import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa6";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { menubar, menubarIcon, menubarText } from "../atom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { LogoutUser } from "../store/thunkFunctions";

const Navbar = () => {
  const [displayNone, setDidplayNone] = useState(100);
  const [icon, setIcon] = useRecoilState(menubarIcon);
  const [menuBar, setMenuBar] = useRecoilState(menubar);
  const [menuBarText, setMenuBarText] = useRecoilState(menubarText);
  const [loginText, setLoginText] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isAuth = useSelector((state: RootState) => state.user?.isAuth);
  let lastScroll = 0;

  const handleMenuClick = () => {
    setMenuBarText(-200);
    setTimeout(() => {
      setMenuBar("none");
      setIcon(true);
    }, 800);
  };

  const handleIconClick = () => {
    setMenuBar("block");
    setTimeout(() => {
      setMenuBarText(0);
    }, 100);
    setIcon(false);
  };

  const handleLogout = () => {
    dispatch(LogoutUser()).then(() => {
      window.location.reload();
    });
  };

  useEffect(() => {
    if (isAuth) {
      setLoginText(false);
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      let scrollY = window.scrollY;
      if (scrollY > lastScroll) {
        setDidplayNone(50);
      } else {
        setDidplayNone(100);
      }

      lastScroll = scrollY;
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="navbar">
      <div className="navbar_header">
        <h1>
          <Link to={"/"}>BOOKSTORE</Link>
        </h1>
        <h2 onClick={handleIconClick}>
          {icon ? <FaBars /> : <FaBarsStaggered />}
        </h2>
      </div>
      <div
        className="navbar_header_text"
        style={{ transform: `translateY(${displayNone}px)` }}
      >
        <Link to={"/product/list/자기계발"}>
          <h1>자기계발</h1>
        </Link>

        <Link to={"/product/list/소설"}>
          <h1>소설</h1>
        </Link>
        <Link to={"/product/list/인문"}>
          <h1>인문</h1>
        </Link>
        <Link to={"/product/list/에세이"}>
          <h1>에세이</h1>
        </Link>
        <Link to={"/product/list/경제"}>
          <h1>경제</h1>
        </Link>
        <Link to={"/product/list/역사"}>
          <h1>역사</h1>
        </Link>
        <Link to={"/product/list/컴퓨터"}>
          <h1>컴퓨터</h1>
        </Link>
        <Link to={"/product/list/외국어"}>
          <h1>외국어</h1>
        </Link>
        <Link to={"/product/list/여행"}>
          <h1>여행</h1>
        </Link>
      </div>
      <div className="menu_bar" style={{ display: menuBar }}>
        <div
          className="menu_bar_text"
          style={{ transform: `translateX(${menuBarText}px)` }}
        >
          <h1>메뉴</h1>
          <div className="menu_bar_text_hidden">
            {loginText ? (
              <Link to={"/login"}>
                <h2>로그인</h2>
              </Link>
            ) : (
              <h2 onClick={handleLogout}>로그아웃</h2>
            )}

            {loginText ? null : (
              <>
                <Link to={"/user/edit/userinfo"}>
                  <h2>내 정보 수정</h2>
                </Link>
                <Link to={"/user/upload/product"}>
                  <h2>상품 업로드</h2>
                </Link>
                <Link to={"/user/enter/userproduct"}>
                  <h2>내 상품 수정</h2>
                </Link>
                <Link to={"/user/cart"}>
                  <h2>장바구니</h2>
                </Link>
              </>
            )}
            <Link to={"/used/product/list"}>
              <h2>중고상품</h2>
            </Link>
            <h2>검색하기</h2>
          </div>
          <h3 onClick={handleMenuClick}>
            <IoCloseSharp />
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
