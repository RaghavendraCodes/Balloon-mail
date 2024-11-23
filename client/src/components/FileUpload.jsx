import React, { useState, useCallback, useEffect } from "react";
import { Upload, X, Check, Copy } from "lucide-react";
import { Client, Storage, Databases, ID, Query } from "appwrite";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import FileUploadedCard from "./FileUploadedCard";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_API_ENDPOINT) // Appwrite endpoint
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Replace with your Appwrite Project ID

const storage = new Storage(client);
const databases = new Databases(client);

const generatePopCode = () => {
  const popCode = uuidv4().replace(/-/g, "").substring(0, 8).toUpperCase();
  return popCode;
};

export default function FileUpload({ onUploadStatusChange }) {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(() => JSON.parse(localStorage.getItem("file")) || null);
  const [popCode, setPopCode] = useState(localStorage.getItem("popCode") || "");
  const [fileIDdelete, setFileIDdelete] = useState(localStorage.getItem("fileID") || "");
  const [uploading, setUploading] = useState(false);

  const API_ENDPOINT = import.meta.env.VITE_APPWRITE_API_ENDPOINT;
  const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
  const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
  const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
  const STORAGE_ID = import.meta.env.VITE_APPWRITE_STORAGE_ID;

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFile = async (selectedFile) => {

    const maxSizeInBytes = 12 * 1024 * 1024; // 12 MB in bytes

    if (selectedFile.size > maxSizeInBytes) {
      toast.error("File size exceeds the 12 MB limit.");
      return;
    }

    setFile(selectedFile);
    try {
      setUploading(true);
      if (onUploadStatusChange) onUploadStatusChange(true);

      const securePopCode = generatePopCode();
      const fileUploadResponse = await storage.createFile(
        STORAGE_ID,
        ID.unique(),
        selectedFile
      );

      const fileId = fileUploadResponse.$id;

      const documentResponse = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          popcode: securePopCode,
          fileID: fileId,
          fileName: selectedFile.name,
          fileSize: selectedFile.size,
          createdAt: new Date().toISOString(),
          downloads: 0,
          deletedFile: false,
        }
      );

      // Save details to localStorage
      localStorage.setItem("file", JSON.stringify(selectedFile));
      localStorage.setItem("popCode", securePopCode);
      localStorage.setItem("fileID", fileId);

      setPopCode(securePopCode);
      setFileIDdelete(fileId);
      if (onUploadStatusChange) onUploadStatusChange(false);
    } catch (error) {
      console.error("Upload failed", error);
      if (onUploadStatusChange) onUploadStatusChange(false);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteFile = async () => {
    if (!fileIDdelete) {
      toast.error("No file available to delete.");
      return;
    }

    try {
      setUploading(true);
      await storage.deleteFile(STORAGE_ID, fileIDdelete);

      const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
        Query.equal("fileID", fileIDdelete),
      ]);

      if (response.documents.length > 0) {
        const documentId = response.documents[0].$id;
        await databases.updateDocument(DATABASE_ID, COLLECTION_ID, documentId, { deletedFile: true });
        toast.success("File successfully deleted.");
      }

      // Clear localStorage and state
      localStorage.removeItem("file");
      localStorage.removeItem("popCode");
      localStorage.removeItem("fileID");
      setFile(null);
      setPopCode("");
      setFileIDdelete("");
    } catch (error) {
      // console.error("Error deleting file:", error);
      toast.error("Failed to delete the file.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {!file ? (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-xl p-8 ${
            dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400"
          }`}
        >
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={(e) => e.target.files && handleFile(e.target.files[0])}
          />
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-4 text-lg font-medium text-gray-700">
              Drop your file here, or click to select
            </p>
            <p className="mt-4 text-sm font-normal text-gray-500">
              max limit of 12 MB is allowed and is recommended for small size and quick share of files. 
            </p>
          </div>
        </div>
      ) : (
        <FileUploadedCard
          file={file}
          popCode={popCode}
          uploading={uploading}
          handleDeleteFile={handleDeleteFile}
        />
      )}
    </div>
  );
}
