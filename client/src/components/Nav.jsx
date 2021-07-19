import { Link } from 'react-router-dom';

// TODO pass in setRestau to pass to pass 'clicked' restau object -- didn't work. why?
const Nav = ({ restaus }) => {
  // TODO figure out how to implement this.
  const handleSelection = (evt) => {
    // need to remove 'active' from previous one
    // and then set active on the new one
  };

  return (
    <nav onClick={handleSelection}>
      {/* active classNames with react-router:
      https://stackoverflow.com/questions/42297728/react-js-implement-menu-highlight-active-link */}
      <Link to={'/'} className='active'>
        Home
      </Link>
      {restaus.map((restau) => (
        <Link
          key={restau.id}
          to={`/restaurant/${restau.id}`}
          // onClick={setRestau(restau)}
        >
          {restau.name}
        </Link>
      ))}
    </nav>
  );
};

export default Nav;
