import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import ArticleIcon from '@mui/icons-material/Article';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import DashboardIcon from '@mui/icons-material/Dashboard';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import CycloneIcon from '@mui/icons-material/Cyclone';

import { getUser } from "../../utils/user";
import { frontendUrls } from "../../utils/urls";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => 
{
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const user = getUser();

  const getAdminItems = () =>
  {
    if(user!=null && user["role"] == "ADMIN")
      return (<>
        <Item
          title="Windturbines"
          to={frontendUrls.adminWindturbines}
          icon={<CycloneIcon />}
          selected={selected}
          setSelected={setSelected}
        />

        <Item
          title="Users"
          to={frontendUrls.adminUsers}
          icon={<SupervisorAccountIcon />}
          selected={selected}
          setSelected={setSelected}
        />
      </>)
  }


  return (
    <Box

      sx={{
        height:"100%",
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`https://cdn-icons-png.flaticon.com/512/149/149071.png`} //assests!!!!
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {user["firstName"] + " " + user["lastName"]}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                {user["role"]}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to={frontendUrls.dashboard}
              icon={<DashboardIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Raw Data"
              to={frontendUrls.rawData}
              icon={<ArticleIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {getAdminItems()}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
