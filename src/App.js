import { useState, useEffect } from "react";
import { Routes, Route, HashRouter, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import RawData from "./scenes/rawdata";
import Login from "./scenes/login";
import Admin from "./scenes/admin";
import Users from "./scenes/users";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

import { frontendUrls } from "./utils/urls";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();

  const shouldShowTopbarAndSidebar = location.pathname !== "/login";

  useEffect(() => {
    const updateSidebarHeight = () => {
      const contentHeight = document.getElementById("app-content").offsetHeight;
      const sidebar = document.getElementById("sidebar");
      if (sidebar) {
        sidebar.style.height = `${contentHeight}px`;
      }
    };

    updateSidebarHeight();
    window.addEventListener("resize", updateSidebarHeight);
    return () => {
      window.removeEventListener("resize", updateSidebarHeight);
    };
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app" style={{ display: "flex", height: "100vh" }}>
          {shouldShowTopbarAndSidebar && <Sidebar isSidebar={isSidebar} />}
          <main className="content" id="app-content" style={{ flex: 1, overflow: "auto" }}>
            {shouldShowTopbarAndSidebar && <Topbar setIsSidebar={setIsSidebar} />}
            <Routes>
              <Route  path={frontendUrls.dashboard} element={<Dashboard />} />
              <Route  path={frontendUrls.rawData} element={<RawData />} />
              <Route  path={frontendUrls.login} element={<Login />} />
              <Route  path={frontendUrls.adminWindturbines} element={<Admin />} />
              <Route  path={frontendUrls.adminUsers} element={<Users />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
