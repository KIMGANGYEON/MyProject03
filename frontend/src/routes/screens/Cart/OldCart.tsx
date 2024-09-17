import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { getUserOldCart } from "../../../store/thunkFunctions";

interface BookData {
  title: string;
}

const OldCart = () => {
  const userId = useSelector((state: RootState) => state.user?.userData.id);
  const dispatch = useDispatch<AppDispatch>();
  const [userCart, setUserCart] = useState<any[]>([]);

  useEffect(() => {
    dispatch(getUserOldCart(userId));
  }, [userId, dispatch]);

  return <div>OldCart</div>;
};

export default OldCart;
