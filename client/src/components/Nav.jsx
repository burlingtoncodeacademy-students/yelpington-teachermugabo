const Nav = ({ restaus }) => {
  return (
    <nav>
      <a href={'/'} className='active'>
        Home
      </a>
      {restaus.map((restau) => (
        <a href={`/restaurant/${restau.id}`}>{restau.name}</a>
      ))}
    </nav>
  );
};

export default Nav;
