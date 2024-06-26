import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../context/authContext";
import { InputButton } from "../components/InputContainer";
import { useNavigate } from "react-router-dom";
import useAuth from "../customHook/useAuth";
import { updateUser } from "../api/auth";

const MyPage = () => {
  const { userInfo, setUserInfo } = useContext(AuthContext);
  const [imgFile, setImgFile] = useState(null);
  const [imgPath, setImgPath] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useAuth();

  useEffect(() => {
    setName(userInfo.nickname);
    if (userInfo?.avatar) {
      setImgPath(userInfo?.avatar);
    }
  }, []);

  const uploadImg = (event) => {
    const File = event.target.files[0];
    setImgFile(File);
    const reader = new FileReader();
    reader.readAsDataURL(File);
    console.log(reader.result);
    reader.onload = () => {
      setImgPath(reader.result.toString());
    };
  };

  const onChangeHandler = (event) => {
    setName(event.target.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const newUserInfo = {
      avatar: imgFile,
      nickname: name,
    };
    const { avatar, nickname } = await updateUser(newUserInfo);
    setUserInfo({
      avatar,
      nickname,
      id: userInfo.id,
    });
    navigate("/");
  };

  return (
    <MyPageInner>
      <MyPageTitle>My Page ✍🏻</MyPageTitle>
      <MyPageContainer onSubmit={onSubmitHandler}>
        <AvatarWrapper>
          <img
            src={imgPath ? imgPath : "/public/icons8-사람-100.png"}
            style={{
              width: "100%",
              maxWidth: "130px",
              position: "absolute",
              objectFit: "cover",
              aspectRatio: "1/1",
              borderRadius: "50%",
            }}
          />
          <AvatarLabel htmlFor="avatar">+</AvatarLabel>
          <input
            type="file"
            name="avatar"
            id="avatar"
            onChange={uploadImg}
            style={{ display: "none" }}
          />
        </AvatarWrapper>
        {userInfo && (
          <UserInfoContainer>
            <UserInfoBox>
              <UserInfoTitle>아이디 : </UserInfoTitle>
              <UserInfoContent>{userInfo.id}</UserInfoContent>
            </UserInfoBox>
            <UserInfoBox style={{ borderColor: "transparent" }}>
              <UserInfoTitle>닉네임 :</UserInfoTitle>
              <UserInfoInput
                type="text"
                onChange={onChangeHandler}
                value={name}
              />
            </UserInfoBox>
          </UserInfoContainer>
        )}

        <InputButton type="submit">변경</InputButton>
      </MyPageContainer>
    </MyPageInner>
  );
};

export default MyPage;

const MyPageInner = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f5f7f8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MyPageContainer = styled.form`
  width: 90%;
  max-width: 450px;
  min-width: 330px;
  height: 450px;
  border-radius: 50px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  position: relative;
  padding: 0 6vw;
`;

const MyPageTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #202632;
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 40px;
`;

const AvatarWrapper = styled.label`
  width: 100%;
  height: 100%;
  max-width: 100px;
  max-height: 100px;
  position: relative;
  border-radius: 50%;
  margin-bottom: 5%;
`;

const AvatarLabel = styled.label`
  width: 100%;
  height: 100%;
  max-width: 30px;
  max-height: 30px;
  position: absolute;
  border-radius: 50%;
  border: 1px solid #aaa;
  right: 0;
  bottom: 0;
  font-size: 20px;
  color: #aaa;
  background-color: #fff;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  padding-top: 3%;
  cursor: pointer;
  &:hover {
    background-color: black;
    border-color: black;
    color: #fff;
    transition: 0.5s;
  }
`;

const UserInfoContainer = styled.div`
  width: 95%;
  height: 20vh;
  border-top: 1.5px solid #202632;
  border-bottom: 1.5px solid #202632;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 5%;
  margin: 5% 0;
`;

const UserInfoBox = styled.div`
  width: 100%;
  height: 10vh;
  border-bottom: 1px solid #aaa;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const UserInfoTitle = styled.div`
  width: 25%;
  height: 50%;
  display: flex;
  align-items: center;
  color: #202632;
  font-weight: 600;
  font-size: 16px;
`;

const UserInfoContent = styled.div`
  width: 70%;
  height: 50%;
  display: flex;
  align-items: center;
  color: #aaa;
`;

const UserInfoInput = styled.input`
  width: 60%;
  height: 40%;
  border: 1px solid #aaa;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #aaa;
  padding: 0 10px;
`;
