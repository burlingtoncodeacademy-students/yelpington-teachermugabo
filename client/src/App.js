import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Map from './components/Map';
import Header from './components/Header';
import Nav from './components/Nav';
import Restaurant from './components/Restaurant';

import './App.css';

function App() {
  const [center, setCenter] = useState([44.47, -73.21]);
  const [restaus, setRestaus] = useState([]); // array of objects of restaurants

  // tried to send this back from link being clicked -- didn't quite work. why?
  // const [currentRestau, setCurrentRestau] = useState(undefined);

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
      setRestaus(restausTemp);
    };
    fetchRestaus();
  }, []);

  // I need this to trigger & wait on useEffect
  const getRestauById = (id) => {
    // if (restaus === []) setRestau([]); // trigger useEffect?

    //console.log('id', id); => requested page page
    //console.log('restaus', restaus);

    return restaus.filter((restau) => {
      return restau.id === id;
    })[0];
  };

  return (
    <BrowserRouter>
      <Header />
      <Nav restaus={restaus} />
      {/* setRestau={setCurrentRestau} /> */}
      <Switch>
        <Route
          exact
          path='/'
          render={({ match }) => (
            <Map center={center} restaus={restaus} zoom={13} />
          )}
        />
        <Route
          path='/restaurant/:restaurantId'
          render={({ match }) => (
            <Restaurant restau={getRestauById(match.params.restaurantId)} />
          )}
        />
        <Route
          path='*'
          render={({ match }) => (
            <p>Ooooh, there's nothing here at {match.url}.</p>
          )}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
