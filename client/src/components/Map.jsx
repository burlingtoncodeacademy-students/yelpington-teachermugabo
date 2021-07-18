import { MapContainer, Popup, Marker, TileLayer } from 'react-leaflet';
import { useState, useEffect } from 'react';
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
  //const [restauIds, setRestausIds] = useState([]);
  const [restaus, setRestau] = useState([]); // array of objects of restaurants

  // populate restaurants
  useEffect(() => {
    // ? where do the 'awaits' go?
    const fetchRestaus = async () => {
      fetch('/api/')
        .then((r) => r.json())
        .then((ids) => {
          // get restaurants
          const restausTemp = ids.map((id) =>
            fetch(`/api/${id}`)
              .then((r) => r.json())
              .then((data) => {
                return data;
              })
          );

          // save restaurants to state
          console.log('restaus @ line25', restausTemp);
          setRestau(restausTemp);
          console.log(restaus);
        });
    };
    fetchRestaus();
  }, []);

  return (
    <div id='map-container'>
      <MapContainer center={center} zoom={12} style={{ height: '60vh' }}>
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">    OpenStreetMap</a> contributors'
        ></TileLayer>

        {/* start by inserting default Burlington marker  */}
        <Marker position={center} icon={DefaultIcon}>
          <Popup>Burlington is here!</Popup>
        </Marker>

        {/* insert fetch here to get all restauIds, then for each restauId, fetch
        it's information, get its latlong and create a marker for it on the map
        :-) */}
      </MapContainer>
      {/* <p>{restaus}</p> */}
    </div>
  );
};

export default Map;
