import React, { useEffect, useState } from "react";
import { deleteOne, getOne, putOne } from "../../api/todoApi";
import { useNavigate } from "react-router-dom";
import useCustomMove from "../../hooks/useCustomMove";
import ResultModal from "../common/ResultModal";

const initState = {
  tno: 0,
  title: "",
  writer: "",
  dueDate: "",
  complete: false,
};

function formatDateToInput(val) {
  if (!val) return "";
  //val 이 "2025-10-10T00:00:00" / "2025-10-10" /Date 등 다양한 형태일 수 있음
  const d = typeof val === "string" ? new Date(val) : val;
  if (Number.isNaN(d.getTime())) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const da = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${da}`;
}

const ModifyComponent = ({ tno }) => {
  const [todo, setTodo] = useState({ ...initState });
  //모달 창을 위한 상태
  const [result, setResult] = useState(null);
  const { moveToList, moveToRead } = useCustomMove();
  const navigate = useNavigate();

  useEffect(() => {
    const getTodo = async () => {
      const data = await getOne(tno);
      setTodo({
        tno: data.tno ?? 0,
        title: data.title ?? "",
        writer: data.writer ?? "",
        dueDate: formatDateToInput(data.dueDate),
        complete: !!data.complete,
      });
    };
    getTodo();
  }, [tno]);

  const handleChangeTodo = (e) => {
    const { name, value } = e.target;
    setTodo((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeTodoComplete = (e) => {
    const { value } = e.target;
    setTodo((prev) => ({ ...prev, complete: value === "Y" }));
  };

  const handleClickModify = () => {
    const modifyOne = async () => {
      const data = await putOne(todo);
      setTodo({
        tno: data.tno ?? 0,
        title: data.title ?? "",
        writer: data.writer ?? "",
        dueDate: formatDateToInput(data.dueDate),
        complete: !!data.complete,
      });
      setResult("Modified");
    };
    modifyOne();
  };

  const handleClickDelete = () => {
    const deleteTodo = async () => {
      const data = await deleteOne(tno);
      navigate("/todo/list");
      setResult("Deleted");
    };
    deleteTodo();
  };

  const closeModal = () => {
    if (result === "Deleted") {
      moveToList();
    } else {
      moveToRead(tno);
    }
  };

  return (
    // 번호 (id)
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {result ? (
        <ResultModal
          title="처리결과"
          content={result}
          callbackFn={closeModal}
        ></ResultModal>
      ) : (
        <></>
      )}

      <div className="flex justify-center mt-10">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">TNO</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md bg-gray-100">
            {todo.tno}
          </div>
        </div>
      </div>

      {/* 작성자 읽기전용 */}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-strecth">
          <div className="w-1/5 p-6 text-right font-bold">WRITER</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md bg-gray-100">
            {todo.writer}
          </div>
        </div>
      </div>

      {/* 제목 */}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">TITLE</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="title"
            type="text"
            value={todo.title}
            onChange={handleChangeTodo}
          ></input>
        </div>
      </div>

      {/* 마감일 */}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">DUEDATE</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="dueDate"
            type="date"
            value={formatDateToInput(todo.dueDate)}
            onChange={handleChangeTodo}
          ></input>
        </div>
      </div>

      {/* 완료 여부 */}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">COMPLETE</div>
          <select
            name="status"
            className="border-solid border-2 rounded m-1 p-2"
            onChange={handleChangeTodoComplete}
            value={todo.complete ? "Y" : "N"}
          >
            <option value="Y">완료</option>
            <option value="N">미완료</option>
          </select>
        </div>
      </div>

      {/* 액션 버튼 */}
      <div className="flex justify-end p-4">
        <button
          type="button"
          className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
          onClick={handleClickDelete}
        >
          삭제
        </button>
        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
          onClick={handleClickModify}
        >
          수정
        </button>
      </div>
    </div>
  );
};

export default ModifyComponent;
