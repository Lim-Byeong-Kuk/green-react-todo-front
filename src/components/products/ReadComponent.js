import React, { useEffect, useState } from "react";
import { API_SERVER_HOST, getOne, postAdd } from "../../api/productApi";
import FetchingModal from "../common/FetchingModal";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove";

import { useParams } from "react-router-dom";
import useCustomCart from "../../hooks/useCustomCart";
import useCustomLogin from "../../hooks/useCustomLogin";
import { useQuery } from "@tanstack/react-query";

const initState = {
  pno: 0,
  pname: "",
  pdesc: "",
  price: 0,
  uploadFileNames: [],
};
const host = API_SERVER_HOST;

const ReadComponent = () => {
  // const [product, setProduct] = useState({ ...initState });
  const { moveToList, moveToModify } = useCustomMove();
  const [fetching, setFetching] = useState(false);
  const { pno } = useParams();
  //장바구니 기능
  const { changeCart, cartItems } = useCustomCart();
  //로그인 정보
  const { loginState } = useCustomLogin();
  //리액트 쿼리 v5 버전 문법 : 1개의 객체로
  const { isFetching, data: product } = useQuery({
    queryKey: ["product", pno],
    queryFn: () => getOne(pno),
    enabled: !!pno,
    staleTime: 1000 * 10,
    retry: 1,
  });

  // useEffect(() => {
  //   setFetching(true);
  //   const readOne = async () => {
  //     const data = await getOne(pno);
  //     console.log("1개조회 data: ", data);
  //     setProduct(data);
  //     setFetching(false);
  //   };
  //   readOne();
  // }, [pno]);

  const handleClickAddCart = () => {
    let qty = 1;

    const addedItem = cartItems.filter((item) => item.pno === parseInt(pno))[0];

    if (addedItem) {
      if (
        window.confirm("이미 추가된 상품입니다. 추가하시겠습니까?") === false
      ) {
        return;
      }
      qty = addedItem.qty + 1;
    }
    changeCart({ email: loginState.email, pno: pno, qty: qty });
  };

  // if (!product) {
  //   return <div> 존재하지 않는 상품 정보입니다.</div>;
  // }

  if (!product) {
    return <FetchingModal />;
  }

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {/* {isFetching ? <FetchingModal /> : <></>} */}

      {/* PNO */}
      <div className="flex justify-center mt-10">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">제품번호</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {product.pno}
          </div>
        </div>
      </div>
      {/* pname */}
      <div className="flex justify-center mt-10">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">제품명</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {product.pname}
          </div>
        </div>
      </div>
      {/* pdesc */}
      <div className="flex justify-center mt-10">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">상품설명</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {product.pdesc}
          </div>
        </div>
      </div>
      {/* price */}
      <div className="flex justify-center mt-10">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">가격</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {product.price}
          </div>
        </div>
      </div>

      {/* 파일 */}
      <div className="w-full flex justify-center flex-col m-auto items-center">
        {product.uploadFileNames.map((imgFile, i) => (
          <img
            alt="product"
            key={i}
            className="p-4 w-1/2"
            src={`${host}/api/products/view/${imgFile}`}
          />
        ))}
      </div>

      {/* 버튼 */}
      <div className="flex justify-end p-4">
        <button
          type="button"
          className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-green-500"
          onClick={handleClickAddCart}
        >
          Add Cart
        </button>
        <button
          type="button"
          className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
          onClick={() => moveToModify(pno)}
        >
          수정
        </button>
        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
          onClick={moveToList}
        >
          목록
        </button>
      </div>
    </div>
  );
};

export default ReadComponent;
