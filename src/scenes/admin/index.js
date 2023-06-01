import React, { useState, useEffect } from 'react';

import { tokens } from "../../theme";

import { getUser } from '../../utils/user';

import 
{
  TextField,
  Box,
  Button,
  useTheme,
  Select,
  MenuItem,
} from "@mui/material";

import Map from '../../components/map';

export default function Admin() 
{
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const [selectedWindTurbine, setSelectedWindTurbine] =  React.useState(null);
  const [windTurbines, setWindTurbines] = React.useState([]);
  const [disableButton, setDisableButton] = useState(false);

  const [changedWindTurbine, setChangedWindTurbine] = React.useState({id: null, latitude: 0, longitude: 0, status: "OFFLINE"});

  const APIheaders = 
  {
    'Content-Type': "application/json",
    'Accept': "*/*",
    'Authorization': getUser().token
  };

  const handleSubmitCreate = async (e) => 
  {
    e.preventDefault();
    setDisableButton(true);

    var result = window.confirm("Are you sure you want to create a windturbine with " +changedWindTurbine?.longitude+
      " of longitude and "+changedWindTurbine?.latitude+" of latitude?")
    if (!result)
    {
      setDisableButton(false);
      return;
    }

    const data = changedWindTurbine;

    const URLToFetch = 'https://server-windturbines.onrender.com/api/windturbines';
    try 
    {
      const response = await fetch(URLToFetch, 
      {
        method: 'POST',
        headers: APIheaders,
        body: JSON.stringify(data),
      });

      if (response.status !== 201) 
      {
        const text = await response.text();
        alert(text);
      } 
      else 
      {
        alert("created!");
        fetchWindTurbines();
      }
    } 
    catch (error) 
    {
      alert(error);
    }

    setDisableButton(false);
  };

  const handleSubmitUpdate = async (e) => 
  {
    e.preventDefault();
    setDisableButton(true);

    var result = window.confirm("Are you sure you want to update the windturbine with id " +changedWindTurbine?.id+"?")
    if (!result)
    {
      setDisableButton(false);
      return;
    }

    const data = changedWindTurbine;

    const URLToFetch = 'https://server-windturbines.onrender.com/api/windturbines' + "/" + data.id;
    try 
    {
      const response = await fetch(URLToFetch, 
      {
        method: 'PUT',
        headers: APIheaders,
        body: JSON.stringify(data),
      });

      if (response.status !== 200) 
      {
        const text = await response.text();
        alert(text);
      } 
      else 
      {
        alert(changedWindTurbine.id + " updated!");
        fetchWindTurbines();
      }
    } 
    catch (error) 
    {
      alert(error);
    }

    setDisableButton(false);
  };

  const handleSubmitDelete = async (e) => 
  {
    e.preventDefault();
    setDisableButton(true);

    var result = window.confirm("Are you sure you want to delete the windturbine with id " +changedWindTurbine?.id+"?")
    if (!result)
    {
      setDisableButton(false);
      return;
    }

    const data = changedWindTurbine;

    const URLToFetch = 'https://server-windturbines.onrender.com/api/windturbines' + "/" + data.id;
    try 
    {
      const response = await fetch(URLToFetch, 
      {
        method: 'DELETE',
        headers: APIheaders,
      });

      if (response.status !== 204) 
      {
        const text = await response.text();
        alert(text);
      } 
      else 
      {
        alert(changedWindTurbine.id + " deleted!");
        fetchWindTurbines();
      }
    } 
    catch (error) 
    {
      alert(error);
    }

    setDisableButton(false);
  };

  const fetchWindTurbines = async () => 
  {
    let urlToFetch = "https://server-windturbines.onrender.com/api/windturbines";
    try 
    {
      const response = await fetch(urlToFetch, { method: "GET", headers: APIheaders });
      if (response.ok) 
      {
        const jsonArray = await response.json();
        setWindTurbines((prevWindTurbines) => [...jsonArray]);
      } 
      else 
      {
        console.log('Database connection error...');
      }
    } 
    catch (error) 
    {
      console.log(error);
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
      setSelectedWindTurbine(windTurbines[windTurbines.length - 1]);
    }
  }, [windTurbines]);

  useEffect(() => 
  {
    if (selectedWindTurbine !== null) 
    {
      setChangedWindTurbine(Object.assign({}, selectedWindTurbine));
    }
  }, [selectedWindTurbine]);

  if(selectedWindTurbine === null)
    return <div>Loading...</div>

  return (
    <Box>
      <Box m="20px">
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
          </Box>
        </Box>
      </Box>

      <Box m="20px">
        <TextField
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              variant="filled"
              type="text"
              label="Id"
              contentEditable={false} 
              value={changedWindTurbine?.id}
              name="windTurbineId"              
              sx={{ gridColumn: "span 1" }}
            />

        <TextField
          fullWidth
          variant="filled"
          type="number"
          label="Latitude"
          name="latitude"     
          contentEditable={true} 
          value={changedWindTurbine?.latitude}    
          onChange={(event)=> {changedWindTurbine.latitude = event.target.value; setChangedWindTurbine(Object.assign({}, changedWindTurbine));} }
          sx={{ gridColumn: "span 2" }}
        />

        <TextField
          fullWidth
          variant="filled"
          type="number"
          label="Longitude"
          name="longitude"
          contentEditable={true} 
          value={changedWindTurbine?.longitude  }    
          onChange={(event)=> {changedWindTurbine.longitude = event.target.value; setChangedWindTurbine(Object.assign({}, changedWindTurbine));} }
          sx={{ gridColumn: "span 2" }}
        />

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={changedWindTurbine?.status}
          label="Status"
          onChange={(event)=> {changedWindTurbine.status = event.target.value; setChangedWindTurbine(Object.assign({}, changedWindTurbine));} }
        >
          <MenuItem value={"ONLINE"}>ONLINE</MenuItem>
          <MenuItem value={"OFFLINE"}>OFFLINE</MenuItem>
        </Select>
      </Box>
      
      <Box display="flex" justifyContent="end" mt="20px" >
        <Button type="submit" color="error" variant="contained" disabled={disableButton} onClick={(e)=>handleSubmitDelete(e)}>
          Delete
        </Button>
        <Box sx={{ m: 1 }} />
        <Button type="submit" color="warning" variant="contained" m={5} disabled={disableButton} 
          onClick={(e)=>{handleSubmitUpdate(e)}}>
          Update
        </Button>
        <Box sx={{ m: 1 }} />
        <Button type="submit" color="success" variant="contained" disabled={disableButton} onClick={e => handleSubmitCreate(e)}>
          Create
        </Button>
        <Box sx={{ m: 1.5 }} />
      </Box>
      <Box sx={{ m: 4 }} />

    </Box>
  );


}