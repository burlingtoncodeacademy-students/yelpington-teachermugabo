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
  const [restaus, setRestau] = useState([]); // array of objects of restaurants

  /*
   * fetch restaurants
   */
  useEffect(() => {
    const fetchRestaus = async () => {
      const restauIdsResp = await fetch('/api');
      const restauIds = await restauIdsResp.json(); // works up to here

      // setRestausIds(restauIds); // set state - don't need/use this

      // wait for all async calls to resolve
      // source: https://advancedweb.hu/how-to-use-async-functions-with-array-map-in-javascript/
      const restausTemp = await Promise.all(
        restauIds.map(async (id) => {
          const restauResp = await fetch(`/api/${id}`);
          const restauObj = await restauResp.json();

          console.log('restauObj', restauObj);
          return restauObj;
        })
      );

      console.log('restausTemp', restausTemp);
      setRestau(restausTemp);
    };
    fetchRestaus();
  }, []);
  /* */

  /*
   * populate restaurants
   * couldn't get this one to work
  useEffect(() => {
    // ? where do the 'awaits' go?
    const fetchRestaus = async () => {
      await fetch('/api/')
        .then((r) => r.json())
        .then((ids) => {
          // get & set restaurants
          // where to grab it from -- where to place await?
          setRestau(
            ids.map(
              async (id) =>
                await fetch(`/api/${id}`)
                  .then((r) => r.json())
                  .then((data) => {
                    console.log(data) // so this is a restaurant
                    return data;
                  })
            )
          );
        });
    };
    fetchRestaus();
  }, []);
/**/

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
        {restaus}
      </MapContainer>
    </div>
  );
};

export default Map;
