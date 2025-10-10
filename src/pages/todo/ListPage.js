import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getList } from "../../api/todoApi";
import ListComponent from "../../components/todo/ListComponent";

const ListPage = () => {
  const [queryParams] = useSearchParams();
  const page = queryParams.get("page") || 1;
  const size = queryParams.get("size") || 10;

  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">
        Todo List Page Componen {page}---{size}
      </div>
      <ListComponent />
    </div>
  );
};

export default ListPage;
