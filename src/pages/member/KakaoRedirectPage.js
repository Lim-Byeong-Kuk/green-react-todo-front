import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAccessToken, getMemberWithAccessToken } from "../../api/kakaoApi";
import { useDispatch } from "react-redux";
import { login } from "../../slices/loginSlice";
import useCustomLogin from "../../hooks/useCustomLogin";

const KakaoRedirectPage = () => {
  const [searchParams] = useSearchParams();
  const { moveToPath } = useCustomLogin();
  const dispatch = useDispatch();
  const authCode = searchParams.get("code");

  // useEffect(() => {
  //   getAccessToken(authCode).then((data) => {
  //     console.log(data);
  //   });
  // }, [authCode]);

  useEffect(() => {
    if (!authCode) return;
    (async () => {
      try {
        const accessToken = await getAccessToken(authCode);
        console.log("kakao access_token:", accessToken);

        getMemberWithAccessToken(accessToken).then((memberInfo) => {
          console.log("-------------------");
          console.log(memberInfo); // <- backend에서 보내준 유저정보 claims
          dispatch(login(memberInfo)); // store 에 저장
          if (memberInfo && !memberInfo.social) {
            console.log("소셜회원이 아닌 경우");
            moveToPath("/");
          } else {
            moveToPath("/member/modify");
          }
        });

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
