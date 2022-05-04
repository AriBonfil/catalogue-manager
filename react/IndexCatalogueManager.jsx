import React, { useState } from 'react'
import * as XLSX from "xlsx";
import { sendData } from "./components/actions"
const index = () => {

    const [data, setData] = useState()
    const [dataImages, setDataImages] = useState()

    const readfileData = (e) => {
    e.preventDefault();
    if (e.target.files) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(worksheet);
            setData(json)

        };
        reader.readAsArrayBuffer(e.target.files[0]);
    }
}
const readfileImages = (e) => {
  e.preventDefault();
  if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet);
          setDataImages(json)

      };
      reader.readAsArrayBuffer(e.target.files[0]);
  }
}
  console.log("asddsada", data, dataImages);
  return (
    <div>
<form>
    <label htmlFor="upload">Upload File Data</label>
    <input
        type="file"
        name="fileData"
        id="fileData"
        onChange={readfileData}
    />
      <label htmlFor="upload">Upload File Images</label>
    <input
        type="file"
        name="fileImages"
        id="fileImages"
        onChange={readfileImages}
    />
</form>
{data && dataImages &&
<button onClick={() => sendData(data, dataImages)}>
  Cargar
</button>
}
</div>
)
}
export default index
