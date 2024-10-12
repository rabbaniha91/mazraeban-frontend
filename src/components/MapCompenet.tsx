import { useEffect } from "react";
import { useMap } from "react-leaflet";

type latLong = { lat: number; long: number };

const MapComponent = ({ lat, long }: latLong) => {

  const map = useMap();

  useEffect(() => {
    map.setView([lat, long], 11);
  }, [lat, long]);

  map.boxZoom
  return null;
};

export default MapComponent;
