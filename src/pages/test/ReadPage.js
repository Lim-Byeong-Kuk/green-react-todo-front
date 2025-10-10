import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ReadPage = () => {
  const { tno } = useParams();

  const [score, setScore] = useState({});

  useEffect(() => {
    const f = async () => {
      const res = await axios.get(`http://localhost:8080/todo/read/${tno}`);
      console.log(res.data);
      setScore(res.data);
    };
    f();
  }, []);

  return (
    <div className="text-3xl font-extrabold">
      Todo Read Page Component {tno}
      <div>
        {score.sno}, {score.name}, {score.korea} ,{score.math}, {score.eng},{" "}
        {score.total}, {score.avg}, {score.grade}
      </div>
    </div>
  );
};

export default ReadPage;
