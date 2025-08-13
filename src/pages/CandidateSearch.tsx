import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import Candidate from "../interfaces/Candidate.interface";

interface GithubUser {
  login: string;
  name?: string;
  avatar_url?: string;
  html_url?: string;
  location?: string;
  email?: string;
  company?: string;
  bio?: string;
}

const CandidateSearch = () => {
  const [allUsers, setAllusers] = useState<GithubUser[]>([]);
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
  const [showNotification, setShowNotification] = useState(false);

  function goNext() {
    if (currentIndex + 1 >= allUsers.length) {
      fetchNewProfiles();
      return;
    }
    setCurrentIndex(currentIndex + 1);
    searchGithubUser(allUsers[currentIndex + 1].login).then((userData) => {
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

  function fetchNewProfiles() {
    searchGithub().then((usersData) => {
      if (usersData.length > 0) {
        setAllusers(usersData);
        setCurrentIndex(0);
        searchGithubUser(usersData[0].login).then((userData) => {
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
    });
  }

  function saveCurrentCandidate() {
    const savedCandidates = JSON.parse(
      localStorage.getItem("savedCandidates") || "[]"
    );
    const updatedCandidates = [...savedCandidates, currentUser];
    localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));

    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);

    goNext();
  }

  useEffect(() => {
    fetchNewProfiles();
  }, []);

  return (
    <>
      {showNotification && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            backgroundColor: "green",
            color: "white",
            padding: "15px 20px",
            borderRadius: "5px",
            zIndex: 1000,
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            animation: "slideIn 0.3s ease-out",
          }}
        >
          User added successfully!
        </div>
      )}
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

      <div
        className="button"
        style={{
          display: "flex",
          gap: "200px",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <button
          onClick={goNext}
          style={{
            backgroundColor: "red",
            cursor: "pointer",
            borderRadius: "50%",
            color: "black",
            width: "50px",
            height: "50px",
            fontSize: "20px",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: "1",
          }}
        >
          -
        </button>
        <button
          onClick={saveCurrentCandidate}
          style={{
            backgroundColor: "green",
            cursor: "pointer",
            borderRadius: "50%",
            color: "black",
            width: "50px",
            height: "50px",
            fontSize: "20px",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: "1",
          }}
        >
          +
        </button>
      </div>
    </>
  );
};

export default CandidateSearch;
