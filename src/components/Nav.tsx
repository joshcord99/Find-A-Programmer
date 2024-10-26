import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate('/')}>
        Home
      </button>
      <button onClick={() => navigate('/SavedCandidates')}>
        Potential Candidates
      </button>
    </>
  );
};

export default Nav;
