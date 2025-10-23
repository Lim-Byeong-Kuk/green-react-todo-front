// src/pages/member/KakaoRedirectPage.js
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAccessToken } from "../../api/kakaoApi";

const KakaoRedirectPage = () => {
  const [searchParams] = useSearchParams();
  const authCode = searchParams.get("code");

  useEffect(() => {
    if (!authCode) return;
    (async () => {
      try {
        const accessToken = await getAccessToken(authCode);
        console.log("kakao access_token:", accessToken);
        // TODO: accessToken으로 /v2/user/me 호출(권장: JS SDK) or 우리 서버 로그인 처리
      } catch (e) {
        // 네트워크 탭/콘솔에서 CORS 여부 꼭 확인
        alert("카카오 토큰 교환 실패");
      }
    })();
  }, [authCode]);

  return (
    <div>
      <div>Kakao Login Redirect</div>
      <div>{authCode}</div>
    </div>
  );
};

export default KakaoRedirectPage;
