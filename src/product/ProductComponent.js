import React, { useState } from "react";
import axios from "axios";

// 백엔드의 상품 DTO (ProductDTO)에 대응하는 컴포넌트입니다.
function ProductComponent() {
  // 텍스트 데이터 상태 관리
  const [product, setProduct] = useState({
    pname: "",
    price: 0,
    pdesc: "",
  });

  // 파일 데이터 상태 관리 (files: MultipartFile 리스트에 해당)
  const [files, setFiles] = useState([]);

  // (선택 사항) 업로드된 파일 이름을 보여줄 필요가 있다면 별도 상태 관리 가능

  // 텍스트 입력값 변경 핸들러
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  // 파일 선택 변경 핸들러
  const handleFileChange = (e) => {
    // e.target.files는 FileList 객체입니다. 이를 Array.from()을 사용해 배열로 변환합니다.
    setFiles(Array.from(e.target.files));
  };

  // 폼 제출 핸들러 (서버 통신)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. FormData 객체 생성 (파일과 텍스트 데이터를 함께 담는 컨테이너)
    const formData = new FormData();

    // 2. 텍스트 데이터 (JSON 대신 개별 필드로 추가)
    // 백엔드에서 @ModelAttribute로 DTO를 받거나, @RequestPart로 DTO를 받을 때 사용
    formData.append("pname", product.pname);
    formData.append("price", product.price);
    formData.append("pdesc", product.pdesc);

    // 3. 파일 데이터 추가 (가장 중요)
    // 백엔드의 List<MultipartFile> files 필드명과 동일하게 'files'로 키를 지정합니다.
    files.forEach((file) => {
      // 세 번째 인자로 파일 이름을 지정할 수도 있습니다 (선택 사항).
      formData.append("files", file);
    });

    try {
      const response = await axios.post(
        "/api/products", // 백엔드 API 엔드포인트
        formData,
        {
          headers: {
            // 파일을 포함한 폼 데이터를 보낼 때는 Content-Type을 명시적으로 지정할 필요는 없지만,
            // FormData 사용 시 브라우저가 자동으로 'multipart/form-data'로 설정해 줍니다.
            // 하지만 명시적으로 추가하는 경우도 있습니다. (필요에 따라 주석 처리 가능)
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("업로드 성공:", response.data);
      alert("상품이 성공적으로 등록되었습니다.");

      // 성공 후 상태 초기화 (옵션)
      setProduct({ pname: "", price: 0, pdesc: "" });
      setFiles([]);
    } catch (error) {
      console.error("업로드 실패:", error);
      alert("상품 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>상품 등록</h2>

      {/* 텍스트 입력 필드 */}
      <div>
        <label>상품명:</label>
        <input
          type="text"
          name="pname"
          value={product.pname}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>가격:</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>설명:</label>
        <textarea
          name="pdesc"
          value={product.pdesc}
          onChange={handleChange}
        ></textarea>
      </div>

      {/* 파일 업로드 필드 (가장 중요) */}
      <div>
        <label>이미지 파일:</label>
        <input
          type="file"
          name="files" // 백엔드 DTO의 List<MultipartFile> files 필드명과 일치시키는 것이 좋습니다.
          multiple // 여러 파일 선택 가능하도록 설정
          accept="image/*" // 이미지 파일만 선택 가능하도록 제한 (옵션)
          onChange={handleFileChange}
        />
      </div>

      {/* 선택된 파일 개수 표시 */}
      {files.length > 0 && <p>선택된 파일: {files.length}개</p>}

      <button type="submit">등록</button>
    </form>
  );
}

export default ProductComponent;
