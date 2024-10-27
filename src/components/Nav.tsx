import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const navigate = useNavigate();

  return (
    <>
    <div className='nav'>
      <button className='nav-link' onClick={() => navigate('/')}>
        Home
      </button>

      <button className='nav-link' onClick={() => navigate('/SavedCandidates')}>
        Potential Candidates
      </button>
      </div>
    </>
  );
};

export default Nav;
