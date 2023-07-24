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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/profile/load`);

        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const data = await response.json();
        // console.log(data);
        setUsername(name); // Replace 'username' with the actual property name for the username
        setUserId(data.username); // Replace 'userId' with the actual property name for the userId
        setImage(data.image);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUserData();
  }, [email]);
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
              <span className="text-xl">{username}</span>
              <span>@{userId}</span>
            </div>
          </div>

          <div className="w-full h-1/2 rounded-md flex bg-white flex flex-col gap-5 form">
            <div className="h-16 w-full flex flex-col gap-0 justify-center px-8">
              <span className="superscript font-sm">Name</span>
              <input
                type="text"
                placeholder="Full Name"
                defaultValue={name}
                className="focus:outline-none border-b border-gray-400 border-b-2 w-3/4 font-semibold"
              />
            </div>
            <div className="h-16 w-full flex flex-col gap-0 justify-center px-8">
              <span className="superscript font-sm">ID</span>
              <input
                type="text"
                placeholder="User ID"
                defaultValue={userId}
                className="focus:outline-none border-b border-gray-400 border-b-2 w-3/4 font-semibold"
              />
            </div>
            <div className="px-8">
              <span className="superscript font-sm">Profile Picture</span>
              <DragAndDrop />
            </div>
          </div>
          {/* Button */}
          <Button className="w-32 text-lg mt-5">Save</Button>
        </div>
      </div>
    </div>
  );
};

export default Account;
