import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from '@mui/icons-material/Logout';

import { useNavigate } from 'react-router-dom';
import { deleteUser, getUser } from "../../utils/user";
import { frontendUrls } from "../../utils/urls";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const navigate = useNavigate();

  const logout = () => 
  {
    deleteUser();
    navigate(frontendUrls.login, { replace: true });
  }

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* Space */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      />

      {/* ICONS */}
      <Box display="flex">
        
        <IconButton onClick={()=>logout()}>
          <LogoutIcon  />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
