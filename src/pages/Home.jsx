import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Bottombar from "../components/Bottomside";

const Home = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Sidebar: Visible on tablet and larger screens */}
      <div
        className={`${
          windowWidth >= 1024 ? "block" : "hidden"
        } lg:block sticky top-[80px] h-screen`}
      >
        <Sidebar />
      </div>

      {/* Main content area (Outlet) */}
      <div
        className="flex-1 p-3 gap-9 flex-wrap justify-start pb-20"
        style={{
          marginTop: windowWidth >= 426 ? "0" : "0", // No margin top for tablet and larger, including large screens
        }}
      >
        <Outlet />
      </div>

      {/* Bottom Bar: Visible only on mobile screens below 426px */}
      {windowWidth < 426 && (
        <div className="fixed bg-zinc-900 z-50 p-2 bottom-0 w-full">
          <Bottombar />
        </div>
      )}
    </div>
  );
};

export default Home;
