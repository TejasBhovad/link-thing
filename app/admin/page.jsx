"use client";
import Link from "next/link";
import React, { useEffect, useState, useCallback, use } from "react";
import GitHub from "@/components/logos/GitHub";
import YouTube from "@/components/logos/YouTube";
import LinkedIn from "@/components/logos/LinkedIn";
import Bin from "@/components/logos/Bin";
import Drag from "@/components/logos/Drag";
import IntroHor from "@/components/IntroHor";
import IntroVert from "@/components/IntroVert";
import Divider from "@/components/Divider";
import ClickCard from "@/components/ClickCard";
import ClickButton from "@/components/ClickButton";
import Title from "@/components/Title";
import Nav from "@/components/Nav";
import { getSession } from "next-auth/react";

import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { set } from "mongoose";

const ItemTypes = {
  CARD: "card",
  DIVIDER: "divider",
  TITLE: "title",
  ABOUT: "about",
};

const Admin = () => {
  const [activeToggle, setActiveToggle] = useState("horizontal");
  const [userData, setUserData] = useState([]);
  const [linksArray, setLinksArray] = useState([]);
  const { data: session } = useSession();
  const profile_picture = session?.user?.image;
  const email = session?.user?.email;
  const name = session?.user?.name;
  const [userID, setUserID] = useState("");
  const [EMAIL, setEMAIL] = useState(session?.user?.email);
  const [image, setImage] = useState(session?.user?.image);
  const [Name, setName] = useState(session?.user?.name);
  // Define a state to keep track of the submission status and cool down
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fetchUserData = async () => {
    try {
      const response = await fetch(`/api/profile/load`,{ next: { revalidate: 1 } });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      setUserData(data);
      const foundUser = data.find((user) => user.email === EMAIL);
      if (foundUser) {
        // console.log(foundUser.username);
        setImage(foundUser.image);
        setName(foundUser.name);
        setUserID(foundUser.username);
      } else {
        // Handle the case when user data is not found
        // console.error("User data not found.");
      }
    } catch (error) {
      // console.error("Failed to fetch user data", error);
    }
  };
  const fetchUserLinks = async () => {
    try {
      if (!session || !session.user || !session.user.email) {
        console.error("User data not available.");

        return;
      }
      const userId = session.user.email; // Use the email as the user ID

      const response = await fetch(`/api/links/load`,{ next: { revalidate: 1 } });

      const data = await response.json();
      const userLinks = data.filter((link) => link.creator === userId);
      // console.log(userLinks[0].links);

      // create a function that will correctly format userlinks to linkArray
      const formatUserLinks = (userLinks) => {
        const formattedLinks = [];
        userLinks[0].links.forEach((link) => {
          if (link.type === "about-vert" || link.type === "about-hor") {
            formattedLinks.push({
              order: link.order,
              type: link.type,
              name: Name,
              Id: userID,
              imageUrl: link.image,
              email: EMAIL,
            });
          } else if (link.type === "card") {
            formattedLinks.push({
              order: link.order,
              type: ItemTypes.CARD,
              heading: link.heading,
              desc: link.desc,
              link: link.link,
              image: link.image,
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
      setLinksArray(formatUserLinks(userLinks));

      // find the about array
    } catch (error) {
      console.error("Failed to fetch user's links:", error);
    }
  };
  useEffect(() => {
    getSession().then((session) => {
      fetchUserData();
      setUserID(session?.user?.name);
      setEMAIL(session?.user?.email);
      // setImage(session?.user?.image);

      fetchUserLinks();
    });
  }, [session]);
  // on reload fetch use Session to update the userID and EMAIL
  useEffect(() => {
    getSession().then((session) => {
      setUserID(session?.user?.name);
      setEMAIL(session?.user?.email);
      // setImage(session?.user?.image);
    });
  }, []);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      // console.log("submitting");

      const response = await fetch("/api/links/save",{ next: { revalidate: 1 } }, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          creator: session.user.email,
          links: linksArray,
        }),
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      // console.log(data);
      setIsSubmitting(false);
      // console.log(linksArray);
    } catch (error) {
      setIsSubmitting(false);
      console.log("submitted");
    }
  };

  useEffect(() => {
    setLinksArray((prevLinksArray) => {
      const updatedArray = prevLinksArray.filter(
        (item) => item.type !== "about-vert" && item.type !== "about-hor"
      );

      if (activeToggle === "vertical") {
        const newLink = {
          order: 1,
          type: "about-vert",
          name: "Home",
          Id: "home",
          imageUrl: profile_picture,
          email: EMAIL,
        };
        updatedArray.unshift(newLink);
      } else {
        const newLink = {
          order: 1,
          type: "about-hor",
          name: "Name",
          Id: "ID",
          imageUrl: profile_picture,
          email: EMAIL,
        };
        updatedArray.unshift(newLink);
      }

      return updatedArray;
    });
  }, [activeToggle]);

  const handleAddCard = useCallback(() => {
    setLinksArray((prevLinksArray) => {
      const newCard = {
        order: prevLinksArray.length + 1,
        type: ItemTypes.CARD,
        heading: "",
        desc: "",
        link: "",
        logo: GitHub,
        image:
          "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
      };
      return [...prevLinksArray, newCard];
    });
  }, []);

  const handleAddDivider = useCallback(() => {
    setLinksArray((prevLinksArray) => {
      const newDivider = {
        order: prevLinksArray.length + 1,
        type: ItemTypes.DIVIDER,
      };
      return [...prevLinksArray, newDivider];
    });
  }, []);

  const handleAddTitle = useCallback(() => {
    setLinksArray((prevLinksArray) => {
      const newTitle = {
        order: prevLinksArray.length + 1,
        type: ItemTypes.TITLE,
        heading: "",
        align: "center",
      };
      return [...prevLinksArray, newTitle];
    });
  }, []);

  const moveElement = useCallback((dragIndex, hoverIndex) => {
    setLinksArray((prevLinksArray) => {
      const updatedArray = [...prevLinksArray];
      const dragElement = updatedArray[dragIndex];
      updatedArray.splice(dragIndex, 1);
      updatedArray.splice(hoverIndex, 0, dragElement);
      return updatedArray.map((item, index) => ({
        ...item,
        order: index + 1,
      }));
    });
  }, []);

  const DraggableItem = ({ item, index }) => {
    const [{ isDragging }, drag] = useState(() => {
      return {
        isDragging: false,
      };
    });

    const handleDragStart = useCallback(
      (e) => {
        e.stopPropagation();
        drag({ isDragging: true });
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", JSON.stringify(item));
      },
      [item]
    );

    const handleDragEnd = useCallback((e) => {
      e.stopPropagation();
      drag({ isDragging: false });
    }, []);

    const handleDragOver = useCallback((e) => {
      e.preventDefault();
    }, []);

    const handleDrop = useCallback(
      (e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData("text/plain");
        const droppedItem = JSON.parse(data);
        const droppedIndex = linksArray.findIndex(
          (el) => el.order === droppedItem.order
        );
        const hoverIndex = index;

        if (droppedIndex === hoverIndex) {
          return;
        }

        moveElement(droppedIndex, hoverIndex);
      },
      [linksArray, moveElement]
    );

    const opacity = isDragging ? 0.5 : 1;

    const withEnterKeyUpdate = (WrappedComponent) => {
      return ({
        index,
        linksArray,
        setLinksArray,
        attributeName,
        ...props
      }) => {
        const handleKeyDown = useCallback(
          (e) => {
            if (e.key === "Enter") {
              const updatedLinksArray = [...linksArray];
              updatedLinksArray[index] = {
                ...updatedLinksArray[index],
                [attributeName]: e.target.value,
              };
              setLinksArray(updatedLinksArray);
            }
          },
          [index, linksArray, setLinksArray, attributeName]
        );

        return (
          <WrappedComponent
            {...props}
            onKeyDown={handleKeyDown}
            defaultValue={linksArray[index][attributeName]}
          />
        );
      };
    };
    const InputWithEnterKeyUpdate = withEnterKeyUpdate(
      ({ onKeyDown, ...props }) => (
        <input
          type="text"
          {...props}
          onKeyDown={onKeyDown}
          className="border-b-2 border-gray-200 focus:border-gray-300 focus:outline-none ease-in-out transition"
        />
      )
    );
    const handleDeleteElement = useCallback((index) => {
      setLinksArray((prevLinksArray) => {
        const updatedArray = [...prevLinksArray];
        updatedArray.splice(index, 1);
        return updatedArray.map((item, index) => ({
          ...item,
          order: index + 1,
        }));
      });
    }, []);
    const handleDeleteClick = useCallback(() => {
      handleDeleteElement(index);
    }, [handleDeleteElement, index]);
    if (item.type === ItemTypes.TITLE) {
      const handleAlignmentChange = (e) => {
        const updatedArray = [...linksArray];
        updatedArray[index].align = e.target.value;
        setLinksArray(updatedArray);
      };

      return (
        <div
          className="h-32 bg-gray-100 w-5/6 rounded-lg flex flex-shrink-0 drop-shadow-md"
          draggable
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          style={{ opacity }}
        >
          <div className="dragarea w-12 h-full bg-gray-800 rounded-lg rounded-r-none flex justify-center items-center">
            <div className="w-8">
              <Drag />
            </div>
          </div>
          <div className="h-full w-full rounded-lg rounded-l-none flex">
            <div className="w-11/12 h-full text-md flex flex-col justify-start ml-4 mt-2 gap-2">
              <span className="text-lg font-bold">Title</span>
              <InputWithEnterKeyUpdate
                type="text"
                name="heading"
                defaultValue={item.heading}
                placeholder="Heading"
                index={index}
                linksArray={linksArray}
                setLinksArray={setLinksArray}
                attributeName="heading"
              />
              <select
                className="text-md w-32 text-gray-700 bg-gray-200 rounded-sm focus:outline-none p-1.5 border-solid border-2 font-medium border-gray-300"
                value={item.align}
                onChange={handleAlignmentChange}
              >
                <option value="left">Align Left</option>
                <option value="center">Align Center</option>
              </select>
            </div>
            <div className="w-20 h-full flex justify-center items-center">
              <div className="w-7 cursor-pointer" onClick={handleDeleteClick}>
                <Bin />
              </div>
            </div>
          </div>
        </div>
      );
    } else if (item.type === ItemTypes.CARD) {
      return (
        <div
          className="h-52 bg-gray-100 w-5/6 rounded-lg flex flex-shrink-0 drop-shadow-md"
          draggable
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          style={{ opacity }}
        >
          <div className="dragarea w-12 h-full bg-gray-800 rounded-lg rounded-r-none flex justify-center items-center">
            <div className="w-8">
              <Drag />
            </div>
          </div>
          <div className=" h-full w-full rounded-lg rounded-l-none flex">
            <div className="w-11/12 h-full text-md flex flex-col justify-start ml-4 mt-2 gap-3">
              <span className="text-lg font-bold">Link</span>

              <InputWithEnterKeyUpdate
                type="text"
                name="heading"
                defaultValue={item.heading}
                placeholder="Heading"
                index={index}
                linksArray={linksArray}
                setLinksArray={setLinksArray}
                attributeName="heading"
              />
              <InputWithEnterKeyUpdate
                type="text"
                name="desc"
                defaultValue={item.desc}
                placeholder="Description"
                index={index}
                linksArray={linksArray}
                setLinksArray={setLinksArray}
                attributeName="desc"
              />
              <InputWithEnterKeyUpdate
                type="text"
                name="link"
                defaultValue={item.link}
                placeholder="URL"
                index={index}
                linksArray={linksArray}
                setLinksArray={setLinksArray}
                attributeName="link"
              />
              {/* added image url */}
              <InputWithEnterKeyUpdate
                type="text"
                name="link"
                defaultValue={item.image}
                placeholder="Image URL"
                index={index}
                linksArray={linksArray}
                setLinksArray={setLinksArray}
                attributeName="image"
              />
            </div>
            <div className="w-20 h-full flex justify-center items-center">
              <div className="w-7 cursor-pointer" onClick={handleDeleteClick}>
                <Bin />
              </div>
            </div>
          </div>
        </div>
      );
    } else if (item.type === "about-vert" || item.type === "about-hor") {
      return (
        <div
          className="h-32 bg-gray-100 w-5/6 rounded-lg flex flex-shrink-0 drop-shadow-md"
          draggable
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          style={{ opacity }}
        >
          <div className="dragarea w-12 h-full bg-gray-800 rounded-lg rounded-r-none flex justify-center items-center">
            <div className="w-8">
              <Drag />
            </div>
          </div>
          <div className=" h-full w-full rounded-lg rounded-l-none flex">
            <div className="w-11/12 h-full text-lg font-bold flex flex-col justify-start ml-4 mt-4">
              About Section
              <span className="text-gray-400 font-normal text-md">
                {activeToggle}
              </span>
            </div>
            <div className="w-20 h-full flex justify-center items-center">
              <div className="w-7 cursor-pointer" onClick={handleDeleteClick}>
                <Bin />
              </div>
            </div>
          </div>
        </div>
      );
    } else if (item.type === ItemTypes.DIVIDER) {
      return (
        <div
          className="h-20 bg-gray-100 w-5/6 rounded-lg flex flex-shrink-0 drop-shadow-md"
          draggable
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          style={{ opacity }}
        >
          <div className="dragarea w-12 h-full bg-gray-800 rounded-lg rounded-r-none flex justify-center items-center">
            <div className="w-8">
              <Drag />
            </div>
          </div>
          <div className=" h-full w-full rounded-lg rounded-l-none flex">
            <div className="w-11/12 h-full text-lg font-bold flex flex-col justify-center ml-4">
              Divider
            </div>
            <div className="w-20 h-full flex justify-center items-center">
              <div
                className="w-7 cursor-pointer hover:text-red-500"
                onClick={handleDeleteClick}
              >
                <Bin />
              </div>
            </div>
          </div>
        </div>
      );
    }
  };
  let prev = -1;
  let combinedClickButtons = [];

  linksArray.forEach((item) => {
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
    <section className="h-full w-full ">
      {/* <Nav /> */}
      <div className="flex flex-col md:flex-row h-full w-full">
        {/* Left Part */}
        <div className="left-part bg-blue-200 md:w-3/5 flex-shrink-0 overflow-y-auto h-full snap-center overflow-hidden">
          <div className="h-full">
            <div className="h-1/3 bg-black text-white min-h-3200 _black flex-shrink-0">
              <div className="h-4/5 flex  items-center text-8xl md:text-9xl flex-col">
                <Nav className="h-4/5 flex justify-center items-center text-8xl md:text-9xl" />
              </div>
              <div className="h-1/5 bg-gradient-to-t from-gray-800 via-black to-black flex">
                <div className="w-1/5 h-full flex justify-center items-center text-md md:text-xl ml-7">
                  about-align
                </div>
                <div className="w-4/5 h-full flex justify-center items-center md:justify-start ">
                  <Toggle
                    pressed={activeToggle === "vertical"}
                    onPressedChange={() =>
                      setActiveToggle(
                        activeToggle === "vertical" ? "horizontal" : "vertical"
                      )
                    }
                    variant="outline"
                    aria-label="Toggle bold vertical"
                    className={`ml-5 ${
                      activeToggle === "vertical" ? "active" : ""
                    }`}
                  >
                    <span className="text-md md:text-xl">Vertical</span>
                  </Toggle>
                  <Toggle
                    pressed={activeToggle === "horizontal"}
                    onPressedChange={() =>
                      setActiveToggle(
                        activeToggle === "horizontal"
                          ? "vertical"
                          : "horizontal"
                      )
                    }
                    variant="outline"
                    aria-label="Toggle bold horizontal"
                    className={`ml-5 ${
                      activeToggle === "horizontal" ? "active" : ""
                    }`}
                  >
                    <span className="text-md md:text-xl">Horizontal</span>
                  </Toggle>
                  <Button
                    className="ml-20 bg-green-600"
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    // onClick={fetchUserLinks}
                  >
                    <span className="text-md md:text-xl">Save</span>
                  </Button>
                  {/* <Button
                    className="ml-20 bg-green-600"
                    // disabled={isSubmitting}
                    // onClick={handleSubmit}
                    onClick={fetchUserLinks}
                  >
                    <span className="text-md md:text-xl">Fetch</span>
                  </Button> */}
                </div>
              </div>
            </div>
            <div className="h-2/3 bg-white">
              <div className="w-full h-20 flex justify-start items-center">
                <Button
                  variant="outline"
                  className=" ml-7 text-md semibold"
                  onClick={handleAddCard}
                >
                  Add Links
                </Button>
                <Button
                  variant="outline"
                  className=" ml-7 text-md semibold"
                  onClick={handleAddTitle}
                >
                  Add Title
                </Button>
                <Button
                  variant="outline"
                  className=" ml-7 text-md semibold"
                  onClick={handleAddDivider}
                >
                  Add Divider
                </Button>
              </div>
              <div className=" ml-7 h-5/6 w-full flex flex-col items-start gap-4 overflow-auto">
                {linksArray.map((item, index) => (
                  <DraggableItem key={item.order} item={item} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Part */}
        <div className="display bg-gray-300 md:w-2/5 flex-1 overflow-y-auto h-full w-full snap-center flex flex-col justify-center items-center flex-shrink-0">
          <div className="preview text-lg font-bold p-4">
            Preview:{" "}
            <Link href={`/${userID}`}>
              <span className="font-md text-semibold text-blue-600">
                /{userID}
              </span>
            </Link>
          </div>
          <main className="justify-center flex w-full h-full bg-gray-100">
            <div className=" mt-5 mobile w-3/4 h-100 max-w-3xl">
              {linksArray.map((item) => {
                if (item.type === "about-vert") {
                  return (
                    <IntroVert
                      key={item.order}
                      name={Name}
                      Id={userID}
                      imageUrl={image}
                      email={EMAIL}
                    />
                  );
                } else if (item.type === "about-hor") {
                  return (
                    <IntroHor
                      key={item.order}
                      name={Name}
                      Id={userID}
                      imageUrl={image}
                      email={EMAIL}
                    />
                  );
                } else if (item.type === "card") {
                  return (
                    <ClickCard
                      key={item.order}
                      heading={item.heading}
                      desc={item.desc}
                      logo={item.image}
                      image={item.image}
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
      </div>
    </section>
  );
};

export default Admin;
