import React, { useRef, useState } from "react";
import { postAdd } from "../../api/productApi";
import FetchingModal from "../common/FetchingModal";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove";

const initState = { pname: "", pdesc: "", price: 0, files: [] };

const AddComponent = () => {
  const [product, setProduct] = useState({ ...initState });
  const [fetching, setFetching] = useState(false);
  const [result, setResult] = useState(null);

  const uploadRef = useRef();
  const { moveToList } = useCustomMove();

  const handleChangeProduct = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleClickAdd = (e) => {
    console.log(product);
    const files = uploadRef.current.files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]); //{files:[Multipart, <Multipart> ]}
    }
    //other data
    formData.append("pname", product.pname);
    formData.append("pdesc", product.pdesc);
    formData.append("price", product.price);
    console.log(formData);
    setFetching(true);
    postAdd(formData).then((data) => {
      console.log("데이터 추가후 : ", data);
      setFetching(false);
      setResult(data.result);
    });
  };

  const closeModal = () => {
    setResult(null);
    moveToList({ page: 1 });
  };
  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {fetching ? <FetchingModal></FetchingModal> : <></>}
      {result ? (
        <ResultModal
          title={"제품 추가 결과"}
          content={`${result} 번 등록 완료`}
          callbackFn={closeModal}
        ></ResultModal>
      ) : (
        <></>
      )}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Product Name</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="pname"
            type="text"
            value={product.pname}
            onChange={handleChangeProduct}
          ></input>
        </div>
      </div>
      {/* pdesc */}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">상품 설명</div>
          <textarea
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y"
            name="pdesc"
            rows="4"
            value={product.pdesc}
            onChange={handleChangeProduct}
          >
            {product.pdesc}
          </textarea>
        </div>
      </div>

      {/* price */}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">가격</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="price"
            type="number"
            value={product.price}
            onChange={handleChangeProduct}
          ></input>
        </div>
      </div>
      {/* file */}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">파일</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            ref={uploadRef}
            type="file"
            multiple={true}
          ></input>
        </div>
      </div>
      {/* 버튼 */}
      <div className="flex justify-end">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <button
            className="rounded p-4 w-36 bg-blue-500 text-xl text-white"
            type="button"
            onClick={handleClickAdd}
          >
            추가
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddComponent;
