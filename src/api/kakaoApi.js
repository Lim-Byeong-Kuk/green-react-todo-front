import axios from "axios";
import { API_SERVER_HOST } from "./memberApi";

const rest_api_key = `05d3bd40cb38ee1be32634c09af3ba78`;
const redirect_uri = `http://localhost:3000/member/kakao`;

const auth_code_path = `https://kauth.kakao.com/oauth/authorize`;

const access_token_url = `https://kauth.kakao.com/oauth/token`;

export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  return kakaoURL;
};

// export const getAccessToken = async (authCode) => {
//   const header = {
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//   };
//   const params = {
//     grant_type: "authorization_code",
//     client_id: rest_api_key,
//     redirect_uri: redirect_uri,
//     code: authCode,
//   };
//   const res = await axios.post(access_token_url, params, header);
//   const accessToken = res.data.access_token;

//   return accessToken;
// };

export const getAccessToken = async (authCode) => {
  try {
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("client_id", rest_api_key);
    params.append("redirect_uri", redirect_uri);
    params.append("code", authCode);
    // 앱에 client_secret을 설정했다면 아래도 필수
    // params.append("client_secret", "YOUR_CLIENT_SECRET");

    const { data } = await axios.post(access_token_url, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    // 카카오 응답 예시: { access_token, token_type, refresh_token, expires_in, ... }
    return data.access_token;
  } catch (err) {
    console.error("kakao token error:", err);
    throw err;
  }
};

export const getMemberWithAccessToken = async (accessToken) => {
  const res = await axios.get(
    `${API_SERVER_HOST}/api/member/kakao?accessToken=${accessToken}`
  );
  return res.data;
};
