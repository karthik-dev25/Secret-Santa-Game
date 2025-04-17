import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import { xlsxFileType } from "../utils/constants";

const FileInput = ({ file, setFileInput, setFileError }) => {
  const [fileName, setFileName] = useState();
  const onDrop = useCallback((inputFile) => {
    if (inputFile[0].type !== xlsxFileType) {
      setFileError("Invalid File Type");
      return;
    }
    setFileName(inputFile[0].name);
    setFileError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        defval: "",
      });

      setFileInput(jsonData);
    };

    reader.onerror = (err) => {
      console.error("File read error", err);
    };

    reader.readAsArrayBuffer(inputFile[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dotted p-16 cursor-pointer"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag and drop some files here, or click to select files</p>
      )}

      <p>{fileName}</p>
    </div>
  );
};

export default FileInput;
