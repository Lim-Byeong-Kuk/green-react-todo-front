import React, { useEffect } from "react";
import { useState } from "react";
import { makeDiv, tasks } from "../../utils/autocss";
import useCustomMove from "../../hooks/useCustomMove";
import { useParams, useSearchParams } from "react-router-dom";
import PageComponent from "../common/PageComponent";
import { getList } from "../../api/addressApi";

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
  const { page, size, refresh, moveToRead, moveToList } = useCustomMove();
  const [serverData, setServerData] = useState(initState);

  useEffect(() => {
    const list = async () => {
      const res = await getList({ page, size });
      const { data } = res;
      console.log(data);

      setServerData(data);
    };
    list();
  }, [page, size, refresh]);

  return (
    <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
      <div className="flex flex-wrap mx-auto justify-center p-6">
        {serverData.dtoList.map((product) => (
          <div
            key={product.ano}
            className="w-full min-w-[400px] p-2 m-2 rounded shadow-md"
            onClick={() => moveToRead(product.ano)}
          >
            <div className="flex">
              <div className="font-extrabold text-2xl p-2 w-1/12">
                {product.ano}
              </div>
              <div className="text-1xl m-1 p-2 w-8/12 font-extrabold">
                {product.name}
              </div>
              <div className="text-1xl m-1 p-2 w-2/10 font-medium">
                {product.age}
              </div>
              <div className="text-1xl m-1 p-2 w-2/10 font-medium">
                {product.city}
              </div>
              <div className="text-1xl m-1 p-2 w-2/10 font-medium">
                {product.gu}
              </div>
              <div className="text-1xl m-1 p-2 w-2/10 font-medium">
                {product.dong}
              </div>
            </div>
          </div>
        ))}
      </div>
      <PageComponent
        serverData={serverData}
        movePage={moveToList}
      ></PageComponent>
    </div>
  );
};

export default ListComponent;
