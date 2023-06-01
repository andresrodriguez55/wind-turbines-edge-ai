import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import ProgressCircle from "../../components/ProgressCircle";
import LineChartColumn from "../../components/LineChartColumn";
import DataInfoColumn from '../../components/DataInfoColumn';

import Map from '../../components/map';
import { getUser } from '../../utils/user';

import Pdf from 'react-to-pdf';
import { useRef } from 'react';

import { backendUrls } from '../../utils/urls';
import API from '../../utils/api';

const Dashboard = () => 
{
  const [selectedWindTurbine, setSelectedWindTurbine] =  React.useState(null);
  const [windTurbines, setWindTurbines] = React.useState([]);
  const [selectedWindTurbineHistories, setSelectedWindTurbineHistories] =  React.useState([]);

  const pdfRef = useRef();

  const APIheaders = 
  {
    'Content-Type': "application/json",
    'Accept': "*/*",
    'Authorization': getUser().token
  };

  const fetchWindTurbineHistories = async (id) => 
  {
    const urlToFetch = backendUrls.getLimitedWindTurbineHistories(id);
    try 
    {
      const jsonArray = await API.get(urlToFetch, APIheaders);
      jsonArray.map(h =>  h.generatedAt = h.generatedAt.replace('T', ' ').substring(0, 19));
      setSelectedWindTurbineHistories(jsonArray);
    } 
    catch (error) 
    {
      console.log('Database connection error...');
    }
  };

  const fetchWindTurbines = async () => {
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

  useEffect(() => 
  {
    fetchWindTurbines();
  }, []);

  useEffect(() => 
  {
    if (windTurbines.length > 0) 
    {
      setSelectedWindTurbine(windTurbines[0]);
    }
  }, [windTurbines]);

  useEffect(() => 
  {
    if (selectedWindTurbine !== null) 
    {
      fetchWindTurbineHistories(selectedWindTurbine["id"]);
    }
  }, [selectedWindTurbine]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const obtainFaultPercentages = () => 
  {
    if(selectedWindTurbineHistories.length === 0)
      return 0;

    return (selectedWindTurbineHistories.filter(h => h?.state === 1).length / selectedWindTurbineHistories.length).toFixed(2);
  }

  return (
    <Box m="20px" ref={pdfRef}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="INFORMATION OF WIND TURBINES" subtitle={"Wind Turbine ID: " + selectedWindTurbine?.id + " Selected"} />
        <Box>
          <Pdf targetRef={pdfRef} filename="document.pdf">
          {({ toPdf }) => (
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
              onClick={toPdf} className="button"
            >
              <DownloadOutlinedIcon sx={{ mr: "10px" }} />
              Download Reports
            </Button>
            )}
			  </Pdf>
        </Box>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(11, 1fr)"
        gridAutoRows="230px"
        gap="20px"
        ref={pdfRef}
      >
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Map windTurbines={windTurbines} setSelectedWindTurbine={setSelectedWindTurbine} />
        </Box>

        <Box ref={pdfRef}
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
            mt="50px"
          >
            <ProgressCircle size="125" progress={selectedWindTurbineHistories.filter(h => h?.state === 1).length / selectedWindTurbineHistories.length} />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              {obtainFaultPercentages()}% of faults
            </Typography>
            <Typography>Faults: {selectedWindTurbineHistories.filter(h => h?.state === 1).length}, No Faults {selectedWindTurbineHistories.filter(h => h["state"] === 0).length}</Typography>
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
          <Box height="320px" mt="-40px">
            {LineChartColumn("", selectedWindTurbineHistories, "generatedAt", "state")}
          </Box>
        </Box>

        {DataInfoColumn("State", selectedWindTurbineHistories, "generatedAt", "state")}

        {LineChartColumn("Sys 1 inverter 3 Cabinet Temperature", selectedWindTurbineHistories, "generatedAt", "sys1Inverter3CabinetTemp")}
        {DataInfoColumn("Sys 1 inverter 3 Cabinet Temperature", selectedWindTurbineHistories, "generatedAt", "sys1Inverter3CabinetTemp")}

        {LineChartColumn("Pitch Cabinet Blade B Temperature", selectedWindTurbineHistories, "generatedAt", "pitchCabinetBladeBTemp")}
        {DataInfoColumn("Pitch Cabinet Blade B Temperature", selectedWindTurbineHistories, "generatedAt", "pitchCabinetBladeBTemp")}

        {LineChartColumn("Nacelle Ambient Temperature", selectedWindTurbineHistories, "generatedAt", "nacelleAmbientTemp1")}
        {DataInfoColumn("Nacelle Ambient Temperature", selectedWindTurbineHistories, "generatedAt", "nacelleAmbientTemp1")}

        {LineChartColumn("Yaw Inverter Cabinet Temperature", selectedWindTurbineHistories, "generatedAt", "yawInverterCabinetTemp")}
        {DataInfoColumn("Yaw Inverter Cabinet Temperature", selectedWindTurbineHistories, "generatedAt", "yawInverterCabinetTemp")}

        {LineChartColumn("Control Cabinet Temperature", selectedWindTurbineHistories, "generatedAt", "controlCabinetTemp")}
        {DataInfoColumn("Control Cabinet Temperature", selectedWindTurbineHistories, "generatedAt", "controlCabinetTemp")}
      </Box>
      <Box sx={{ height: "20px" }} />
    </Box>
  );
};

export default Dashboard;