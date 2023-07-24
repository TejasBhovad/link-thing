import React from "react";
import { Toggle } from "@/components/ui/toggle";

const Menu = ({ activeToggle, setActiveToggle }) => {
  // Helper function to handle toggle click
  const handleToggleClick = (toggleText) => {
    setActiveToggle(toggleText);
  };

  return (
    <ul className="w-full h-full flex flex-col ml-5 gap-0.5">
      <li className="w-full justify-start items-center">
        <Toggle
          className={`w-3/4 text-md justify-start data-[state=on]:bg-gray-200 hover:bg-gray-200 data-[state=on]:font-semibold`}
          onClick={() => handleToggleClick("Profile")}
          aria-pressed={activeToggle === "Profile"}
          data-state={activeToggle === "Profile" ? "on" : "off"}
        >
          Profile
        </Toggle>
      </li>
      <li className="w-full justify-start items-center">
        <Toggle
          className={`w-3/4 text-md justify-start data-[state=on]:bg-gray-200 hover:bg-gray-200 data-[state=on]:font-semibold`}
          onClick={() => handleToggleClick("Socials")}
          aria-pressed={activeToggle === "Socials"}
          data-state={activeToggle === "Socials" ? "on" : "off"}
        >
          Socials
        </Toggle>
      </li>
      <li className="w-full justify-start items-center">
        <Toggle
          className={`w-3/4 text-md justify-start data-[state=on]:bg-red-100 hover:bg-red-100 data-[state=on]:font-semibold`}
          onClick={() => handleToggleClick("Danger Zone")}
          aria-pressed={activeToggle === "Danger Zone"}
          data-state={activeToggle === "Danger Zone" ? "on" : "off"}
        >
          Danger Zone
        </Toggle>
      </li>
    </ul>
  );
};

export default Menu;
