import axios from "axios";
import { getCookie, setCookie } from "./cookieUtil";
import { refreshJWT } from "../api/memberApi";

const jwtAxios = axios.create();

//before request
const beforeReq = (config) => {
  console.log("before request.........");

  const memberInfo = getCookie("member");
  if (!memberInfo) {
    console.log("Member NOT FOUND");
    return Promise.reject({ response: { data: { error: "REQUIRE_LOGIN" } } });
  }

  const { accessToken } = memberInfo;
  // API 서버 호출 전에 Authorization 헤더를 추가하도록 구성
  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
};

//fail request
const requestFail = (err) => {
  console.log("request error.........");
  return Promise.reject(err);
};

//before return response
const beforeRes = async (res) => {
  console.log("before return response........");

  //Refresh Token 을 이용한 자동 갱신
  console.log(res);
  const data = res.data;

  if (data && data.error === "ERROR_ACCESS_TOKEN") {
    console.log("ERROR_ACCESS_TOKEN 상황");
    const memberCookieValue = getCookie("member");
    const result = await refreshJWT(
      memberCookieValue.accessToken,
      memberCookieValue.refreshToken
    );
    console.log("refreshJWT RESULT", result);

    memberCookieValue.accessToken = result.accessToken;
    memberCookieValue.refreshToken = result.refreshToken;

    setCookie("member", JSON.stringify(memberCookieValue), 1);

    //원래의 호출
    const originalRequest = res.config;
    originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;
    return await axios(originalRequest);
  }

  return res;
};

//fail response
const responseFail = (err) => {
  console.log("response fail error.........");
  return Promise.reject(err);
};

jwtAxios.interceptors.request.use(beforeReq, requestFail);
jwtAxios.interceptors.response.use(beforeRes, responseFail);

export default jwtAxios;
