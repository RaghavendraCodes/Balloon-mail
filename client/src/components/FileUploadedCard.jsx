import React from "react";
import { X, Check, Copy } from "lucide-react";
import toast from "react-hot-toast";

const FileUploadedCard = ({ file, popCode, uploading, handleDeleteFile }) => {
  const handleCopyCode = () => {
    navigator.clipboard.writeText(popCode);
    toast.success("Pop Code copied to clipboard!");
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
            {uploading ? (
              <div className="loader border-4 border-t-blue-500 rounded-full h-6 w-6"></div>
            ) : (
              <Check className="h-6 w-6 text-green-600" />
            )}
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{file.name}</h3>
            <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        </div>
        <button
          onClick={handleDeleteFile}
          className="text-white hover:text-black bg-red-500 px-2 py-1 rounded-lg"
          disabled={uploading}
        >
          Delete File
        </button>
      </div>

      <div>
        <p className="font-bold text-xl text-gray-700">Pop Code</p>
        <div className="flex items-center justify-between mt-4 border-[1.75px] px-2 py-3 rounded-md">
          <span className="text-xl text-blue-600 font-bold">{popCode}</span>
          <button onClick={handleCopyCode} className="text-gray-500 hover:text-gray-700">
            <Copy className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="py-4 text-sm text-gray-500">
        <p>click on delete file button to delete the file completely.</p>
      </div>
    </div>
  );
};

export default FileUploadedCard;
