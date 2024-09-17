import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { getSelectBook } from "../../../api";
import { Link } from "react-router-dom";

interface BookData {
  title: string;
  isbn: string;
  image: string;
}

const Bookselect = () => {
  const [leftOpacity, setLeftOpacity] = useState(1);
  const [leftOpacity2, setLeftOpacity2] = useState(0.3);
  const [rightText, setRightText] = useState(true);
  const [textClass, setTextClass] = useState<string>("전체");
  const [results, setResults] = useState<string | undefined>("베스트 셀러");

  const handleLeftOpacity = () => {
    setLeftOpacity(1);
    setLeftOpacity2(0.3);
    setRightText(true);
    if (rightText === true) {
      return;
    }
    setTextClass("전체");
    setResults("베스트셀러");
  };

  const handleLeftOpacity2 = () => {
    setLeftOpacity(0.3);
    setLeftOpacity2(1);
    setRightText(false);
    if (rightText === false) {
      return;
    }
    setTextClass("국내도서");
    setResults("스테디셀러");
  };

  const handleRightTextClick = (
    event: React.MouseEvent<HTMLHeadingElement>
  ) => {
    const target = event.target as HTMLHeadingElement;
    const text = target.innerText;
    setTextClass(text);

    if (text === "전체") {
      setResults("베스트셀러");
    } else if (rightText === false && text === "외국도서") {
      setResults("외국문학");
    } else {
      setResults(text);
    }
  };

  const { isLoading, data: bookData } = useQuery({
    queryKey: ["bookSelect", results],
    queryFn: () => getSelectBook(results),
  });

  return (
    <div className="outlets">
      <div className="outlets_header">
        <div className="outlets_header_left">
          <h1 onClick={handleLeftOpacity} style={{ opacity: leftOpacity }}>
            베스트
          </h1>
          <h2>&nbsp;</h2>
          <h1 onClick={handleLeftOpacity2} style={{ opacity: leftOpacity2 }}>
            스테디
          </h1>
        </div>
        <div className="outlets_header_right">
          {rightText ? (
            <>
              <h1
                onClick={handleRightTextClick}
                className={textClass === "전체" ? "active" : ""}
              >
                전체
              </h1>
              <h1
                onClick={handleRightTextClick}
                className={textClass === "국내도서" ? "active" : ""}
              >
                국내도서
              </h1>
              <h1
                onClick={handleRightTextClick}
                className={textClass === "외국도서" ? "active" : ""}
              >
                외국도서
              </h1>
              <h1
                onClick={handleRightTextClick}
                className={textClass === "ebook" ? "active" : ""}
              >
                ebook
              </h1>
              <h1
                onClick={handleRightTextClick}
                className={textClass === "sam" ? "active" : ""}
              >
                sam
              </h1>
            </>
          ) : (
            <>
              <h1
                onClick={handleRightTextClick}
                className={textClass === "국내도서" ? "active" : ""}
              >
                국내도서
              </h1>
              <h1
                onClick={handleRightTextClick}
                className={textClass === "외국도서" ? "active" : ""}
              >
                외국도서
              </h1>
            </>
          )}
        </div>
      </div>
      <div className="bookselect">
        {bookData?.map((book: BookData) => (
          <div key={book.isbn}>
            <div className="bookselect_img">
              <Link to={`/product/detail/${book.isbn}`}>
                <img src={book.image} alt="" />
              </Link>
            </div>
            <div className="bookselect_text">
              <Link to={`/product/detail/${book.isbn}`}>
                <h1>{book.title}</h1>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookselect;
