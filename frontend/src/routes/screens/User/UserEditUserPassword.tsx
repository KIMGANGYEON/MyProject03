import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { menubar, menubarIcon, menubarText } from "../../../atom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { editUserPassword, enterUserInfo } from "../../../store/thunkFunctions";
import { SubmitHandler, useForm } from "react-hook-form";
import { resetStatus } from "../../../store/userSlice";
import { resetEdit } from "../../../store/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface sendData {
  userPassword: string;
  newUserPassword: string;
  newUserPassword2: string;
}

const UserEditUserPassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.user?.userData.id);
  const status = useSelector((state: RootState) => state.user?.status);
  const edit = useSelector((state: RootState) => state.user?.edit);
  const navigate = useNavigate();
  const setMenuBar = useSetRecoilState(menubar);
  const setMenubarIcon = useSetRecoilState(menubarIcon);
  const setMenuBarText = useSetRecoilState(menubarText);
  const [showEditForm, setShowEditForm] = useState(true);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<sendData>({ mode: "onChange" });

  const onEnterSubmit: SubmitHandler<sendData> = ({ userPassword }) => {
    const body = {
      userPassword,
      userId,
    };
    dispatch(enterUserInfo(body));
    reset();
  };

  const onEditSubmit: SubmitHandler<sendData> = ({
    newUserPassword,
    userPassword,
    newUserPassword2,
  }) => {
    const body = {
      userPassword,
      newUserPassword,
      newUserPassword2,
      userId,
    };
    dispatch(editUserPassword(body));
  };

  const userPassword = {
    required: "비밀번호를 입력해 주세요",
    minLength: {
      value: 6,
      message: "최소 6자리 이상 입니다",
    },
  };

  const newUserPassword = {
    required: "비밀번호를 입력해 주세요",
    minLength: {
      value: 6,
      message: "최소 6자리 이상 입니다",
    },
  };

  const newUserPassword2 = {
    required: "비밀번호를 입력해 주세요",
    minLength: {
      value: 6,
      message: "최소 6자리 이상 입니다",
    },
  };

  useEffect(() => {
    setMenubarIcon(true);
    setMenuBar("none");
    setMenuBarText(-200);
    dispatch(resetStatus());
    dispatch(resetEdit());
  }, []);

  useEffect(() => {
    if (status === "success") {
      setShowEditForm(false);
    }
  }, [status]);

  useEffect(() => {
    if (edit) {
      navigate("/");
      toast.info("회원정보 수정을 완료했습니다");
    }
  }, [edit]);

  return (
    <div className="edituserinfo">
      <div className="edituserinfo_header">
        <h1>비밀번호 수정하기</h1>
      </div>

      {showEditForm ? (
        <div className="edituserinfo_enter">
          <form onSubmit={handleSubmit(onEnterSubmit)}>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              {...register("userPassword", userPassword)}
            />
            {errors?.userPassword && (
              <div>
                <span>{errors.userPassword.message?.toString()}</span>
              </div>
            )}
            <button type="submit">확인</button>
          </form>
        </div>
      ) : (
        <div className="edituserinfo_edit">
          <form onSubmit={handleSubmit(onEditSubmit)}>
            <label htmlFor="name">이전 비밀번호</label>
            <input
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              id="name"
              {...register("userPassword", userPassword)}
            />
            {errors?.userPassword && (
              <div>
                <span style={{ color: "red" }}>
                  {errors.userPassword.message?.toString()}
                </span>
              </div>
            )}

            <label htmlFor="email">신규 비밀번호</label>
            <input
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              id="email"
              {...register("newUserPassword", newUserPassword)}
            />
            {errors?.newUserPassword && (
              <div>
                <span style={{ color: "red" }}>
                  {errors.newUserPassword.message?.toString()}
                </span>
              </div>
            )}

            <label htmlFor="email">신규 비밀번호 확인</label>
            <input
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              id="email"
              {...register("newUserPassword2", newUserPassword2)}
            />
            {errors?.newUserPassword2 && (
              <div>
                <span style={{ color: "red" }}>
                  {errors.newUserPassword2.message?.toString()}
                </span>
              </div>
            )}

            <button>수정하기</button>
          </form>
          <Link to={"/user/edit/userpassword"}>
            <span className="editpassword">비밀번호 변경하기</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserEditUserPassword;
