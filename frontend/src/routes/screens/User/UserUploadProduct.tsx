import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { menubar, menubarIcon, menubarText } from "../../../atom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { uploadUserProduct } from "../../../store/thunkFunctions";
import { AppDispatch, RootState } from "../../../store";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { resetEdit } from "../../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export interface ProductUpload {
  productTitle: string;
  productDescription: string;
  productPrice: string;
}

const UserUploadProduct = () => {
  const setMenuBar = useSetRecoilState(menubar);
  const setMenubarIcon = useSetRecoilState(menubarIcon);
  const setMenuBarText = useSetRecoilState(menubarText);
  const edit = useSelector((state: RootState) => state.user.edit);
  const navigate = useNavigate();
  const [uploadImg, setUploadImg] = useState<File[]>([]);
  const [showBtn, setShowBtn] = useState(false);
  const [moveRL, setMoveRL] = useState(0);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (uploadImg.length >= 5) {
      setShowBtn(true);
    }

    if (event.target.files) {
      const newImg = Array.from(event.target.files);
      if (uploadImg.length + newImg.length > 5) {
        setShowBtn(true);
      }
      if (uploadImg.length + newImg.length > 10) {
        alert("10개 이상의 이미지를 넣을수 없습니다");
        return;
      }
      setUploadImg((prev) => [...prev, ...newImg]);
    }
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ProductUpload>({ mode: "onChange" });
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit: SubmitHandler<ProductUpload> = async ({
    productTitle,
    productDescription,
    productPrice,
  }) => {
    const formData = new FormData();

    uploadImg.forEach((img) => {
      formData.append("uploadImg", img);
    });

    formData.append("productTitle", productTitle);
    formData.append("productDescription", productDescription);
    formData.append("productPrice", productPrice);

    dispatch(uploadUserProduct(formData));
  };

  const moveRight = () => {
    setMoveRL(-1250);
  };

  const moveLeft = () => {
    setMoveRL(0);
  };

  const handleimgDelete = (index: number) => {
    setUploadImg((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
  };

  const productTitle = {
    required: "제목을 입력해 주세요",
    minLength: {
      value: 2,
      message: "최소 2자리 이상입니다",
    },
  };

  const productDescription = {
    required: "설명을 입력해 주세요",
    minLength: {
      value: 5,
      message: "최소 5자리 이상입니다",
    },
  };

  const productPrice = {
    required: "가격을 입력해 주세요",
  };

  useEffect(() => {
    setMenubarIcon(true);
    setMenuBar("none");
    setMenuBarText(-200);
    dispatch(resetEdit());
  }, []);

  useEffect(() => {
    if (edit === true) {
      navigate("/");
      toast.info("상품 업로드가 완료 됐습니다");
    }
  }, [edit]);

  useEffect(() => {
    if (uploadImg.length <= 5) {
      setShowBtn(false);
      setMoveRL(0);
    }
  }, [uploadImg]);
  return (
    <div className="useruploadproduct">
      <div className="useruploadproduct_header">
        <h1>상품 업로드</h1>
      </div>
      <div className="useruploadproduct_img_wrap">
        <div
          className="useruploadproduct_img"
          style={{ transform: `translateX(${moveRL}px)` }}
        >
          {uploadImg.map((img, index) => (
            <div key={index} className="useruploadproduct_img_box">
              <img src={URL.createObjectURL(img)} />
              <button onClick={() => handleimgDelete(index)}>❌</button>
            </div>
          ))}
        </div>
        {showBtn ? (
          <div className="useruploadproduct_img_btn">
            <button onClick={moveLeft}>
              <FaArrowCircleLeft />
            </button>
            <button onClick={moveRight}>
              <FaArrowCircleRight />
            </button>
          </div>
        ) : null}
      </div>
      <div className="useruploadproduct_form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="file"
            accept="image/"
            multiple
            onChange={onChange}
            style={{ fontSize: 20 }}
          />
          <span style={{ fontSize: 18, marginLeft: 5 }}>
            총 선택된 파일 {uploadImg.length}/10
          </span>

          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            placeholder="상품 제목을 입력해 주세요"
            {...register("productTitle", productTitle)}
          />
          {errors?.productTitle && (
            <div style={{ marginTop: 5 }}>
              <span style={{ color: "red" }}>
                {errors.productTitle.message?.toString()}
              </span>
            </div>
          )}
          <label htmlFor="price">가격</label>
          <input
            type="number"
            id="price"
            placeholder="숫자만 입력해 주세요"
            {...register("productPrice", productPrice)}
          />
          {errors?.productPrice && (
            <div style={{ marginTop: 5 }}>
              <span style={{ color: "red" }}>
                {errors.productPrice.message?.toString()}
              </span>
            </div>
          )}

          <label htmlFor="description">설명</label>
          <textarea
            id="description"
            placeholder="설명을 입력해 주세요"
            {...register("productDescription", productDescription)}
          />
          {errors?.productDescription && (
            <div style={{ marginTop: 5 }}>
              <span style={{ color: "red" }}>
                {errors.productDescription.message?.toString()}
              </span>
            </div>
          )}

          <button>업로드 하기</button>
        </form>
      </div>
    </div>
  );
};

export default UserUploadProduct;
