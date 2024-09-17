import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { joinUser } from "../../store/thunkFunctions";
import { AppDispatch, RootState } from "../../store";

interface sendData {
  name: string;
  email: string;
  password: string;
  password2: string;
  image?: string;
}

const Join = () => {
  // const { error } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<sendData>({ mode: "onChange" });

  const onSubmit: SubmitHandler<sendData> = ({
    name,
    email,
    password,
    password2,
  }) => {
    const body = {
      name,
      email,
      password,
      password2,
      image: "http://hello",
    };
    dispatch(joinUser(body));
    reset();
  };

  const userName = {
    required: "이름을 입력해 주세요",
    minLength: {
      value: 2,
      message: "최소 2자리 이상입니다",
    },
  };

  const userEmail = {
    required: "이메일을 입력해 주세요",
  };

  const userPassword = {
    required: "비밀번호를 입력해 주세요",
    minLength: {
      value: 6,
      message: "최소 6자리 이상입니다",
    },
  };

  const userPassword2 = {
    required: "비밀번호를 입력해 주세요",
    minLength: {
      value: 6,
      message: "최소 6자리 이상입니다",
    },
  };

  return (
    <div className="login">
      <div className="login_header">
        <h1>회원가입</h1>
      </div>
      <div className="login_form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name">이름</label>
          <input
            id="name"
            type="text"
            placeholder="이름을 입력하세요"
            {...register("name", userName)}
          />
          {errors?.name && (
            <div className="error_form_message">
              <span>{errors.name.message?.toString()}</span>
            </div>
          )}

          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="email"
            placeholder="이메일을 입력하세요"
            {...register("email", userEmail)}
          />
          {errors?.email && (
            <div className="error_form_message">
              <span>{errors.email.message?.toString()}</span>
            </div>
          )}

          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            {...register("password", userPassword)}
          />
          {errors?.password && (
            <div className="error_form_message">
              <span>{errors.password.message?.toString()}</span>
            </div>
          )}

          <label htmlFor="password2">비밀번호 확인</label>
          <input
            id="password2"
            type="password"
            placeholder="비밀번호를 입력하세요"
            {...register("password2", userPassword2)}
          />
          {errors?.password2 && (
            <div className="error_form_message">
              <span>{errors.password2.message?.toString()}</span>
            </div>
          )}

          <button type="submit">회원가입 하기</button>
        </form>

        <div className="go_login">
          <p>아이디가 있으신가요?</p>
          <Link to={"/login"}>
            <span>로그인</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Join;
