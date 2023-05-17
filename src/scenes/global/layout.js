import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import { useState } from "react";

function Layout({ children }) 
{
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <div className="layout">
      <Sidebar isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        {children}
      </main>
    </div>
  );
}

export default Layout;