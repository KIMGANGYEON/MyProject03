import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { getHitBook } from "../../../api";
import { Link } from "react-router-dom";

interface Bookdata {
  image: string;
  isbn: string;
  title: string;
}

const HotItems = () => {
  const [bookData, setBookData] = useState<Bookdata[]>([]);
  const [imgMove, setImgMove] = useState(0);
  const [selectedIsbn, setSelectedIsbn] = useState<string | null>(null);
  const { isLoading, data } = useQuery({
    queryKey: ["hitBooks"],
    queryFn: getHitBook,
  });

  const handleMoveRight = () => {
    if (imgMove === -236) return;
    setImgMove((prev) => prev - 59);
  };

  const handleMoveLeft = () => {
    if (imgMove === 0) return;
    setImgMove((prev) => prev + 59);
  };
  const handleMouseEnter = (isbn: string) => {
    setSelectedIsbn(isbn);
  };

  const handleMouseLeave = () => {
    setSelectedIsbn(null);
  };

  useEffect(() => {
    setBookData(data ?? []);
  }, [isLoading]);

  return (
    <div className="hititems">
      <div className="hititems_left">
        <h1>히트</h1>
        <h2>북스토어에서만 만나볼 수 있는 특별한 상품들을 지금 소개합니다.</h2>
        <div className="hititems_left_btn">
          <button onClick={handleMoveLeft}>
            <FaArrowCircleLeft />
          </button>
          <button onClick={handleMoveRight}>
            <FaArrowCircleRight />
          </button>
        </div>
      </div>
      <div className="hititems_right">
        <div
          className="hititems_right_img"
          style={{ transform: `translateX(${imgMove}vw)` }}
        >
          {bookData?.map((book) => (
            <Link to={`/product/detail/${book.isbn}`} key={book.isbn}>
              <div
                className="hititems_right_img_box"
                onMouseEnter={() => handleMouseEnter(book.isbn)}
                onMouseLeave={handleMouseLeave}
              >
                <img src={book.image} alt={book.title} />
                <div
                  className="hititems_right_img_box_hover"
                  style={{
                    opacity: selectedIsbn === book.isbn ? 1 : 0,
                  }}
                >
                  <h1>{book.title}</h1>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotItems;
