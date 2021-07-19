import { useState, useEffect } from 'react';
import Map from './components/Map';
import './App.css';

function App() {
  const [center, setCenter] = useState([44.47, -73.21]);
  const [restaus, setRestau] = useState([]); // array of objects of restaurants

  /*
   * fetch restaurants
   */
  useEffect(() => {
    const fetchRestaus = async () => {
      // fetch restau IDs...
      const restauIdsResp = await fetch('/api');
      const restauIds = await restauIdsResp.json(); // works up to here

      // map over IDs, fetching the rest of the restaurant objects
      // ! wait for all async calls to resolve
      // source: https://advancedweb.hu/how-to-use-async-functions-with-array-map-in-javascript/
      const restausTemp = await Promise.all(
        restauIds.map(async (id) => {
          const restauResp = await fetch(`/api/${id}`);
          const restauObj = await restauResp.json();

          // return each restau object so the map creates full restau array
          // console.log('restauObj', restauObj);
          return restauObj;
        })
      );

      // set all restaurant in state
      // console.log('restausTemp', restausTemp);
      setRestau(restausTemp);
    };
    fetchRestaus();
  }, []);

  return (
    <div className='App'>
      <h1>Yelpington!</h1>
      <nav>
        <a href={'/'} className='active'>
          Home
        </a>
        {restaus.map((restau) => (
          <a href={`/restaurant/${restau.id}`}>{restau.name}</a>
        ))}
      </nav>
      <Map center={center} restaus={restaus} />
    </div>
  );
}

export default App;
