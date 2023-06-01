import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
    TextField,
      Box,
      Button,
      IconButton,
      Typography,
      useTheme,
    } from "@mui/material";

export default function Map({ windTurbines, setSelectedWindTurbine})
{
    const [mapKey, setMapKey] = useState(Date.now()); // Estado para forzar la actualización del mapa

    useEffect(() => {
        setMapKey(Date.now());
    }, [windTurbines]);
    
    return (
        <MapContainer
        center={[39.1667, 35.6667]}
        zoom={6}
        style={{ width: "100%", height: "100%" }}
        >
        <TileLayer
            url="https://api.maptiler.com/maps/toner-v2/256/{z}/{x}/{y}.png?key=1QPy4iqeKBev2H36pTp0"
            attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        />
        {windTurbines?.map((windturbine, index) => (
            <Marker
            key={index}
            position={[windturbine["latitude"], windturbine["longitude"]]}
            icon={
                L.icon({
                iconRetinaUrl: "",
                iconUrl: (windturbine["status"] == "ONLINE") ?  
                    require('./assets/online-wind-turbine.png') :
                    require('./assets/offline-wind-turbine.png'),
                shadowUrl: "",
                iconSize: [60, 60]
                }) 
            }
            eventHandlers=
            {{
                click: (e) => 
                {
                    setSelectedWindTurbine(windturbine);
                },
            }}
            >
            <Popup>
                Latitude: {windturbine["latitude"]}<br /> Longitude: {windturbine["longitude"]}
                <br />

            </Popup>
            </Marker>
        ))}
        </MapContainer>
    );
};