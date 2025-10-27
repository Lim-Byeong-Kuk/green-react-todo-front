import React, { useEffect } from "react";
import { useState } from "react";
import { getList, getOne } from "../../api/productApi";
import { makeDiv, tasks } from "../../utils/autocss";
import useCustomMove from "../../hooks/useCustomMove";
import { useParams, useSearchParams } from "react-router-dom";
import PageComponent from "../common/PageComponent";
import FetchingModal from "../common/FetchingModal";
import { API_SERVER_HOST } from "../../api/todoApi";
import useCustomLogin from "../../hooks/useCustomLogin";
import { useQuery } from "@tanstack/react-query";

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

const ListComponent = ({ tno }) => {
  const host = API_SERVER_HOST;
  const { page, size, refresh, moveToRead, moveToList } = useCustomMove();
  const { exceptionHandle, moveToLoginReturn } = useCustomLogin();
  // const [serverData, setServerData] = useState(initState);
  // const [fetching, setFetching] = useState(false);

  const { isFetching, data, error, isError } = useQuery({
    queryKey: ["products/list", { page, size }],
    queryFn: () => getList({ page, size }),
  });

  if (isError) {
    console.log(error);
    // exceptionHandle(error);
    exceptionHandle(error);
  }

  const serverData = data || initState;
  console.log("serverData: ", serverData);

  console.log("serverData.data ", serverData.data);
  // useEffect(() => {
  //   setFetching(true);
  //   const list = async () => {
  //     try {
  //       const res = await getList({ page, size });
  //       const { data } = res;
  //       console.log(data);

  //       setServerData(data);
  //       setFetching(false);

  //       console.log(data.dtoList);
  //     } catch (err) {
  //       exceptionHandle(err);
  //     }
  //   };
  //   list();
  // }, [page, size, refresh]);

  if (!data) {
    return <FetchingModal />;
  }

  return (
    <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
      <h1>ProductList components</h1>
      {/* {isFetching ? <FetchingModal /> : <></>} */}
      <div className="flex flex-wrap mx-auto p-6">
        {serverData.data.dtoList.map((product) => (
          <div
            key={product.pno}
            className="w-1/2 p-1 rounded shadow-md"
            onClick={() => moveToRead(product.pno)}
          >
            <div className="flex flex-col h-full">
              <div className="font-extrabold text-2xl p-2 w-full">
                {product.pno}
              </div>
              <div className="text-1xl m-1 p-2 w-full flex flex-col">
                <div className="w-full overflow-hidden">
                  <img
                    alt="product"
                    className="m-auto rounded w-60"
                    src={`${host}/api/products/view/s_${product.uploadFileNames[0]}`}
                    // src={`${host}/api/products/view/s_`}
                  />
                </div>
              </div>
              <div className="bottom-0 font-extrabold bg-white">
                <div className="text-center p-1">
                  {/* {product.pdesc} */}
                  이름 : {product.pname}
                </div>
                <div className="text-center p-1">가격 : {product.price}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <PageComponent
        serverData={serverData.data}
        movePage={moveToList}
      ></PageComponent>
    </div>
  );
};

export default ListComponent;
