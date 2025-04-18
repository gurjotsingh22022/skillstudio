"use client";

import { useEffect } from "react";

const TopScroller = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
    console.log("Scrolling..")
  }, []);

  return <div></div>;
};

export default TopScroller;