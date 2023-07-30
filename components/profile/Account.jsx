"use client";
import React, { useState } from "react";
import DragAndDrop from "@/components/DragAndDrop";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { set } from "mongoose";

const Account = () => {
  // create a session qnd get email
  const { data: session } = useSession();
  const email = session?.user?.email;
  const name = session?.user?.name;

  // create a UseState hook for the username and userId
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  // create state fir image
  const [image, setImage] = useState(session?.user?.image);
  const [uploadedImage, setUploadedImage] = useState(session?.user?.image);
  // create array ussate for storing all user data
  const [userData, setUserData] = useState([]);
  const [isIdAvailable, setIsIdAvailable] = useState(true);

  const handleImageUpload = async () => {
    try {
      // Send the image data to the server
      const response = await fetch("/api/uploadthing?slug=images", {
        method: "POST",
        body: uploadedImage,
        headers: {
          "Content-Type": "image/jpeg", // Adjust the content type as needed
        },
      });

      if (response.ok) {
        console.log("Image uploaded successfully!");
        // Handle any further actions after successful upload
      } else {
        console.error("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/profile/load`);

        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const data = await response.json();
        setUserData(data);
        // filter out data of current user
        const userData = data.filter((user) => user.email === email);

        // console.log(userData);
        setUsername(userData[0].name); // Replace 'username' with the actual property name for the username
        setUserId(userData[0].username); // Replace 'userId' with the actual property name for the userId
        setImage(userData[0].image);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUserData();
  }, [email]);

  const uploadUserData = async () => {
    try {
      console.log("uploading user data");
      console.log(userId);
      console.log(username);
      console.log(image);
      console.log(email);

      const response = await fetch(`/api/profile/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userId,
          name: username,
          image: image,
          email: session.user.email,
        }),
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };
  const handleSave = () => {
    // uploadUserData();
    console.log(userId);
    console.log(username);
  };
  const handleInputChange = (event) => {
    const { value, classList } = event.target;

    if (classList.contains("ID")) {
      // check if id is already taken
      if (userData.some((user) => user.username === value)) {
        setIsIdAvailable(false);
        return;
      }
      setIsIdAvailable(true);
      setUserId(value);
      // console.log(userId);
    } else if (classList.contains("NAME")) {
      setUsername(value);
      // console.log(username);
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="h-20 text-3xl font-semibold flex items-center justify-start px-8">
        Account Settings
      </div>
      <div className="flex-grow h-full w-full px-8">
        <div className="h-full w-4/5 flex flex-col gap-3">
          <div className="text-md h-10 flex items-center justify-start">
            Personal Information
          </div>
          <div className="w-full h-32 rounded-md flex bg-white">
            <div className="w-1/5 h-full flex justify-center items-center pic">
              <div className="aspect-square bg-gray-300 h-24 rounded-md">
                {/* Profile Image of user */}
                <Image src={image} width={100} height={100} alt="profile" />
              </div>
            </div>
            <div className="w-4/5 h-full  flex flex-col py-4">
              <span className="text-xl font-semibold">{username}</span>
              <span>@{userId}</span>
            </div>
          </div>

          <div className="w-full h-1/2 rounded-md flex bg-white flex flex-col gap-5 form">
            <div className="h-16 w-full flex flex-col gap-0 justify-center px-8">
              <span className="superscript font-sm">Name</span>
              <input
                type="text"
                placeholder="Full Name"
                defaultValue={username}
                onChange={handleInputChange}
                className={`NAME focus:outline-none border-b border-gray-400 border-b-2 w-3/4 font-semibold`}
              />
            </div>
            <div className="h-16 w-full flex flex-col gap-0 justify-center px-8">
              <span className="superscript font-sm">ID</span>
              <input
                type="text"
                placeholder="User ID"
                defaultValue={userId}
                onChange={handleInputChange}
                className={`${
                  isIdAvailable ? "border-gray-400" : "border-red-500"
                } ID focus:outline-none border-b border-gray-400 border-b-2 w-3/4 font-semibold`}
              />
            </div>
            <div className="px-8">
              <span className="superscript font-sm">Profile Picture</span>
              <DragAndDrop setImage={setUploadedImage} />
            </div>
          </div>
          {/* Button */}
          <Button className="w-32 text-lg mt-5" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Account;
