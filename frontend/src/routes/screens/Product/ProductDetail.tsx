import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailBook } from "../../../api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { userAddCart } from "../../../store/thunkFunctions";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { id } = useParams();

  const { isLoading, data: detailBook } = useQuery({
    queryKey: ["bookData", id],
    queryFn: () => getDetailBook(id),
  });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleUserAddCart = () => {
    dispatch(userAddCart(id)).then((data) => {
      if ((data.payload as { state: string }).state === "success") {
        navigate("/");
        toast.success("상품이 장바구니에 추가되었습니다");
      }
    });
  };

  return (
    <>
      {detailBook?.map((book) => (
        <div key={book.isbn} className="bookdetail">
          <div className="bookdetail_imgbox">
            <img src={book.image} alt="" />
          </div>
          <div className="bookdetail_textbox">
            <div className="bookdetail_textbox_header">
              <h1>{book.title}</h1>
              <h2>{book.author}</h2>
            </div>
            <h2>
              {book.description.length > 350
                ? `${book.description.slice(0, 340)}...`
                : book.description}
            </h2>
            <div className="bookdetail_textbox_btn">
              <h3>{book.publisher} 출판사</h3>
              <div className="bookdetail_textbox_btn_discount">
                <h1>{book.discount}원</h1>
                <button onClick={handleUserAddCart}>장바구니</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductDetail;
