import React, { useState } from "react";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Balloon from "./Balloon";
import "./PopBalloon.css"; // Import your styles
import balloonMailImage from "../assets/balloon-mail-removebg-preview.png";
import { Client, Databases, Storage, Query } from "appwrite";
import { toast } from "react-hot-toast";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_API_ENDPOINT) // Replace with your Appwrite endpoint
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Replace with your Appwrite Project ID

const databases = new Databases(client);
const storage = new Storage(client);

function BalloonAnimation() {
  const [code, setCode] = useState("");
  const [isFloating, setIsFloating] = useState(false);
  const [showBalloons, setShowBalloons] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const API_ENDPOINT = import.meta.env.VITE_APPWRITE_API_ENDPOINT;
  const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
  const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
  const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
  const STORAGE_ID = import.meta.env.VITE_APPWRITE_STORAGE_ID;

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!code.trim()) {
      toast.error("Please enter a Pop Code!", { position: "top-center" });
      return;
    }
  
    try {
      const response = await databases.listDocuments(
        DATABASE_ID, // Replace with your Appwrite Database ID
        COLLECTION_ID, // Replace with your Appwrite Collection ID
        [Query.equal("popcode", code)] // Query to match the popCode
      );
  
      if (response.documents.length === 0) {
        toast.error("Invalid Pop Code. Please try again.", { position: "top-center" });
        return;
      }
  
      const document = response.documents[0];
  
      // Check if the file is marked as deleted
      if (document.deletedFile === true) {
        toast.error("File doesn't exist or has been deleted. Please ask the sender to send it again.", {
          position: "top-center",
        });
        return;
      }

      const fileID = document.fileID;
  
      setShowBalloons(true);
      setIsFloating(true);
  
      setTimeout(async () => {
        try {
          const result = await storage.getFileDownload(
            STORAGE_ID, // Replace with your Appwrite Bucket ID
            fileID
          );
  
          const downloadUrl = result; // Ensure result contains a valid URL
          if (!downloadUrl) {
            throw new Error("Failed to retrieve download URL");
          }
  
          window.open(downloadUrl, "_blank");
  
          // toast.success("File downloaded successfully!", { position: "top-center" });

          setShowSuccess(true);
  
          setTimeout(() => {
            setShowSuccess(false);
            setIsFloating(false);
            setShowBalloons(false);
            setCode(""); // Reset code input
          }, 2000);
        } catch (fileError) {
          console.error("Error fetching file:", fileError);
          toast.error("Failed to fetch the file. Please try again.", { position: "top-center" });
          setIsFloating(false);
          setShowBalloons(false);
        }
      }, 2000); // Wait for balloon animation to finish
    } catch (error) {
      console.error("Error fetching document:", error);
      toast.error("Failed to fetch the document. Please try again.", { position: "top-center" });
    }
  };  
  
  return (
    <div className="h-22 p-6">
      <div className="max-w-md mx-auto">
        {/* Balloon animation */}
        {showBalloons && (
          <div className="box-canvas relative">
            <Balloon color="red" delay={0} shouldFloat={isFloating} />
            <Balloon color="yellow" delay={0.2} shouldFloat={isFloating} />
            <Balloon color="green" delay={0.4} shouldFloat={isFloating} />
            <Balloon color="blue" delay={0.6} shouldFloat={isFloating} />
            <Balloon color="orange" delay={0.8} shouldFloat={isFloating} />
          </div>
        )}

        {/* Success message */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 flex flex-col items-center justify-center bg-blue-500 text-white text-center p-8 shadow-lg"
            >
              <motion.img
                src={balloonMailImage}
                alt="Balloon Mail"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="w-40 h-40 mb-4"
              />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="font-cool text-4xl"
              >
                File downloaded successfully!
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pop Code form */}
        <form onSubmit={handleSubmit} className="relative mb-6">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="Enter Pop Code"
            className="w-full px-4 py-3 text-lg rounded-full border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-200 pr-12 placeholder-gray-400"
            maxLength={8}
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          >
            <Search className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default BalloonAnimation;
