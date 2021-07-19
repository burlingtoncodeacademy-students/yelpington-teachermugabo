const Restaurant = (restau) => {
  return (
    <div className='restauContainer'>
      {/* starts with welcome section, then a map below */}
      <section>
        <h2>Hello there, welcome to {restau.name}</h2>
        <p>What brings you here? </p>
        <p>
          Here's what people have said about us:
          <ul>
            {restau.notes.map((review) => (
              <li>{review}</li>
            ))}
          </ul>
        </p>
      </section>
      {/* auto-wrap restau into an array & call map   */}
      <Map center={restau.latlong} restaus={[].concat(restau)} />
    </div>
  );
};

export default Restaurant;
