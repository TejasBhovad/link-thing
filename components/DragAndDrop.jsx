import { useState } from "react";
import Add from "@/components/logos/Add";

const DragAndDrop = () => {
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
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image (maximum size: 1MB).");
    }
  };

  const handleImageUpload = () => {
    // Here, you can do something with the image data, like send it to the server
    // For demonstration purposes, we'll just log the image data URL in the console.
    console.log("Uploaded Image Data URL:", thumbnail);
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
