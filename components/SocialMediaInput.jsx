import React from "react";
import { useState } from "react";

// import logos
import Link from "@/components/logos/Link";
import GitHub from "@/components/logos/GitHub";
import LinkedIn from "@/components/logos/Linkedin";
import Twitter from "@/components/logos/Twitter";
import Facebook from "@/components/logos/Facebook";
import Instagram from "@/components/logos/Instagram";
import YouTube from "@/components/logos/YouTube";
import Twitch from "@/components/logos/Twitch";
// create a list of social media sites and their logos and their identifier for links
const socialLibrary = [
  {
    name: "GitHub",
    logo: GitHub,
    link: "github.com/",
  },
  {
    name: "Twitter",
    logo: Twitter,
    link: "twitter.com/",
  },
  {
    name: "LinkedIn",
    logo: LinkedIn,

    link: "linkedin.com/",
  },
  {
    name: "Facebook",
    logo: Facebook,
    link: "facebook.com/",
  },
  {
    name: "Instagram",
    logo: Instagram,
    link: "instagram.com/",
  },
  {
    name: "YouTube",
    logo: YouTube,
    link: "youtube.com/",
  },
  {
    name: "Twitch",
    logo: Twitch,
    link: "twitch.tv/",
  },
];
const SocialMediaInput = () => {
  const [socialMedia, setSocialMedia] = useState({
    name: "Social",
    link: "",
    logo: Link,
  });

  const handleLinkChange = (event) => {
    const inputLink = event.target.value.trim();

    // Find the social media object in the library that matches the input link
    const matchedSocialMedia = socialLibrary.find((social) =>
      inputLink.includes(social.link)
    );
    if (matchedSocialMedia) {
      // If a match is found, update the state with the social media name
      setSocialMedia({
        name: matchedSocialMedia.name,
        link: inputLink,
        logo: matchedSocialMedia.logo,
      });
      // console.log(socialMedia);
    } else {
      // If no match is found, reset the state
      setSocialMedia({ name: "Social", link: "", logo: Link });
    }
  };
  return (
    <div>
      <div className="h-16 w-full flex flex-col gap-1 justify-center px-8">
        <span className="superscript font-sm">{socialMedia.name}</span>
        <div className="flex gap-2">
          <div className="logo w-5 h-5">
            <socialMedia.logo alt={socialMedia.name} className="social-logo" />
            {/* replace with dynamic component */}
          </div>

          <input
            type="text"
            placeholder="Link"
            defaultValue={name}
            onChange={handleLinkChange}
            className="focus:outline-none border-b border-gray-400 border-b-2 w-3/4 font-semibold"
          />
        </div>
      </div>
    </div>
  );
};

export default SocialMediaInput;
