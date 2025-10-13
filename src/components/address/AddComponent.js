import React, { useRef, useState } from "react";
import { postAdd } from "../../api/addressApi";

const initState = { name: "", city: "", gu: "", dong: "", age: 0, files: [] };

const AddComponent = () => {
  const [address, setAddress] = useState({ ...initState });

  const uploadRef = useRef();

  const handleChangeAddress = (e) => {
    const { name, value } = e.target;

    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleClickAdd = (e) => {
    console.log(address);
    const files = uploadRef.current.files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]); //{files:[Multipart, <Multipart> ]}
    }
    //other data
    formData.append("name", address.name);
    formData.append("city", address.city);
    formData.append("gu", address.gu);
    formData.append("dong", address.dong);
    formData.append("age", address.age);
    console.log(formData);

    postAdd(formData);
  };

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Address Name</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="name"
            type="text"
            value={address.name}
            onChange={handleChangeAddress}
          ></input>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">age</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="age"
            type="number"
            value={address.age}
            onChange={handleChangeAddress}
          ></input>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">City</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="city"
            type="text"
            value={address.city}
            onChange={handleChangeAddress}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">gu</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="gu"
            type="text"
            value={address.gu}
            onChange={handleChangeAddress}
          ></input>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">dong</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="dong"
            type="text"
            value={address.dong}
            onChange={handleChangeAddress}
          ></input>
        </div>
      </div>

      {/* file */}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">파일</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            ref={uploadRef}
            type="file"
            multiple={true}
          ></input>
        </div>
      </div>
      {/* 버튼 */}
      <div className="flex justify-end">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <button
            className="rounded p-4 w-36 bg-blue-500 text-xl text-white"
            type="button"
            onClick={handleClickAdd}
          >
            추가
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddComponent;
