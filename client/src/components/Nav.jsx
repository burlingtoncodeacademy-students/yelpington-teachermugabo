import { Link } from 'react-router-dom';

// TODO pass in setRestau to pass to pass 'clicked' restau object -- didn't work. why?
const Nav = ({ restaus }) => {
  return (
    <nav>
      <a href={'/'} className='active'>
        Home
      </a>
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
