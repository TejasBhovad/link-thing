import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import SocialMediaInput from "@/components/SocialMediaInput";
import Link from "@/components/logos/Link";

const Socials = () => {
  const [socialMediaLinks, setSocialMediaLinks] = useState([]);
  const [submitStatus, setSubmitStatus] = useState(false);
  const { data: session } = useSession();

  const handleSubmitStatus = () => {
    setSubmitStatus(true);
  };
  useEffect(() => {
    if (submitStatus) {
      (async () => {
        setTimeout(() => {
          handlePOST();
        }, 2000);

        setSubmitStatus(false);
      })();
    }
  }, [submitStatus]);

  const handlePOST = async () => {
    try {
      console.log("submitting");
      // console.log(socialMediaLinks);
      const response = await fetch("/api/socials/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          creator: session.user.email,
          socialLinks: socialMediaLinks,
        }),
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      // console.log(data);
      // console.log(socialMediaLinks);
      console.log("submitted");
    } catch (error) {
      console.log("submitted");
    }
  };
  const handleFETCH = async () => {
    try {
      if (!session || !session.user || !session.user.email) {
        console.error("User data not available.");
        return;
      }
      const userId = session.user.email; // Use the email as the user ID

      const response = await fetch(`/api/socials/load`);

      const data = await response.json();
      const email = session.user.email;
      // filter out data of current user
      const userData = data.filter((user) => user.creator === email);
      // console.log(data);
      // console.log(userData);
      // console.log(data[0].socialLinks);
      if (userData.length > 0) {
        setSocialMediaLinks(userData[0].socialLinks);
      }
      // setSocialMediaLinks(userData[0].socialLinks);
    } catch (error) {
      console.error("Failed to fetch user's links:", error);
    }
  };
  useEffect(() => {
    if (session) {
      handleFETCH();
    }
  }, [session]);
  return (
    <div className="flex flex-col h-full w-full">
      <div className="h-20 text-3xl font-semibold flex items-center justify-start px-8">
        Social Links
      </div>
      <div className="flex-grow h-full w-full px-8">
        <div className="h-full w-4/5 flex flex-col gap-3">
          <div className="text-md h-10 flex items-center justify-start">
            Add Links
          </div>

          <div className="w-full h-1/2 rounded-md flex bg-white flex flex-col gap-5 form">
            <SocialMediaInput
              submit={submitStatus}
              setSocialMediaLinks={setSocialMediaLinks}
              setSubmitStatus={setSubmitStatus}
              index={0}
              socialMedia={
                socialMediaLinks[0] || { name: "Social", link: "", logo: Link }
              }
            />
            <SocialMediaInput
              submit={submitStatus}
              setSocialMediaLinks={setSocialMediaLinks}
              index={1}
              setSubmitStatus={setSubmitStatus}
              socialMedia={
                socialMediaLinks[1] || { name: "Social", link: "", logo: Link }
              }
            />
            <SocialMediaInput
              submit={submitStatus}
              setSocialMediaLinks={setSocialMediaLinks}
              index={2}
              setSubmitStatus={setSubmitStatus}
              socialMedia={
                socialMediaLinks[2] || { name: "Social", link: "", logo: Link }
              }
            />
            <SocialMediaInput
              submit={submitStatus}
              setSocialMediaLinks={setSocialMediaLinks}
              index={3}
              setSubmitStatus={setSubmitStatus}
              socialMedia={
                socialMediaLinks[3] || { name: "Social", link: "", logo: Link }
              }
            />
          </div>

          {/* Button */}
          <Button className="w-32 text-lg mt-5" onClick={handleSubmitStatus}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Socials;
