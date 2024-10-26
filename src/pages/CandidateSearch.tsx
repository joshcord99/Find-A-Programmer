import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {

  const [allUsers, setAllusers] = useState<any[]>([]);

  const [currentUser, setCurrentUser] = useState<Candidate>({
    id: "",
    name: "",
    avatar: "",
    html_url: "",
    location: "",
    email: "",
    company: ""
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
          company: userData.company
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
              company: userData.company
            })
          })
      })
  }, [])


  return (
    <>
      <h1>CandidateSearch</h1>;

      <div className="card" style={{ width: '18rem' }}>
        <img src="..." className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{currentUser.id}</h5>
          <p className="card-text">Location: {currentUser.location}</p>
          <p className="card-text">Email: </p>
          <p className="card-text">Company: </p>
          <p className="card-text">Bio: </p>
        </div>
      </div>

      <button onClick={goNext}>Next Candidate</button>

      <button>Save Candidate</button>
    </>)
};

export default CandidateSearch;
