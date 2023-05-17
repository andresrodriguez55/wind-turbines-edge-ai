import React from 'react';
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import ProgressCircle from "../../components/ProgressCircle";
import LineChartColumn from "../../components/LineChartColumn";
import DataInfoColumn from '../../components/DataInfoColumn';

import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import "leaflet/dist/leaflet.css"
import L from "leaflet";

const Map = (windTurbines, {setSelectedWindTurbineId}) =>
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
          windTurbines.map((windturbine, index)=>
            {
                return(
                    <Marker position={[windturbine["latitude"], windturbine["longitude"]]} 
                    eventHandlers={{
                        click: (e) => {
                          setSelectedWindTurbineId(windturbine["id"])
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

const Dashboard = () => 
{
  const [selectedWindTurbineId, setSelectedWindTurbineId] = React.useState(null); 
  const [windTurbines, setWindTurbines] = React.useState([]);
  const [selectedWindTurbineHistories, setSelectedWindTurbineHistories] = React.useState([]);

  async function fetchWindTurbineHistories(id)
  {
      let urlToFetch = "https://server-windturbines.onrender.com/"+"api/histories/windturbine/" + id +"?findTop18=true";
      const response = await fetch(urlToFetch).then(async(response)=>
      {
          if(response.ok)
          {
              const jsonArray = await response.json();
              console.log(selectedWindTurbineHistories)
              setSelectedWindTurbineHistories(jsonArray);
          }
          else
            console.log('Database connection error...');
      }).catch(e => console.log(e));
  };
  
  async function fetchWindTurbines()
  {
      let urlToFetch = "http://localhost:8080/api/windturbines";
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
      setSelectedWindTurbineId(windTurbines[0]["id"]);
  }, [windTurbines]); //Only once time

  React.useEffect(()=>
  {
    if (isInitialMount.current || selectedWindTurbineId == null) 
      return;
    console.log(selectedWindTurbineId);

    fetchWindTurbineHistories(selectedWindTurbineId);
  }, [selectedWindTurbineId]); //Only once time

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  if(windTurbines == null)
    return(<div></div>);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="INFORMATION OF WIND TURBINES" subtitle={"Wind Turbine ID: "+selectedWindTurbineId+" Selected"} />
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

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
        {Map(windTurbines, {setSelectedWindTurbineId})}
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Faults Percentage Of Last 3 Hours
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" progress={selectedWindTurbineHistories.filter(h => h["state"] == 1).length/selectedWindTurbineHistories.length}/>
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              {selectedWindTurbineHistories.filter(h => h["state"] == 1).length/selectedWindTurbineHistories.length}% of faults
            </Typography>
            <Typography>Faults: {selectedWindTurbineHistories.filter(h => h["state"] == 1).length}, No Faults {selectedWindTurbineHistories.filter(h => h["state"] == 0).length}</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Faults of Last 3 Hours
          </Typography>
          <Box height="250px" mt="-40px">
          {LineChartColumn("", selectedWindTurbineHistories, "generatedAt", "state")}
          </Box>
        </Box>

        {DataInfoColumn("State", selectedWindTurbineHistories, "generatedAt", "state")}      

        {LineChartColumn("Sys 1 inverter 3 Cabinet Temperature", selectedWindTurbineHistories.reverse(), "generatedAt", "sys1Inverter3CabinetTemp")}
        {DataInfoColumn("Sys 1 inverter 3 Cabinet Temperature", selectedWindTurbineHistories, "generatedAt", "sys1Inverter3CabinetTemp")}

        {LineChartColumn("Pitch Cabinet Blade B Temperature", selectedWindTurbineHistories.reverse(), "generatedAt", "pitchCabinetBladeBTemp")}
        {DataInfoColumn("Pitch Cabinet Blade B Temperature", selectedWindTurbineHistories, "generatedAt", "pitchCabinetBladeBTemp")}

        {LineChartColumn("Nacelle Ambient Temperature", selectedWindTurbineHistories.reverse(), "generatedAt", "nacelleAmbientTemp1")}
        {DataInfoColumn("Nacelle Ambient Temperatur", selectedWindTurbineHistories, "generatedAt", "nacelleAmbientTemp1")}

        {LineChartColumn("Yaw Inverter Cabinet Temperature", selectedWindTurbineHistories.reverse(), "generatedAt", "yawInverterCabinetTemp")}
        {DataInfoColumn("Yaw Inverter Cabinet Temperature", selectedWindTurbineHistories, "generatedAt", "yawInverterCabinetTemp")}

        {LineChartColumn("Control Cabinet Temperature", selectedWindTurbineHistories.reverse(), "generatedAt", "controlCabinetTemp")}
        {DataInfoColumn("Control Cabinet Temperature", selectedWindTurbineHistories, "generatedAt", "controlCabinetTemp")}
      </Box>
      <Box sx={{height: "20px"}}/>
    </Box>
  );
};

export default Dashboard;
