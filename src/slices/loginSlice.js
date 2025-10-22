import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import React from "react";
import { loginPost } from "../api/memberApi";
import { getCookie, removeCooke, setCookie } from "../utils/cookieUtil";

const initState = {
  email: "",
};

const loadMemberCookie = () => {
  // 쿠키에서 로그인 정보 로딩
  console.log("loadMemberCookie 진입");
  const memberInfo = getCookie("member");
  console.log("loadMemberCookie : memberinfo ", memberInfo);
  //닉네임 처리
  if (memberInfo && memberInfo.nickname) {
    memberInfo.nickname = decodeURIComponent(memberInfo.nickname);
  }
  return memberInfo;
};

export const loginPostAsync = createAsyncThunk("loginPostAsync", (param) => {
  console.log("loginPostAsync 실행");
  return loginPost(param);
});

const loginSlice = createSlice({
  name: "LoginSlice",
  initialState: loadMemberCookie() || initState, //쿠키가 없다면 초기값 사용
  reducers: {
    login: (state, action) => {
      console.log("login.....");
      const payload = action.payload; //{소셜로그인 회원이 사용}
      console.log("action", action);
      console.log("action.payload", payload);
      setCookie("member", JSON.stringify(payload), 1); //1일
      return payload;
    },
    logout: (state, action) => {
      console.log("logout...");
      removeCooke("member");
      return { ...initState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginPostAsync.fulfilled, (state, action) => {
        console.log("fulfilled");
        const payload = action.payload;

        //정상적인 로그인시에만 저장
        if (!payload.error) {
          setCookie("member", JSON.stringify(payload), 1);
        }

        return action.payload;
      })
      .addCase(loginPostAsync.pending, (state, action) => {
        console.log("pending");
      })
      .addCase(loginPostAsync.rejected, (state, action) => {
        console.log("rejected");
      });
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
