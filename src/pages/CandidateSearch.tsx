import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';
import SavedCandidates from './SavedCandidates';

const CandidateSearch = () => {

  const [allUsers, setAllusers] = useState<any[]>([]);

  const [currentUser, setCurrentUser] = useState<Candidate>({
    id: "",
    name: "",
    avatar: "",
    html_url: "",
    location: "",
    email: "",
    company: "",
    bio:""
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  function goNext() {
    setCurrentIndex(currentIndex + 1);
    setCurrentUser(allUsers[currentIndex])
    searchGithubUser(allUsers[currentIndex].login)
      .then(userData => {
        console.log(userData)
        setCurrentUser({
          id: userData.login,
          name: userData.name,
          avatar: userData.avatar_url,
          html_url: userData.html_url,
          location: userData.location || "No location provided.",
          email: userData.email,
          company: userData.company,
          bio: userData.bio
        })
      })
  }


  useEffect(() => {
    searchGithub()
      .then(usersData => {
        console.log(usersData)
        setAllusers(usersData);
        searchGithubUser(usersData[currentIndex].login)
          .then(userData => {
            console.log(userData)
            setCurrentUser({
              id: userData.login,
              name: userData.name,
              avatar: userData.avatar_url,
              html_url: userData.html_url,
              location: userData.location || "No location provided.",
              email: userData.email,
              company: userData.company,
              bio: userData.bio
            })
          })
      })
  }, [])


  return (
    <>
      <h1>CandidateSearch</h1>

      <div className="card" style={{ width: '18rem' }}>
        <img src={currentUser.avatar} className="card-img-top" alt="image of person" />
        <div className="card-body">
          <h5 className="card-title">{currentUser.id}</h5>
          <p className="card-text">Location: {currentUser.location}</p>
          <p className="card-text">Email: {currentUser.email} </p>
          <p className="card-text">Company: {currentUser.company} </p>
          <p className="card-text">Bio: {currentUser.bio}</p>
        </div>
      </div>

      <div className='button'>
      <button onClick={goNext}>-</button>
      <button onClick={SavedCandidates} >+</button>
      </div>

    </>)
};

export default CandidateSearch;
