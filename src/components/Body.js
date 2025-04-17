import { useState } from "react";
import FileInput from "./FileInput";
import {
  generateJsonToXLSX,
  generateSecretSantaList,
} from "../utils/constants";

const Body = () => {
  const [fileData, setFileData] = useState([]);
  const [prevYearData, setPrevYearData] = useState([]);
  const [IsPreInput, setIsPreInput] = useState(false);
  const [error, setError] = useState(null);

  const handleSecretSanta = () => {
    let output = generateSecretSantaList(fileData, prevYearData);
    generateJsonToXLSX(output);
  };

  return (
    <div className="w-6/12 m-auto text-center">
      <div className="font-bold text-2xl my-4 text-left">Secret Santa Game</div>
      <FileInput
        setFileInput={(e) => setFileData(e)}
        setFileError={(e) => setError(e)}
      />
      {error && <p className="text-red-600">{error}</p>}
      <div className="text-center my-4">
        <button
          disabled={!fileData.length}
          onClick={() => setIsPreInput(!IsPreInput)}
          className="bg-amber-500 shadow-lg p-2 rounded-lg cursor-pointer"
        >
          Add Previous Year Data
        </button>
      </div>
      {IsPreInput && (
        <FileInput
          setFileInput={(e) => setPrevYearData(e)}
          setFileError={(e) => setError(e)}
        />
      )}
      {error && <p className="text-red-600">{error}</p>}
      <div className="text-center my-4">
        <button
          onClick={handleSecretSanta}
          className="bg-amber-500 shadow-lg p-2 rounded-lg cursor-pointer"
        >
          Generate Secret Santa List
        </button>
      </div>
    </div>
  );
};

export default Body;
