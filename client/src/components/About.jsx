import React from "react";
import { Heart, Users, Share2 } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex justify-center mt-7">
      <div className="max-w-4xl mx-auto p-8 rounded-lg">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-4">
          About <span className="text-blue-500">Us</span>
        </h1>
        <p className="text-lg text-gray-600 text-center mb-8">
          Welcome to Balloon <span className="text-blue-500 font-semibold">Mail</span>, a simple and secure platform for 
          quick file sharing with your friends and colleagues. No logins, no hassle, just a fast and fun way to share files.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="flex flex-col items-center text-center bg-white p-5 rounded-lg">
            <div className="bg-blue-100 text-blue-500 p-4 rounded-full">
              <Share2 className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mt-4">Instant Sharing</h2>
            <p className="text-gray-600 mt-2">
              Upload files and generate a pop code. Share it instantly without worrying about sign-ups.
            </p>
          </div>
          <div className="flex flex-col items-center text-center bg-white p-5 rounded-lg">
            <div className="bg-green-100 text-green-500 p-4 rounded-full">
              <Users className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mt-4">No Login Needed</h2>
            <p className="text-gray-600 mt-2">
              We keep it simple. No accounts or logins required. Start sharing files right away.
            </p>
          </div>
          <div className="flex flex-col items-center text-center bg-white p-5 rounded-lg">
            <div className="bg-red-100 text-red-500 p-4 rounded-full">
              <Heart className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mt-4">Privacy First</h2>
            <p className="text-gray-600 mt-2">
              Your files are yours. We don’t store and the file is deleted as soon as u refresh the page.
            </p>
          </div>
        </div>

        <div className="text-center mt-8">
          <h1 className="text-2xl font-extrabold text-gray-800 text-center mb-6 mt-12">
            The Inception.
          </h1>
          <p className="text-gray-600 text-lg mx-4">
            During my time in college, my friends and I frequently found ourselves sharing code and files in the labs. However, logging into WhatsApp or email was sometimes inefficient. I realized there had to be a more streamlined solution for instantly sharing files without the need for logging into multiple platforms.
            <br /><br />  
            While brainstorming ideas, I came across "balloon mail," a historical method of sending messages via balloons, and it sparked a connection. The concept of sending messages quickly and effortlessly, without barriers, perfectly aligned with the solution I envisioned. This inspiration led to the creation of Balloon Mail—designed to provide a fast, seamless, and convenient way to share files, removing the unnecessary complexity of traditional methods.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
