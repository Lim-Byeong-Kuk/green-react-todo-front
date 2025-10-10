import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import ReadComponent from "../../components/todo/ReadComponent";

const ReadPage = () => {
  const { tno } = useParams();
  const navigate = useNavigate();

  const [queryParams] = useSearchParams();

  const page = parseInt(queryParams.get("page")) || 1;
  const size = parseInt(queryParams.get("size")) || 10;
  const queryStr = createSearchParams({ page, size }).toString();

  const moveToModify = useCallback(
    (tno) => {
      navigate({ pathname: `/todo/modify/${tno}`, search: queryStr });
    },
    [tno, page, size]
  );

  return (
    <div className="text-3xl font-extrabold">
      Todo Read Page Component {tno}
      <div className="text-2xl">Todo Read Page Component {tno}</div>
      <ReadComponent tno={tno} />
    </div>
  );
};

export default ReadPage;
