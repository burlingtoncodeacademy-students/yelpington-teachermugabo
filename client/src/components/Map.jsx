import { MapContainer, Popup, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

const Map = ({ center, restaus }) => {
  return (
    <div id='map-container'>
      <MapContainer center={center} zoom={13} style={{ height: '60vh' }}>
        {/* select map tile + attribution  */}
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">    OpenStreetMap</a> contributors'
        ></TileLayer>

        {/* add markers for all restaurants  */}
        {restaus.map((restau) => (
          <Marker key={restau.id} position={restau.latlong} icon={DefaultIcon}>
            <Popup>
              {restau.name} at {restau.address}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
