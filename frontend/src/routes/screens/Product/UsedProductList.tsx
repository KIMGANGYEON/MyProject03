import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { menubar, menubarIcon, menubarText } from "../../../atom";
import { useDispatch } from "react-redux";
import { resetEdit, resetStatus } from "../../../store/userSlice";
import { AppDispatch } from "../../../store";
import { getUsedProduct } from "../../../store/thunkFunctions";
import { Link } from "react-router-dom";

interface Product {
  title: string;
  _id: string;
  images: string[];
  price: string;
}

const UsedProductList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const setMenuBar = useSetRecoilState(menubar);
  const setMenubarIcon = useSetRecoilState(menubarIcon);
  const setMenuBarText = useSetRecoilState(menubarText);
  const [product, setProduct] = useState<Product[]>([]);

  useEffect(() => {
    setMenubarIcon(true);
    setMenuBar("none");
    setMenuBarText(-200);
    dispatch(resetStatus());
    dispatch(resetEdit());
    dispatch(getUsedProduct()).then((data) => {
      setProduct((data.payload as { products: Product[] }).products);
    });
  }, []);

  return (
    <div className="usedproduct">
      <div className="usedproduct_header">
        <h1>중고상품</h1>
      </div>
      <div className="usedproduct_item">
        {product.map((item) => (
          <div className="usedproduct_item_wrap" key={item._id}>
            <div className="usedproduct_item_img">
              <Link to={`/used/product/detail/${item._id}`}>
                <img
                  src={`${process.env.REACT_APP_BASE_URL}${item.images[0]}`}
                />
              </Link>
            </div>
            <div className="usedproduct_item_text">
              <Link to={`/used/product/detail/${item._id}`}>
                <h1>{item.title}</h1>
              </Link>
              <h2>{Number(item.price).toLocaleString("ko-KR")} 원</h2>{" "}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsedProductList;
