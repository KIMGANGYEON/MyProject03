import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getListBook } from "../../../api";
import { Link } from "react-router-dom";

const ProductList = () => {
  const { id } = useParams();
  const [loadMore, setLoadMore] = useState(30);

  const { data } = useQuery({
    queryKey: ["listBook", id, loadMore],
    queryFn: () => getListBook(id, loadMore),
  });

  useEffect(() => {
    setLoadMore(30);
  }, []);

  return (
    <div className="booklist">
      <div className="booklist_header">
        <h1>{id}</h1>
      </div>
      {data?.map((book) => (
        <div key={book.isbn} className="booklist_box">
          <div className="booklist_item">
            <Link to={`/product/detail/${book.isbn}`}>
              <img src={book.image} alt="" />
            </Link>
            <div className="booklist_item_text">
              <Link to={`/product/detail/${book.isbn}`}>
                <h1>{book.title}</h1>
              </Link>
              <h2>{book.author}</h2>
            </div>
          </div>
        </div>
      ))}
      <div style={{ margin: "20px 0px" }}></div>
    </div>
  );
};

export default ProductList;
