import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { getUserNewCart } from "../../../store/thunkFunctions";
import axios from "axios";
import { FaChessKing } from "react-icons/fa6";

interface NewList {
  id: string;
  quantity: number;
}

interface Product {
  title: string;
  image: string;
  isbn: string;
  discount: number;
}

interface ProductArray {
  items: Product[];
}

const NewCart = () => {
  const userId = useSelector((state: RootState) => state.user?.userData.id);
  const dispatch = useDispatch<AppDispatch>();
  const [userNewList, setUserNewList] = useState<NewList[]>([]);
  const [userCart, setUserCart] = useState<any[]>([]);

  const getBookData = async () => {
    if (userNewList.length === 0) {
      alert("no product");
      return;
    }
    try {
      const requests = userNewList.map(
        async (product) =>
          await axios.get<ProductArray>("/v1/search/book.json", {
            params: {
              query: product.id,
              display: 1,
              start: 1,
              sort: "sim",
            },
            headers: {
              "X-Naver-Client-id": process.env.REACT_APP_NAVER_CLIENT_ID,
              "X-Naver-Client-Secret":
                process.env.REACT_APP_NAVER_CLIENT_SECRET,
            },
          })
      );

      const response = await Promise.all(requests);

      const bookDetail = response
        .flatMap((response) => response.data?.items)
        .map((item) => {
          const product = userNewList.find((p) => p.id === item.isbn);
          return {
            ...item,
            quantity: product ? product.quantity : 0,
          };
        });

      setUserCart(bookDetail);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCountPlus = () => {};
  const handleCountMinus = () => {};

  useEffect(() => {
    dispatch(getUserNewCart(userId)).then((data) => {
      setUserNewList((data.payload as { userNewCart: NewList[] }).userNewCart);
    });
  }, [userId, dispatch]);

  useEffect(() => {
    if (userNewList.length > 0) {
      getBookData();
    }
  }, [userNewList]);

  return (
    <div className="newcart">
      <div className="newcart_header">
        <h1>새상품</h1>
      </div>
      {userCart.length === 0 ? (
        <div style={{ marginTop: 20 }}>
          <h1 style={{ fontSize: 20 }}>장바구니가 비었습니다</h1>
        </div>
      ) : (
        <div className="newcart_wrap">
          {userCart.map((item) => (
            <div key={item.isbn} className="newcart_item">
              <img src={item.image} alt="" />
              <h1>{item.title}</h1>
              <h1>{item.author}</h1>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewCart;
