import React, { useState } from "react";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Balloon from "./Balloon";

function BalloonAnimation({ popCode, startAnimation, onValidateCode }) {
  const [code, setCode] = useState("");
  const [isFloating, setIsFloating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!code.trim()) {
      alert("Please enter a Pop Code!");
      return;
    }

    onValidateCode(code); // Validate the code
  };

  React.useEffect(() => {
    if (startAnimation) {
      setIsFloating(true);

      // Reset animation and show success message after it ends
      setTimeout(() => {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setIsFloating(false);
          setCode(""); // Reset the form
        }, 3000); // Success message duration
      }, 5000); // Balloon animation duration
    }
  }, [startAnimation]);

  return (
    <div className="max-w-md mx-auto">
      <div className="box-canvas">
        <Balloon color="red" delay={0} shouldFloat={isFloating} />
        <Balloon color="yellow" delay={0.2} shouldFloat={isFloating} />
        <Balloon color="green" delay={0.4} shouldFloat={isFloating} />
        <Balloon color="blue" delay={0.6} shouldFloat={isFloating} />
        <Balloon color="orange" delay={0.8} shouldFloat={isFloating} />
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg"
          >
            Balloons popped successfully!
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="relative mt-6">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="Enter Pop Code"
          className="w-full px-4 py-3 text-lg rounded-full border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-200 pr-12 placeholder-gray-400"
          maxLength={6}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
        >
          <Search className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}

export default BalloonAnimation;
