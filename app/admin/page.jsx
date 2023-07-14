"use client";

import React, { useEffect, useState, useCallback } from "react";
import GitHub from "@/components/logos/GitHub";
import YouTube from "@/components/logos/YouTube";
import LinkedIn from "@/components/logos/LinkedIn";

import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";

const ItemTypes = {
  CARD: "card",
  DIVIDER: "divider",
  TITLE: "title",
  ABOUT: "about",
};

const Admin = () => {
  const [activeToggle, setActiveToggle] = useState("horizontal");
  const [linksArray, setLinksArray] = useState([]);
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
          imageUrl: "/assets/tmp.png",
          socialLinks: socials,
        };
        updatedArray.unshift(newLink);
      } else {
        const newLink = {
          order: 1,
          type: "about-hor",
          name: "Home",
          Id: "home",
          imageUrl: "/assets/tmp.png",
          socialLinks: socials,
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
        heading: "heading title",
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
        <input type="text" {...props} onKeyDown={onKeyDown} />
      )
    );

    if (item.type === ItemTypes.TITLE) {
      return (
        <div
          className="title"
          draggable
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          style={{ opacity }}
        >
          <InputWithEnterKeyUpdate
            type="text"
            name="heading"
            index={index}
            linksArray={linksArray}
            setLinksArray={setLinksArray}
            defaultValue={item.heading}
            attributeName="heading"
          />
        </div>
      );
    } else if (item.type === ItemTypes.CARD) {
      return (
        <div
          className="card"
          draggable
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          style={{ opacity }}
        >
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
        </div>
      );
    } else {
      return (
        <div
          className="about"
          draggable
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          style={{ opacity }}
        >
          {item.type}
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Part */}
      <div className="bg-blue-200 md:w-3/5 flex-shrink-0 overflow-y-auto h-screen snap-center">
        <div className="h-full">
          <div className="h-1/3 bg-black text-white min-h-3200">
            <div className="h-4/5 flex justify-center items-center text-8xl md:text-9xl">
              <span className="font-bold">Link</span>
              <span className="font-extralight">Thing</span>
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
                      activeToggle === "horizontal" ? "vertical" : "horizontal"
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
            <div className="h-5/6 w-full bg-red-100">
              {linksArray.map((item, index) => (
                <DraggableItem key={item.order} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Part */}
      <div className="bg-gray-300 md:w-2/5 flex-1 overflow-y-auto h-screen snap-center">
        <div>
          <h2>Current Links Array:</h2>
          <pre>{JSON.stringify(linksArray, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

export default Admin;
