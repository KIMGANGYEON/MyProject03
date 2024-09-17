import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../../../store";
import {
  getUsedProductDetail,
  userAddUsedProduct,
} from "../../../store/thunkFunctions";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { toast } from "react-toastify";

interface Product {
  title: string;
  images: string[];
  description: string;
  price: string;
}
const UsedProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [product, setProduct] = useState<Product[]>([]);

  const handleAddUsedCart = () => {
    dispatch(userAddUsedProduct(id)).then((data) => {
      if ((data.payload as { state: string }).state === "success") {
        toast.success("상품이 장바구니에 추가되었습니다");
      }
    });
  };

  useEffect(() => {
    dispatch(getUsedProductDetail(id)).then((data) =>
      setProduct((data.payload as { product: Product[] }).product)
    );
  }, []);

  return (
    <div className="usedproductdetail">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="mySwiper"
      >
        {product[0]?.images.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={`${process.env.REACT_APP_BASE_URL}${img}`} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="usedproductdetail_text">
        <div className="usedproductdetail_text_title">
          <h1>{product[0]?.title}</h1>
          <h2>{Number(product[0]?.price).toLocaleString("ko-KR")} 원</h2>
        </div>
        <div className="usedproductdetail_text_description">
          <h1>설명: {product[0]?.description}</h1>
        </div>
      </div>
      <div className="usedproductdetail_btn">
        <button onClick={handleAddUsedCart}>장바구니</button>
      </div>
    </div>
  );
};

export default UsedProductDetail;
