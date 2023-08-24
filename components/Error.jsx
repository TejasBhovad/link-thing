import React from "react";

const Error = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center">
      <div className="bg-black p-8 rounded-lg shadow-md text-center text-white">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-gray-300 text-lg mb-6">
          The requested user could not be found.
        </p>
        <a
          href="/"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-xl transition duration-300"
        >
          Go to Home
        </a>
      </div>
    </div>
  );
};

export default Error;
