import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Bottomside from "./components/Bottomside";
import Navbar2 from "./components/Navbar2";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar2 />

      <div className="flex flex-1">
        {/* Sidebar hidden for mobile/tablet and shown for desktop */}
        <div className="hidden md:block mt-16">
          <Sidebar />
        </div>

        {/* Main content, Overflow scroll on the right */}
        <div className="flex-1 ml-0 md:ml-24 mt-16 overflow-y-auto">
          <Outlet />
        </div>
      </div>

      {/* Bottom Bar hidden for laptops/desktops and shown for mobile/tablet */}
      <div className="block md:hidden">
        <Bottomside />
      </div>
    </div>
  );
}

export { App };
