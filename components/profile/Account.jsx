"use client";
import React, { useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import DragAndDrop from "@/components/DragAndDrop";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { set } from "mongoose";

const Account = () => {
  const [files, setFiles] = useState([]);

  const { toast } = useToast();
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
  const [URL, setURL] = useState("");

  const handleImageUpload = async () => {
    try {
      const data = new FormData();
      data.append("file", uploadedImage);
      data.append("upload_preset", "profile");
      data.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
      // data.append("public_id", userId);
      fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      )
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setURL(data.url);
          setImage(data.url);
          uploadUserData(data.url);
          // console.log("Image:", data.url);
        });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/profile/load`, {
          next: { revalidate: 1 },
        });

        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const data = await response.json();
        setUserData(data);
        // console.log("DATA" + data);
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

  const uploadUserData = async (imageURL) => {
    try {
      console.log("uploading user data");
      // console.log(userId);
      // console.log(username);
      // console.log(imageURL);
      // console.log(email);
      // if image is undefined set it to URL
      if (imageURL === undefined) {
        imageURL = URL;
      }
      const response = await fetch(`/api/profile/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userId,
          name: username,
          image: imageURL,
          email: session.user.email,
        }),
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      // console.log(data);
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };
  const handleSave = () => {
    handleImageUpload();

    // // // create delay of 1 second
    // setTimeout(() => {
    //   console.log("Image:", image);
    //   uploadUserData();
    // }, 1000);

    // console.log(userId);
    // console.log(username);
  };
  const handleInputChange = (event) => {
    const { value, classList } = event.target;
    const alphanumericRegex = /^[a-zA-Z0-9]+$/; // Regular expression for alphanumeric characters

    if (classList.contains("ID")) {
      // Check if ID is already taken
      if (userData.some((user) => user.username === value)) {
        setIsIdAvailable(false);
        toast({
          title: "ID already taken",
          description:
            "Sorry, this ID is already taken. Please try another one.",
        });
        return;
      }
      if (!alphanumericRegex.test(value)) {
        setIsIdAvailable(false);
        toast({
          title: "Invalid ID",
          description:
            "ID should only contain alphanumeric letters (a-z, A-Z, 0-9).",
        });
        return;
      }
      if (value.length < 8 || value.length > 20) {
        setIsIdAvailable(false);
        toast({
          title: "Invalid ID length",
          description: "ID should be between 8 and 20 characters in length.",
        });
        return;
      }
      setIsIdAvailable(true);
      setUserId(value);
    } else if (classList.contains("NAME")) {
      setUsername(value);
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
              <DragAndDrop setImage={setUploadedImage} setFiles={setFiles} />
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
