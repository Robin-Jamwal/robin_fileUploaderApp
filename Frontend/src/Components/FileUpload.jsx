import React, { useState ,useRef} from "react";
import axios from "axios";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState(null);
  const fileInputRef = useRef(null); 

  const upload = () => {
    if (!file) return alert("Please select a file first!");

    const formData = new FormData();
    
    formData.append("file", file);
    axios.post("http://localhost:3000/upload", formData)
    .then(res => {
      setInfo(res.data); 
      setFile(null);     
      fileInputRef.current.value = null; 
    })
    .catch(() => alert("Upload failed!"));
};
  return (
    <div className="flex flex-col w-full items-center justify-center h-screen bg-gray-200">
      <label htmlFor="file_input" className="text-2xl mb-4 font-semibold">
        Upload File
      </label>

      <input
        id="file_input"
        type="file"
        ref={fileInputRef}
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4 px-3 py-2 w-[40%]  rounded-md bg-white"
      />
      {/* here i created preview part  which u asked so i have taken help for this form ai */}
       {file && file.type.startsWith("image/") && (
        <img
          src={URL.createObjectURL(file)}
          alt="Preview"
          className="mb-4 w-100 h-48 object-cover"
        />
      )}

      <button
        onClick={upload}
        className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
      >
        Upload
      </button>

      {info && (
        <div className="mt-4 p-3 bg-white rounded shadow">
          <p>Uploaded Successfully</p>
          <p>Last file details...</p>
          <p><b>Name:</b> {info.fileName}</p>
          <p><b>Size:</b> {(info.size / 1024).toFixed(2)} KB</p>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
