// src/api/kakaoApi.js
import axios from "axios";

const rest_api_key = `eb5929b271cc0fd97280b0266e638bfa`;
const redirect_uri = `http://localhost:3000/member/kakao`;

const access_token_url = `https://kauth.kakao.com/oauth/token`;

export const getKakaoLoginLink = () => {
  const kakaoURL =
    `https://kauth.kakao.com/oauth/authorize` +
    `?client_id=${rest_api_key}` +
    `&redirect_uri=${encodeURIComponent(redirect_uri)}` +
    `&response_type=code`;
  return kakaoURL;
};

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
