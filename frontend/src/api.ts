import axios from "axios";

interface BookData {
  title: string;
  isbn: string;
  image: string;
  author: string;
  publisher: string;
  description: string;
  discount: string;
}

interface Bookresponse {
  items: BookData[];
}

export const getNaverBook = async () => {
  const response = await axios.get<Bookresponse>("/v1/search/book.json", {
    params: { query: "최신", display: 20, start: 1, sort: "sim" },
    headers: {
      "X-Naver-Client-Id": process.env.REACT_APP_NAVER_CLIENT_ID,
      "X-Naver-Client-Secret": process.env.REACT_APP_NAVER_CLIENT_SECRET,
    },
  });
  return response.data.items;
};

export const getHitBook = async () => {
  const response = await axios.get<Bookresponse>("/v1/search/book.json", {
    params: { query: "히트", display: 20, start: 1, sort: "sim" },
    headers: {
      "X-Naver-Client-Id": process.env.REACT_APP_NAVER_CLIENT_ID,
      "X-Naver-Client-Secret": process.env.REACT_APP_NAVER_CLIENT_SECRET,
    },
  });
  return response.data.items;
};

export const getSelectBook = async (resuts: string | undefined) => {
  const response = await axios.get<Bookresponse>("/v1/search/book.json", {
    params: { query: resuts, display: 10, start: 1, sort: "sim" },
    headers: {
      "X-Naver-Client-Id": process.env.REACT_APP_NAVER_CLIENT_ID,
      "X-Naver-Client-Secret": process.env.REACT_APP_NAVER_CLIENT_SECRET,
    },
  });
  return response.data.items;
};

export const getDetailBook = async (resuts: string | undefined) => {
  const response = await axios.get<Bookresponse>("/v1/search/book.json", {
    params: { query: resuts, display: 10, start: 1, sort: "sim" },
    headers: {
      "X-Naver-Client-Id": process.env.REACT_APP_NAVER_CLIENT_ID,
      "X-Naver-Client-Secret": process.env.REACT_APP_NAVER_CLIENT_SECRET,
    },
  });
  return response.data.items;
};

export const getListBook = async (
  resuts: string | undefined,
  loadMore: number
) => {
  const response = await axios.get<Bookresponse>("/v1/search/book.json", {
    params: { query: resuts, display: 100, start: 1, sort: "sim" },
    headers: {
      "X-Naver-Client-Id": process.env.REACT_APP_NAVER_CLIENT_ID,
      "X-Naver-Client-Secret": process.env.REACT_APP_NAVER_CLIENT_SECRET,
    },
  });
  return response.data.items;
};
