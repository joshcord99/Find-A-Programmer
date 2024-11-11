import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import Candidate from "../interfaces/Candidate.interface";


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
    bio: "",
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  function goNext() {
    setCurrentIndex(currentIndex + 1);
    searchGithubUser(allUsers[currentIndex].login).then((userData) => {
      setCurrentUser({
        id: userData.login,
        name: userData.name || "No name provided",
        avatar: userData.avatar_url || "No avatar provided",
        html_url: userData.html_url || "No url provided",
        location: userData.location || "No location provided",
        email: userData.email || "No email provided",
        company: userData.company || "No company provided",
        bio: userData.bio || "No Bio Provided",
      });
    });
  }

  function saveCurrentCandidate() {
    const savedCandidates = JSON.parse(
      localStorage.getItem("savedCandidates") || "[]"
    );
    const updatedCandidates = [...savedCandidates, currentUser];
    localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
    goNext()
  }

  useEffect(() => {
    searchGithub().then((usersData) => {
      setAllusers(usersData);
      searchGithubUser(usersData[currentIndex].login).then((userData) => {
        setCurrentUser({
          id: userData.login,
          name: userData.name || "No name provided",
          avatar: userData.avatar_url || "No avatar provided",
          html_url: userData.html_url || "No url provided",
          location: userData.location || "No location provided",
          email: userData.email || "No email provided",
          company: userData.company || "No company provided",
          bio: userData.bio || "No Bio Provided",
        });
      });
    });
  }, []);

  return (
    <>
      <h1>CandidateSearch</h1>

      <div className="card" style={{ width: "18rem" }}>
        <img
          src={currentUser.avatar}
          className="card-img-top"
          alt="image of person"
        />
        <div className="card-body">
          <h5 className="card-title">{currentUser.id}</h5>
          <p className="card-text">Location: {currentUser.location}</p>
          <p className="card-text">Email: {currentUser.email} </p>
          <p className="card-text">Company: {currentUser.company} </p>
          <p className="card-text">Bio: {currentUser.bio}</p>
        </div>
      </div>

      <div className="button">
        <button onClick={goNext} style = {{backgroundColor: 'red', cursor: 'pointer', borderRadius: '50%', color: 'black'}}>-</button>
        <button onClick={saveCurrentCandidate} style = {{backgroundColor: 'green', cursor: 'pointer', borderRadius: '50%', color: 'black'}}>+</button>
      </div>
    </>
  );
};

export default CandidateSearch;
