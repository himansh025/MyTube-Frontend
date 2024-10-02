import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Bottomside from "./components/Bottomside";
import Navbar2 from "./components/Navbar2";

function App() {
  return (
    <div className="flex flex-col h-screen">
    
      <Navbar2 />

      <div className="flex flex-1">
        {/* Sidebar for large screens */}
{/* <Sidebar/> */}

        {/* Main content area */}
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>

      {/* Bottom navigation for mobile */}
      <div className="md:hidden">
        <Bottomside />
      </div>
    </div>
  );
}

export default App;
