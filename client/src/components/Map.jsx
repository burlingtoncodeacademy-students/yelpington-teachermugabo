import { MapContainer, Popup, Marker, TileLayer } from 'react-leaflet';
import { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

const Map = () => {
  const [center, setCenter] = useState([44.47, -73.21]);

  return (
    <div id='map-container'>
      <MapContainer center={center} zoom={12} style={{ height: '60vh' }}>
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">    OpenStreetMap</a> contributors'
        ></TileLayer>
        <Marker position={center} icon={DefaultIcon}>
          <Popup>Burlington is here!</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
