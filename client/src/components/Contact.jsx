import React, { useState } from "react";
import { Lightbulb, Bug, ThumbsUp } from "lucide-react"; // Import icons

const Contact = () => {
  const [story, setStory] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (story.trim()) {
      const email = "raghavendrar312004@gmail.com"; // Replace with your email
      const subject = encodeURIComponent("My Story with PopCodes");
      const body = encodeURIComponent(`Here's my story:\n\n${story}`);
      const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to${email}&su=${subject}&body=${body}`;

      // Redirect to the user's email client
      window.location.href = mailtoLink;

      // Optionally set submitted state
      setSubmitted(true);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Contact <span className="text-blue-500">Us</span>
        </h1>
        <p className="text-gray-600 mt-2">
          We'd love to hear from you. Feel free to reach out anytime!
        </p>
      </div>

      {/* Contact Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {/* Feedback Card */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center mb-4">
            <Lightbulb className="h-8 w-8 text-yellow-500 mr-3" />
            <h2 className="text-lg font-semibold text-gray-800">Share Your Thoughts</h2>
          </div>
          <p className="text-gray-600 text-sm">
            Got an idea or some feedback? We’d love to hear your thoughts on how we can make PopCodes even better.
          </p>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=raghavendrar312004@gmail.com&su=Feedback%20for%20PopCodes&body=I%20would%20like%20to%20share%20my%20thoughts..."
            className="block mt-4 text-blue-500 hover:text-blue-600 font-medium text-sm transition-colors"
          >
            Share Feedback
          </a>
        </div>

        {/* Bug Report Card */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center mb-4">
            <Bug className="h-8 w-8 text-red-500 mr-3" />
            <h2 className="text-lg font-semibold text-gray-800">Report a Bug</h2>
          </div>
          <p className="text-gray-600 text-sm">
            If you’ve encountered any bugs or glitches, let us know! Your reports help us improve the experience.
          </p>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=raghavendrar312004@gmail.com&su=Bug%20Report%20for%20PopCodes&body=I%20encountered%20a%20bug..."
            className="block mt-4 text-blue-500 hover:text-blue-600 font-medium text-sm transition-colors"
          >
            Report Bug
          </a>
        </div>

        {/* Feature Request Card */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center mb-4">
            <ThumbsUp className="h-8 w-8 text-green-500 mr-3" />
            <h2 className="text-lg font-semibold text-gray-800">Request a Feature</h2>
          </div>
          <p className="text-gray-600 text-sm">
            Have an idea for a cool new feature? Share it with us, and we’ll consider it for future updates!
          </p>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=raghavendrar312004@gmail.com&su=Feature%20Request%20for%20PopCodes&body=I%20would%20like%20to%20request%20a%20feature..."
            className="block mt-4 text-blue-500 hover:text-blue-600 font-medium text-sm transition-colors"
          >
            Request Feature
          </a>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white shadow-lg p-8 rounded-xl max-w-3xl mx-auto mt-16">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Share Your PopCodes Experience
        </h2>
        <p className="text-center text-gray-600 mb-4">
          We'd love to hear how PopCodes made your file-sharing easier! Share your story below.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <textarea
              className="w-full h-32 p-4 border rounded-lg shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tell us how PopCodes helped you with your file-sharing!"
              value={story}
              onChange={(e) => setStory(e.target.value)}
              maxLength={500}
              required
            />
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-all"
              >
                Submit
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-lg text-gray-700 mb-4">Thanks for sharing your story with us!</p>
            <p className="text-sm text-gray-500">We'll feature your experience soon. Stay tuned!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
