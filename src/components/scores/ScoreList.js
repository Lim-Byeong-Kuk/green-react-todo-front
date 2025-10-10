import React, { useEffect, useState } from "react";
import { scoreGetList } from "../../api/scoreApi";
import { createSearchParams, Link, useSearchParams } from "react-router-dom";
import useCustomMove from "../../hooks/useCustomMove";

const ScoreList = () => {
  const { page, size, moveToRead } = useCustomMove();
  const [pageResponse, setPageResponse] = useState({});

  useEffect(() => {
    const f = async () => {
      const data = await scoreGetList({ page, size });
      console.log(data);
      setPageResponse(data);
    };
    f();
    console.log(page, size);
  }, []);

  return (
    <div>
      ScoreList
      <div>
        {pageResponse.dtoList &&
          pageResponse.dtoList.map((score) => (
            <div
              key={score.sno}
              className="w-full min-w-[400px] p-2 m-2 rounded shadow-md"
              onClick={() => moveToRead(score.sno)}
            >
              {score.sno},{score.name}, {score.korea}, {score.math}, {score.eng}
              , {score.total}, {score.avg}, {score.grade}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ScoreList;
