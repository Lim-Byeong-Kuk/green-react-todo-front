import axios from "axios";
import jwtAxios from "../utils/jwtUtil";

export const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/member`;

export const loginPost = async (loginParam) => {
  const header = { headers: { "Content-Type": "x-www-form-urlencoded" } };

  const form = new FormData();
  form.append("username", loginParam.email);
  form.append("password", loginParam.pw);

  const res = await axios.post(`${prefix}/login`, form, header);

  return res.data;
};

export const modifyMember = async (member) => {
  const res = await jwtAxios.put(`${prefix}/modify`, member);
  return res.data;
};

/**
 * 리프레시 토큰을 사용하여 새로운 JWT 쌍 (Access/Refresh Token)을 요청합니다.
 * @param {string} accessToken 현재 만료되었거나 만료 예정인 Access Token
 * @param {string} refreshToken 유효한 Refresh Token
 * @returns {Promise<{accessToken: string, refreshToken: string}>} 새로운 토큰 쌍을 담은 객체
 */
export const refreshJWT = async (accessToken, refreshToken) => {
  const REFRESH_URL = `${prefix}/refresh`;

  try {
    const response = await axios.get(REFRESH_URL, {
      headers: {
        // Access Token을 "Authorization: Bearer <token>" 형식으로 헤더에 담아 전송
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        // Refresh Token을 쿼리 매개변수로 전송
        refreshToken: refreshToken,
      },
      // 서버에서 JWT 오류를 401 대신 200으로 커스텀하여 처리할 경우,
      // 오류 코드를 직접 처리해야 할 수 있습니다. 여기서는 정상 응답으로 가정합니다.
    });

    // 백엔드가 새로운 토큰 쌍을 {accessToken: '...', refreshToken: '...'} 형태로 반환한다고 가정
    const newTokens = response.data;

    // 토큰 갱신 성공 시 새로운 토큰 쌍 반환
    return {
      accessToken: newTokens.accessToken,
      refreshToken: newTokens.refreshToken,
    };
  } catch (error) {
    console.error("JWT 갱신 실패:", error);
    // 갱신 실패 시 로그인 페이지로 리다이렉트하거나 오류를 throw 할 수 있습니다.
    throw new Error("토큰 갱신에 실패했습니다. 다시 로그인해주세요.");
  }
};
