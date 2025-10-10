import React, { useEffect, useState } from "react";
import { scoreGetOne } from "../../api/scoreApi";
import { useParams } from "react-router-dom";

const ScoreRead = () => {
  const { sno } = useParams();
  const [score, setScore] = useState({});

  useEffect(() => {
    const f = async () => {
      const data = await scoreGetOne(sno);
      console.log(data);
      setScore(data);
    };
    f();
  }, []);

  return (
    <div>
      ScoreRead
      <table>
        <thead>
          <tr>
            <td>번호</td>
            <td>이름</td>
            <td>국어</td>
            <td>수학</td>
            <td>영어</td>
            <td>총점</td>
            <td>평균</td>
            <td>등급</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{score.sno}</td>
            <td>{score.name}</td>
            <td>{score.korea}</td>
            <td>{score.math}</td>
            <td>{score.eng}</td>
            <td>{score.total}</td>
            <td>{score.avg}</td>
            <td>{score.grade}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ScoreRead;
