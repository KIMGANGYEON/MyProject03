import { title } from "process";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

interface BookData {
  title: string;
  image: string;
  isbn: string;
  author: string;
  publisher: string;
}

interface BookArray {
  data: BookData[];
}

const Slidebox: React.FC<BookArray> = ({ data }) => {
  const progressCircle = useRef<SVGSVGElement | null>(null);
  const progressContent = useRef<HTMLSpanElement | null>(null);

  const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty("--progress", `${1 - progress}`);
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  if (!data || data.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="slidebox">
      <div className="slidebox_header">
        <h1>최근 발매한 도서</h1>
      </div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        {data &&
          data?.map((book, index) => (
            <SwiperSlide key={index}>
              <Link to={`/product/detail/${book.isbn}`}>
                <img src={book.image} />
              </Link>

              <div className="slide_img_text">
                <Link to={`/product/detail/${book.isbn}`}>
                  <h1>{book.title}</h1>
                </Link>
                <h2>{book.author}</h2>
              </div>
            </SwiperSlide>
          ))}
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </div>
  );
};

export default Slidebox;
