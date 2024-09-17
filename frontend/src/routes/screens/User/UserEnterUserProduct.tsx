import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { menubar, menubarIcon, menubarText } from "../../../atom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { enterUserProduct } from "../../../store/thunkFunctions";
import { Link } from "react-router-dom";

interface Product {
  title: string;
  _id: string;
  images: string;
}

const UserEnterUserProduct = () => {
  const user = useSelector((state: RootState) => state.user?.userData.id);
  const setMenuBar = useSetRecoilState(menubar);
  const setMenubarIcon = useSetRecoilState(menubarIcon);
  const setMenuBarText = useSetRecoilState(menubarText);
  const dispatch = useDispatch<AppDispatch>();
  const [product, setProduct] = useState<Product[]>([]);
  useEffect(() => {
    setMenubarIcon(true);
    setMenuBar("none");
    setMenuBarText(-200);
    dispatch(enterUserProduct(user)).then((data) => {
      const response = data.payload as { product: Product[] };
      setProduct(response.product);
    });
  }, []);

  return (
    <div className="userenteruserproduct">
      <div className="userenteruserproduct_header">
        <h1>내 상품 수정하기</h1>
      </div>
      {product.length < 1 ? (
        <h1 style={{ marginTop: 20, fontSize: 30 }}>
          업로드한 상품이 없습니다
        </h1>
      ) : (
        <div className="userenteruserproduct_item">
          {product.map((item) => (
            <div key={item._id} className="userenteruserproduct_item_box">
              <Link to={`/user/edit/userproduct/${item._id}`}>
                <img
                  src={`${process.env.REACT_APP_BASE_URL}${item.images[0]}`}
                  alt=""
                />
              </Link>
              <Link to={`/user/edit/userproduct/${item._id}`}>
                <h1>{item.title}</h1>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserEnterUserProduct;
