import { useEffect, useState } from "react";
import {
  Circle,
  FeatureGroup,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import ReactLeafletDriftMarker from "react-leaflet-drift-marker";

function MapComponent({ users }) {
  const [position, setPosition] = useState();
  navigator.geolocation.watchPosition((position) => {
    setPosition([position.coords.latitude, position.coords.longitude]);
  });

  // aturan marker
  const markerIcon = new L.Icon({
    iconUrl: "/redMarker.png",
    iconSize: [40, 40],
    iconAnchor: [17, 30],
    popupAnchor: [1, -30],
  });
  const name = localStorage.getItem("name");

  return (
    <>
      {position && (
        <MapContainer center={position} zoom={20} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {users.map((el, i) =>
            // name === el.name ? (
            //   <Marker key={i} position={el.position} icon={markerIcon}>
            //     <Popup>{el.name}</Popup>
            //   </Marker>
            // ) : (
            //   <Marker key={i} position={el.position}>
            //     <Popup>{el.name}</Popup>
            //   </Marker>
            // )
            name === el.name ? (
              <ReactLeafletDriftMarker
                key={i}
                position={el.position}
                duration={1000}
                icon={markerIcon}
              >
                <Popup>{el.name}</Popup>
              </ReactLeafletDriftMarker>
            ) : (
              <ReactLeafletDriftMarker
                key={i}
                position={el.position}
                duration={1000}
              >
                <Popup>{el.name}</Popup>
              </ReactLeafletDriftMarker>
            )
          )}
        </MapContainer>
      )}
    </>
  );
}

export default MapComponent;
