import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { menubar, menubarIcon, menubarText } from "../../../atom";
import NewCart from "./NewCart";
import OldCart from "./OldCart";

const UserCart = () => {
  const setMenuBar = useSetRecoilState(menubar);
  const setMenubarIcon = useSetRecoilState(menubarIcon);
  const setMenuBarText = useSetRecoilState(menubarText);
  const [showProduct, setProduct] = useState(true);

  const handleShowNew = () => {
    setProduct(true);
  };
  const handleShowOld = () => {
    setProduct(false);
  };

  useEffect(() => {
    setMenubarIcon(true);
    setMenuBar("none");
    setMenuBarText(-200);
  }, []);

  return (
    <div className="usercart">
      <div className="usercart_header">
        <h1>장바구니</h1>
      </div>
      <div className="usercart_btn">
        <button onClick={handleShowNew}>새상품</button>
        <button onClick={handleShowOld}>중고상품</button>
      </div>
      <div style={{ marginTop: 30 }}>
        {showProduct ? <NewCart /> : <OldCart />}
      </div>
    </div>
  );
};

export default UserCart;
