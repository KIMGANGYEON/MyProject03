import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { menubar, menubarIcon, menubarText } from "../../../atom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { editUserInfo, enterUserInfo } from "../../../store/thunkFunctions";
import { SubmitHandler, useForm } from "react-hook-form";
import { resetStatus } from "../../../store/userSlice";
import { resetEdit } from "../../../store/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface sendData {
  userPassword: string;
  editEmail: string;
  editName: string;
}

const UserEditUserInfo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userData = useSelector((state: RootState) => state.user?.userData);
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
    setValue,
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

  const onEditSubmit: SubmitHandler<sendData> = ({ editName, editEmail }) => {
    const body = {
      editEmail,
      editName,
      userId,
    };
    dispatch(editUserInfo(body));
  };

  const userPassword = {
    required: "비밀번호를 입력해 주세요",
    minLength: {
      value: 6,
      message: "최소 6자리 이상 입니다",
    },
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
    if (userData) {
      setValue("editName", userData.name);
      setValue("editEmail", userData.email);
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
        <h1>회원정보 수정하기</h1>
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
            <label htmlFor="name">이름</label>
            <input
              type="text"
              placeholder="이름을 입력해 주세요"
              id="name"
              {...register("editName", userName)}
            />
            {errors?.editName && (
              <div>
                <span style={{ color: "red" }}>
                  {errors.editName.message?.toString()}
                </span>
              </div>
            )}

            <label htmlFor="email">이메일</label>
            <input
              type="email"
              placeholder="이메일을 입력해 주세요"
              id="email"
              {...register("editEmail", userEmail)}
            />
            {errors?.editEmail && (
              <div>
                <span style={{ color: "red" }}>
                  {errors.editEmail.message?.toString()}
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

export default UserEditUserInfo;
