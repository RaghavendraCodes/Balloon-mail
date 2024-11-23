import React, { useState } from 'react';
import { Send, Download } from 'lucide-react';
import FileUpload from './FileUpload';
import PopBalloon from './PopBalloon';

const HomeMain = () => {
  const [activeTab, setActiveTab] = useState("send");
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const handleUploadStatusChange = (status) => {
    setIsFileUploaded(status);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Description */}
      <div className="text-center mb-12 flex flex-col">
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Share files securely with Pop Codes. Upload, share the code, and let others download instantly.
          Best use for quick share of files.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-full p-1 shadow-sm">
          <button
            onClick={() => setActiveTab("send")}
            disabled={isFileUploaded} // Disable tab switching if a file is uploaded
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200
              ${activeTab === "send"
                ? "bg-blue-500 text-white"
                : "text-gray-600 hover:text-gray-900"} 
              ${isFileUploaded ? "cursor-not-allowed opacity-50" : ""}`}
          >
            <span className="flex items-center space-x-2">
              <Send className="h-4 w-4" />
              <span>Send File</span>
            </span>
          </button>
          <button
            onClick={() => setActiveTab("receive")}
            disabled={isFileUploaded} // Disable tab switching if a file is uploaded
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200
              ${activeTab === "receive"
                ? "bg-blue-500 text-white"
                : "text-gray-600 hover:text-gray-900"} 
              ${isFileUploaded ? "cursor-not-allowed opacity-50" : ""}`}
          >
            <span className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Receive File</span>
            </span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex justify-center">
        {activeTab === "send" ? (
          <FileUpload onUploadStatusChange={handleUploadStatusChange} />
        ) : (
          <PopBalloon />
        )}
      </div>

      {/* Features Section */}
      <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Send className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Quick Share</h3>
            <p className="text-gray-600">
              Upload and get a short Pop Code instantly. No account required.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Download className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Easy Access</h3>
            <p className="text-gray-600">
              Enter the Pop Code to download files instantly. Simple and fast.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Send className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Secure Transfer</h3>
            <p className="text-gray-600">
              Files are securely stored and deleted as soon as the sender clicks on delete button.
            </p>
          </div>
        </div>
    </div>
  );
};

export default HomeMain;
