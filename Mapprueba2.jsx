import  { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import '../../css/react-leaflet.css';
import { CircleIcon } from "./react-leaflet-icon";

const ClickHandler = ({ handleMapClick }) => {
    const map = useMapEvents({
      click: (e) => {
        handleMapClick(e);
      },
    });
  
    return null;
  };
  

export const Mapprueba2 = () => {

    const [popupOpen, setPopupOpen] = useState(false);
    const [clickedPosition, setClickedPosition] = useState(null);

    const areaCoordinates = { lat: 51.505, lng: -0.09 };

    const handleMapClick = (e) => {
        const clickedCoordinates = e.latlng;
        console.log(clickedCoordinates)
        // Verificar si las coordenadas del clic están dentro del área específica
        if (
          clickedCoordinates.lat >= areaCoordinates.lat - 0.1 &&
          clickedCoordinates.lat <= areaCoordinates.lat + 0.1 &&
          clickedCoordinates.lng >= areaCoordinates.lng - 0.1 &&
          clickedCoordinates.lng <= areaCoordinates.lng + 0.1
        ) {
          setClickedPosition(clickedCoordinates);
          setPopupOpen(true);
        } else {
          setPopupOpen(false);
        }
      };

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
      eventHandlers={{ click: handleMapClick }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <ClickHandler handleMapClick={handleMapClick} />
      {popupOpen && clickedPosition && (
        <Marker position={clickedPosition}>
          <Popup>Pop-up en el área específica</Popup>
        </Marker>
      )}
      <Marker position={areaCoordinates}>
         
        </Marker>
    </MapContainer>
  );
};
