import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const ListPage = () => {
  const [queryParams] = useSearchParams();

  const page = queryParams.get("page") || 1;
  const size = queryParams.get("size") || 10;

  const [scores, setScores] = useState([]);

  useEffect(() => {
    const f = async () => {
      const res = await axios.get(`http://localhost:8080/todo/list`);
      console.log(res.data);
      setScores(res.data);
    };
    f();
  }, []);

  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">
        Todo List Page Componen {page}---{size}
      </div>

      {scores.map((i) => (
        <div>
          <Link to={`/todo/read/${i.sno}`} className="bg-purple-100">
            {i.sno}
          </Link>
          , {i.name}, {i.korea}, {i.math}, {i.eng}, {i.total}, {i.avg},{" "}
          {i.grade}
        </div>
      ))}
    </div>
  );
};

export default ListPage;
