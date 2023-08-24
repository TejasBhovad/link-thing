import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
// import logos
import Link from "@/components/logos/Link";
import GitHub from "@/components/logos/GitHub";
import LinkedIn from "@/components/logos/LinkedIn";
import Twitter from "@/components/logos/Twitter";
import Facebook from "@/components/logos/Facebook";
import Instagram from "@/components/logos/Instagram";
import YouTube from "@/components/logos/YouTube";
import Twitch from "@/components/logos/Twitch";

// Assuming you have the logos imported properly and stored in variables like GitHub, YouTube, etc.
// You can also import the logo images directly from the file path if they are in the project.

const Links = ({ email }) => {
  const { data: session } = useSession();
  const [socialLinks, setSocialLinks] = useState([]);
  const [Email, setEmail] = useState(email);
  useEffect(() => {
    handleFETCH();
    // console.log(Email);
  }, []);

  const handleFETCH = async () => {
    try {
      const response = await fetch(`/api/socials/load`,{ next: { revalidate: 1 } });
      const data = await response.json();

      const userData = data.filter((user) => user.creator === Email);
      if (userData.length > 0) {
        // filter out links with no links
        userData[0].socialLinks = userData[0].socialLinks.filter(
          (link) => link.link
        );
        const formattedLinks = formatSocialLinks(userData[0].socialLinks);
        setSocialLinks(formattedLinks);
        // console.log("User's links:", formattedLinks);
      }
    } catch (error) {
      // console.error("Failed to fetch user's links:", error);
    }
  };

  const formatSocialLinks = (socialLinks) => {
    return socialLinks.map((link, index) => {
      // Check if the link starts with "http://" or "https://"
      if (
        !link.link.startsWith("http://") &&
        !link.link.startsWith("https://")
      ) {
        link.link = "https://" + link.link;
      }
      return {
        order: index + 1,
        name: link.name,
        link: link.link,
        logo: getLogoFromName(link.name),
      };
    });
  };

  const getLogoFromName = (name) => {
    // Add your logic to return the corresponding logo based on the name.
    // For example:
    switch (name.toLowerCase()) {
      case "github":
        return GitHub;
      case "youtube":
        return YouTube;
      case "twitter":
        return Twitter;
      case "facebook":
        return Facebook;
      case "instagram":
        return Instagram;
      case "linkedin":
        return LinkedIn;
      case "twitch":
        return Twitch;
      case "link":
        return Link;

      // Add more cases for other social media platforms.
      default:
        return Link; // Return null if no matching logo found.
    }
  };

  return (
    <div className="social-contain flex-row justify-center items-center w-auto">
      {socialLinks.map((social, index) => (
        <div
          className="logo w-8 h-8 md:h-10 md:w-10 inline-block px-1"
          key={index}
        >
          <a
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            key={social.name}
            className="social-link"
          >
            <social.logo alt={social.name} className="social-logo" />
          </a>
        </div>
      ))}
    </div>
  );
};

export default Links;
