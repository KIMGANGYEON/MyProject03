import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { menubar, menubarIcon, menubarText } from "../../atom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { loginUser } from "../../store/thunkFunctions";

interface sendData {
  email: string;
  password: string;
}

const Login = () => {
  const setMenuBar = useSetRecoilState(menubar);
  const setMenubarIcon = useSetRecoilState(menubarIcon);
  const setMenuBarText = useSetRecoilState(menubarText);
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<sendData>({ mode: "onChange" });

  const onSubmit: SubmitHandler<sendData> = ({ email, password }) => {
    const body = {
      email,
      password,
    };

    dispatch(loginUser(body));
    reset();
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

  useEffect(() => {
    setMenubarIcon(true);
    setMenuBar("none");
    setMenuBarText(-200);
  }, []);

  return (
    <div className="login">
      <div className="login_header">
        <h1>로그인</h1>
      </div>
      <div className="login_form">
        <form onSubmit={handleSubmit(onSubmit)}>
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

          <button type="submit">로그인</button>
        </form>
        <div className="go_login">
          <p>아이디가 없으신가요?</p>
          <Link to={"/join"}>
            <span>회원가입</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
