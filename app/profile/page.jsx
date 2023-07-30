"use client";
import Nav from "@/components/Nav";
import Menu from "@/components/Menu";
import { useState, useEffect } from "react";
import Account from "@/components/profile/Account";
import Socials from "@/components/profile/Socials";
import DangerZone from "@/components/profile/DangerZone";

const Profile = () => {
  const [activeToggle, setActiveToggle] = useState("Profile");
  // display toggle state
  useEffect(() => {
    // console.log(activeToggle);
  }, [activeToggle]);
  return (
    <section className="w-full h-full flex flex-col">
      <Nav />
      <div className="flex-grow bg-white flex">
        {/* Your content goes here */}
        <div className="menu h-full w-1/4 bg-white">
          <Menu activeToggle={activeToggle} setActiveToggle={setActiveToggle} />
        </div>
        <div className="options h-full w-3/4 bg-gray-200">
          {/* based on active toggle show different pages */}
          {activeToggle === "Profile" && <Account />}
          {activeToggle === "Socials" && <Socials />}
          {activeToggle === "Danger Zone" && <DangerZone />}
        </div>
      </div>
    </section>
  );
};

export default Profile;
