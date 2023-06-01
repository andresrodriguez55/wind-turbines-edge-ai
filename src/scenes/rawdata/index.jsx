import React from 'react';
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbarContainer, GridToolbarExport} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { getUser } from '../../utils/user';

import Map from '../../components/map';

import { backendUrls } from '../../utils/urls';
import API from '../../utils/api';

const RawData = () => 
{
  const [selectedWindTurbine, setSelectedWindTurbine] = React.useState(null); 
  const [windTurbines, setWindTurbines] = React.useState([]);
  const [selectedWindTurbineHistories, setSelectedWindTurbineHistories] = React.useState([]);

  const APIheaders = 
  {
    'Content-Type': "application/json",
    'Accept': "*/*",
    'Authorization': getUser().token
  };
  
  const fetchWindTurbineHistories = async (id) => 
  {
    const urlToFetch = backendUrls.getWindTurbineHistories(id);
    try 
    {
      const jsonArray = await API.get(urlToFetch, APIheaders);
      setSelectedWindTurbineHistories(jsonArray);
    } 
    catch (error) 
    {
      console.log('Database connection error...');
    }
  };
  
  const fetchWindTurbines = async () => 
  {
    const urlToFetch =  backendUrls.getWindTurbines;
    try 
    {
      const jsonArray = await API.get(urlToFetch, APIheaders);
      setWindTurbines(jsonArray);
    } 
    catch (error) 
    {
      console.log('Database connection error...');
    }
  };

  React.useEffect(()=>
  {
    fetchWindTurbines();
  }, []); //Only once time

  React.useEffect(()=>
  {
    if(windTurbines.length > 0)
      setSelectedWindTurbine(windTurbines[0]);
  }, [windTurbines]);

  React.useEffect(()=>
  {
    if (selectedWindTurbine !== null) 
    {
      fetchWindTurbineHistories(selectedWindTurbine?.id);
    }
  }, [selectedWindTurbine]); 

  function CustomToolbar() 
  {
    return (
      <GridToolbarContainer >
        <GridToolbarExport 
          printOptions={{ disableToolbarButton: true }} 
          csvOptions={{ 
            allColumns: true, 
            fileName: "ID-"+selectedWindTurbine?.id+"-Longitude-"+selectedWindTurbine?.longitude+"-Latitude-"+selectedWindTurbine?.latitude}} 
          style={{ color: 'white' }} />
      </GridToolbarContainer>
    );
  }

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = 
  [
    { field: "generatedAt", headerName: "Time", minWidth: 120},
    {
      field: "wecMinRotation",
      headerName: "Min Rotation",
      resizable: true
    },
    {
      field: "sys1Inverter3CabinetTemp",
      headerName: "Sys 1 Inverter 3 Cabinet Temperature",
    },
    {
      field: "sys1Inverter6CabinetTemp",
      headerName: "Sys 1 Inverter 6 Cabinet Temperature",
    },
    {
      field: "sys2Inverter3CabinetTemp",
      headerName: "Sys 2 Inverter 3 Cabinet Temperature",
    },
    {
      field: "sys2Inverter4CabinetTemp",
      headerName: "Sys 2 Inverter 4 Cabinet Temperature",
    },
    {
      field: "sys2Inverter7CabinetTemp",
      headerName: "Sys 2 Inverter 7 Cabinet Temperature",
    },
    {
      field: "pitchCabinetBladeBTemp",
      headerName: "Pitch Cabinet Blade B Temperature",
    },
    {
      field: "nacelleAmbientTemp1",
      headerName: "Nacelle Ambient Temperature",
    },
    {
      field: "yawInverterCabinetTemp",
      headerName: "Yaw Inverter Cabinet Temperature",
    },
    {
      field: "controlCabinetTemp",
      headerName: "Control Cabinet Temperature",
    },
    {
      field: "state",
      headerName: "Fault",
      width: 50
    },
  ];

  return (
    <Box m="20px">
      <Header title="RAW DATA OF WIND TURBINES" subtitle={"Wind Turbine ID: "+selectedWindTurbine?.id+" Selected"}  />
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="200px"
        gap="20px"
      >
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Map windTurbines={windTurbines} setSelectedWindTurbine={setSelectedWindTurbine} />
        </Box></Box>

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid disableColumnResize={false} rows={selectedWindTurbineHistories} columns={columns} components={{
          Toolbar: CustomToolbar, 
        }} />
        <Box sx={{height: "20px"}}/>
      </Box>
    </Box>
  );
};

export default RawData;