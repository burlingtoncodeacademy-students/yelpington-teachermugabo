import Map from './Map';

const Restaurant = ({ restau }) => {
  return (
    <div className='restauContainer'>
      {/* first, make sure we have data - redirect home otherwise 
          unfortunately, this is not working. */}
      {/* {restau === [] ? <Redirect to='/' /> : undefined} */}

      {/* renter page once once our object is available */}
      {!restau ? (
        <h2>loading...</h2>
      ) : (
        <div>
          <section>
            {/* starts with welcome section, then a map below */}
            <h2>Hello there, welcome to {restau.name}</h2>
            <p>
              Grab a seat, stay a while. We'll have the menu to you in a minute.
            </p>
            <p>Here's what people have said about us:</p>
            <ul>
              {restau.notes.map((review, index) => (
                <li key={index}>{review}</li>
              ))}
            </ul>
          </section>
          {/* auto-wrap restau into an array & call map
          source: https://stackoverflow.com/questions/39751069/how-to-safely-wrap-an-object-into-an-array-in-javascript */}
          <Map center={restau.latlong} restaus={[].concat(restau)} zoom={13} />
        </div>
      )}
    </div>
  );
};

export default Restaurant;
