"use client";
import { useState } from "react";
import Add from "@/components/logos/Add";

const DragAndDrop = ({ setImage, setFiles }) => {
  const [thumbnail, setThumbnail] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (file && file.type.startsWith("image/") && file.size <= 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumbnail(e.target.result);
        setImage(e.target.result); // Set the image data in
        setFiles(file);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image (maximum size: 1MB).");
    }
  };

  return (
    <div
      className="drop-zone border-2 border-dashed border-gray-400 p-4 text-center cursor-pointer justify-center items-center flex flex-col"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      {thumbnail ? (
        <div className="max-w-100 max-h-100 m-2 flex flex-col justify-center items-center gap-5">
          <img src={thumbnail} alt="Uploaded Thumbnail" className="w-32 h-32" />
          <label className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
            Browse
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileInput}
            />
          </label>
          {/* <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              console.log("Files: ", res);
              alert("Upload Completed");
            }}
            onUploadError={(error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          /> */}
        </div>
      ) : (
        <>
          <p>Drag and drop an image here or</p>
          <Add className="logo" />
          <label className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
            Browse
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileInput}
            />
          </label>
        </>
      )}
    </div>
  );
};

export default DragAndDrop;
