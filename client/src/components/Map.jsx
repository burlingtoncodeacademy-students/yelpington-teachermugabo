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
  asych useEffect(() => {
    let tempRestaus = await fetch('/api/')
      .then((r) => r.json())
      .then((ids) =>
        ids.map((id) =>
          await fetch(`/api/${id}`)
            .then((r) => r.json())
            .then((data) => data) 
        )
      );

      // Question: how do I get al this into?!
      setRestau(tempRestaus)
  })

  /*
  // grab the ids & use those ids to
  useEffect(() => {
    // get Restau IDs
    fetch('/api')
      .then((res) => res.json())
      .then((data) => {
        console.log('data @24', data);
        setRestausIds(data);
      });
  }, []);
  */

  /*
  // when restaudId change,
  // get Restaurant data & push into into Restaus
  useEffect(() => {
    // for each Id, get a restaurant
    if (restauIds.length) {
      restauIds.forEach(async (restauId) => {
        let tempRestaus;
        let restauObj = await fetch(`/api${restauId}`).then((res) =>
          res.json()
        );
        console.log(restauObj, restauObj);
      });
    }
  }, [restauIds]);
  */

  return (
    <div id='map-container'>
      <MapContainer center={center} zoom={12} style={{ height: '60vh' }}>
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">    OpenStreetMap</a> contributors'
        ></TileLayer>
        {/* insert fetch here to get all restauIds, then for each restauId, fetch
        it's information, get its latlong and create a marker for it on the map
        :-) */}

        <Marker position={center} icon={DefaultIcon}>
          <Popup>Burlington is here!</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
