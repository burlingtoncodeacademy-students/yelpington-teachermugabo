import Map from './Map';
import { Redirect } from 'react-router';

const Restaurant = ({ restau }) => {
  return (
    <div className='restauContainer'>
      {/* first, make sure we have data - redirect home otherwise 
          unfortunately, this is not working. */}
      {restau === [] ? <Redirect to='/' /> : undefined}

      {/* starts with welcome section, then a map below */}
      <section>
        <h2>Hello there, welcome to {restau.name}</h2>
        <p>What brings you here? </p>
        <p>Here's what people have said about us:</p>
        <ul>
          {restau.notes.map((review, index) => (
            <li key={index}>{review}</li>
          ))}
        </ul>
      </section>
      {/* auto-wrap restau into an array & call map
      source: https://stackoverflow.com/questions/39751069/how-to-safely-wrap-an-object-into-an-array-in-javascript */}
      <Map center={restau.latlong} restaus={[].concat(restau)} />
    </div>
  );
};

export default Restaurant;
