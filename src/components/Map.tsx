import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import SearchLocation from "./SearchLocation";
import MapComponent from "./MapCompenet";

const Map = () => {
  const [lat, setLat] = useState<number>(36.2795);
  const [long, setLong] = useState<number>(50.0046);
  const [location, setLocation] = useState<string>("");

  return (
    <>
      <SearchLocation
        setLat={setLat}
        setLong={setLong}
        location={location}
        setLocation={setLocation}
      />
      <MapContainer
        className="h-[100vh] w-[100%]"
        scrollWheelZoom={true}
      >
        <MapComponent
          lat={lat}
          long={long}
        />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, long]}>
          <Popup>{location}</Popup>
        </Marker>
      </MapContainer>
    </>
  );
};

export default Map;
