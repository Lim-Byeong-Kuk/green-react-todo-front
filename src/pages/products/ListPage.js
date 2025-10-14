import React from "react";
import ListComponent from "../../components/products/ListComponent";

const ListPage = () => {
  return (
    <div className="w-full mt-4 border border-solid border-neutral-300 shadow-md">
      <div className="text-2xl m-4 font-extrabold">
        List Page Components
        <ListComponent />
      </div>
    </div>
  );
};

export default ListPage;
