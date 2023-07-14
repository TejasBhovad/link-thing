import IntroVert from "@/components/IntroVert";
import React from "react";
import GitHub from "@/components/logos/GitHub";
import YouTube from "@/components/logos/YouTube";
import LinkedIn from "@/components/logos/LinkedIn";
import IntroHor from "@/components/IntroHor";
import Divider from "@/components/Divider";
import ClickCard from "@/components/ClickCard";
import ClickButton from "@/components/ClickButton";
import Title from "@/components/Title";


// create array of socials with links ,names and logos
const socials = [
  {
    name: "GitHub",
    link: "google.com",
    logo: GitHub,
  },
  {
    name: "YouTube",
    link: "google.com",
    logo: YouTube,
  },
  {
    name: "LinkedIn",
    link: "google.com",
    logo: LinkedIn,
  },
];
// testing list
const data = [
  {
    order: 1,
    type: "about-vert",
    name: "Home",
    Id: "home",
    imageUrl: "/assets/tmp.png",
    socialLinks: socials,
  },
  {
    order: 2,
    type: "about-hor",
    name: "Home",
    Id: "home",
    imageUrl: "/assets/tmp.png",
    socialLinks: socials,
  },
  {
    order: 3,
    type: "click-card",
    heading: "heading",
    desc: "desc",
    logo: LinkedIn,
  },
  {
    order: 4,
    type: "click-button",
    heading: "heading 1",
  },
  {
    order: 4,
    type: "click-button",
    heading: "heading 2",
  },
  {
    order: 5,
    type: "title",
    heading: "heading 2",
    // align: "center",
    align: "start",
  },
  {
    order: 6,
    type: "click-card",
    heading: "heading",
    desc: "desc",
    logo: LinkedIn,
  },
];
function Home() {
  let prev = -1;
  let combinedClickButtons = [];

  data.forEach((item) => {
    if (item.type === "click-button" && prev !== item.order) {
      combinedClickButtons.push(
        <div className="Pane w-full flex h-auto justify-start">
          <ClickButton heading={item.heading} />
        </div>
      );
    } else if (item.type === "click-button" && prev === item.order) {
      const lastButtonIndex = combinedClickButtons.length - 1;
      const childrenArray = Array.isArray(
        combinedClickButtons[lastButtonIndex].props.children
      )
        ? combinedClickButtons[lastButtonIndex].props.children
        : [combinedClickButtons[lastButtonIndex].props.children];

      combinedClickButtons[lastButtonIndex] = (
        <div className="Pane w-full flex h-auto justify-start">
          {childrenArray.concat(<ClickButton heading={item.heading} />)}
        </div>
      );
    }
    prev = item.order;
  });

  return (
    <main className="justify-center flex w-full h-full bg-gray-100">
      <div className=" mt-5 mobile w-3/4 h-100 max-w-3xl">
        {data.map((item) => {
          if (item.type === "about-vert") {
            return (
              <IntroVert
                name={item.name}
                Id={item.Id}
                imageUrl={item.imageUrl}
                socialLinks={item.socialLinks}
              />
            );
          } else if (item.type === "about-hor") {
            return (
              <IntroHor
                name={item.name}
                Id={item.Id}
                imageUrl={item.imageUrl}
                socialLinks={item.socialLinks}
              />
            );
          } else if (item.type === "click-card") {
            return (
              <ClickCard
                heading={item.heading}
                desc={item.desc}
                logo={item.logo}
              />
            );
          } else if (item.type === "title") {
            return <Title heading={item.heading} align={item.align} />;
          } else if (item.type === "divider") {
            return <Divider />;
          } else if (item.type === "click-button") {
            return combinedClickButtons.shift();
          }
        })}
      </div>
    </main>
  );
}

export default Home;
