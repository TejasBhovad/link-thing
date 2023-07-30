"use client";
// import logos
import Link from "@/components/logos/Link";
import GitHub from "@/components/logos/GitHub";
import LinkedIn from "@/components/logos/Linkedin";
import Twitter from "@/components/logos/Twitter";
import Facebook from "@/components/logos/Facebook";
import Instagram from "@/components/logos/Instagram";
import YouTube from "@/components/logos/YouTube";
import Twitch from "@/components/logos/Twitch";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import IntroHor from "@/components/IntroHor";
import IntroVert from "@/components/IntroVert";
import Divider from "@/components/Divider";
import ClickCard from "@/components/ClickCard";
import ClickButton from "@/components/ClickButton";
import Title from "@/components/Title";
import { set } from "mongoose";

const ViewBox = ({ params }) => {
  const searchParams = useSearchParams();
  const [linksArray, setLinksArray] = useState([]);
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  let userId, Name, Email, ProfilePicture;
  const ItemTypes = {
    CARD: "card",
    DIVIDER: "divider",
    TITLE: "title",
    ABOUT: "about",
  };
  const [userData, setUserData] = useState([]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`/api/profile/load`);

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      setUserData(data);
      //   console.log(data);
      // filter dat od user
      const foundUser = data.find((user) => user.username === params.id);
      console.log(foundUser);
      userId = foundUser.email; // Use the email as the user ID
      // Name = foundUser.name;
      Email = foundUser.email;
      setEmail(Email);
      console.log(Email);
      ProfilePicture = foundUser.image;
      console.log(ProfilePicture);
      // map through data
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  useEffect(() => {
    fetchUserLinks();
  }, [userData]);

  useEffect(() => {
    const foundUser = userData.find((user) => user.username === params.id);
    console.log(!!foundUser);
  }, [userData]);

  const fetchUserLinks = async () => {
    try {
      const response = await fetch(`/api/links/load`);

      const data = await response.json();
      const userLinks = data.filter((link) => link.creator === userId);
      console.log(userLinks[0].links);


      setLinksArray(formatUserLinks(userLinks));

      // find the about array
    } catch (error) {
      console.error("Failed to fetch user's links:", error);
    }
  };
  const formatUserLinks = (userLinks) => {
    const formattedLinks = [];
    userLinks[0].links.forEach((link) => {
      if (link.type === "about-vert" || link.type === "about-hor") {
        formattedLinks.push({
          order: link.order,
          type: link.type,
          name: Name,
          Id: params.id,
          imageUrl: ProfilePicture,
          email: email,
        });
      } else if (link.type === "card") {
        formattedLinks.push({
          order: link.order,
          type: ItemTypes.CARD,
          heading: link.heading,
          desc: link.desc,
          link: link.link,
          logo: GitHub,
        });
      } else if (link.type === "title") {
        formattedLinks.push({
          order: link.order,
          type: ItemTypes.TITLE,
          heading: link.heading,
          align: link.align,
        });
      } else if (link.type === "divider") {
        formattedLinks.push({
          order: link.order,
          type: ItemTypes.DIVIDER,
        });
      }
    });
    return formattedLinks;
  };
  return (
    <div className="bg-gray-300 h-full w-full">
      {/* if !user found show error else show params.id */}
      {!userData.find((user) => user.username === params.id) ? (
        <div>
          <h1>404</h1>
          <h2>Sorry, we couldn't find that user.</h2>
        </div>
      ) : (
        <div className="display bg-gray-300 md:w-full flex-1 overflow-y-auto h-full w-full snap-center flex flex-col justify-center items-center flex-shrink-0">
          <main className="justify-center flex w-full h-full bg-gray-100">
            <div className=" mt-5 mobile w-3/4 h-100 max-w-3xl">
              {linksArray.map((item) => {
                if (item.type === "about-vert") {
                  return (
                    <IntroVert
                      key={item.order}
                      name={item.name}
                      Id={item.Id}
                      imageUrl={item.imageUrl}
                      socialLinks={item.socialLinks}
                      email={email}
                    />
                  );
                } else if (item.type === "about-hor") {
                  return (
                    <IntroHor
                      key={item.order}
                      name={item.name}
                      Id={item.Id}
                      imageUrl={item.imageUrl}
                      socialLinks={item.socialLinks}
                      email={email}
                    />
                  );
                } else if (item.type === "card") {
                  return (
                    <ClickCard
                      key={item.order}
                      heading={item.heading}
                      desc={item.desc}
                      logo={item.logo}
                      link={item.link}
                    />
                  );
                } else if (item.type === "title") {
                  return (
                    <Title
                      heading={item.heading}
                      align={item.align}
                      key={item.order}
                    />
                  );
                } else if (item.type === "divider") {
                  return <Divider key={item.order} />;
                } else if (item.type === "click-button") {
                  return combinedClickButtons.shift();
                }
              })}
            </div>
          </main>
          {/* <div>
    <h2>Current Links Array:</h2>
    <pre>{JSON.stringify(linksArray, null, 2)}</pre>
  </div> */}
        </div>
      )}
    </div>
  );
};

export default ViewBox;
