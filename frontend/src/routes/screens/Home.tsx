import { useQuery } from "@tanstack/react-query";
import { getNaverBook } from "../../api";
import { Helmet } from "react-helmet";
import Slidebox from "./Home/Slidebox";
import HotItems from "./Home/HotItems";
import Bookselect from "./Home/Bookselect";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { resetEdit, resetStatus } from "../../store/userSlice";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, data: newBook } = useQuery({
    queryKey: ["newBooks"],
    queryFn: getNaverBook,
  });

  useEffect(() => {
    dispatch(resetStatus());
    dispatch(resetEdit());
  }, []);

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div style={{ padding: "100px 200px" }}>
        <Slidebox data={newBook ?? []} />
        <HotItems />
        <Bookselect />
      </div>
    </>
  );
};

export default Home;
