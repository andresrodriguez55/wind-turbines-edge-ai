import React from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbarContainer, GridToolbarExport} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";

import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import "leaflet/dist/leaflet.css"
import L from "leaflet";

const Map = (windTurbines, {setSelectedWindTurbine}) =>
{
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/3616/3616597.png",
    shadowUrl: "",
    iconSize: [60, 60]
  });

  return(
    <MapContainer 
        center={[39.1667, 35.6667 ]}
        zoom={6}
        style={{width:"100%", height:"100%"}}
    >
        <TileLayer url="https://api.maptiler.com/maps/toner-v2/256/{z}/{x}/{y}.png?key=1QPy4iqeKBev2H36pTp0"
            attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'/>
        {
          windTurbines.map((windturbine)=>
            {
                return(
                    <Marker position={[windturbine["latitude"], windturbine["longitude"]]} 
                    eventHandlers={{
                        click: (e) => {
                          setSelectedWindTurbine(windturbine)
                        },
                    }}>
                        <Popup>
                            Latitude: {windturbine["latitude"]}<br /> Longitude: {windturbine["longitude"]}
                        </Popup>
                    </Marker>
                )
            })
        }
      </MapContainer>
  );
}

const RawData = () => 
{
  const [selectedWindTurbine, setSelectedWindTurbine] = React.useState(1); 
  const [windTurbines, setWindTurbines] = React.useState([]);
  const [selectedWindTurbineHistories, setSelectedWindTurbineHistories] = React.useState([]);
  
  async function fetchWindTurbineHistories(id)
  {
      let urlToFetch = "http://localhost:8080/api/histories/windturbine/" + id +"?findTop18=false";
      const response = await fetch(urlToFetch).then(async(response)=>
      {
          if(response.ok)
          {
              const jsonArray = await response.json();
              setSelectedWindTurbineHistories(jsonArray);
          }
          else
              console.log('Database connection error...');
      }).catch(e => console.log(e));
  };
  
  async function fetchWindTurbines()
  {
      let urlToFetch = "https://server-windturbines.onrender.com/"+"api/windturbines";
      const response = await fetch(urlToFetch).then(async(response)=>
      {
          if(response.ok)
          {
              const jsonArray = await response.json();
              setWindTurbines([...windTurbines, ...jsonArray]);
          }
          else
            console.log('Database connection error...');
      }).catch(e => console.log(e));
  };

  const isInitialMount = React.useRef(true);

  React.useEffect(()=>
  {
    if (isInitialMount.current) 
    {
      isInitialMount.current = false;
    }
    fetchWindTurbines();
  }, []); //Only once time

  React.useEffect(()=>
  {
    if (isInitialMount.current) 
      return;

    if(windTurbines.length > 0)
      setSelectedWindTurbine(windTurbines[0]);
  }, [windTurbines]);

  React.useEffect(()=>
  {
    if (isInitialMount.current || selectedWindTurbine == null) 
      return;

    fetchWindTurbineHistories(selectedWindTurbine["id"]);
  }, [selectedWindTurbine]); 

  function CustomToolbar() {
    return (
      <GridToolbarContainer >
        <GridToolbarExport 
          printOptions={{ disableToolbarButton: true }} 
          csvOptions={{ 
            allColumns: true, 
            fileName: "ID-"+selectedWindTurbine['id']+"-Longitude-"+selectedWindTurbine['longitude']+"-Latitude-"+selectedWindTurbine['latitude']}} 
          style={{ color: 'white' }} />
      </GridToolbarContainer>
    );
  }

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
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

  if(windTurbines == null)
    return(<div></div>);

  return (
    <Box m="20px">
      <Header title="RAW DATA OF WIND TURBINES" subtitle={"Wind Turbine ID: "+selectedWindTurbine["id"]+" Selected"}  />
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

          {Map(windTurbines, {setSelectedWindTurbine})}
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
