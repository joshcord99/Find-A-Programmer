const SavedCandidates = () => {
  return (
    <>
      <h1>Potential Candidates</h1>
      <div className="table" >
        <div className="card-body">
          <h5 className="card-title"></h5>
          <p className="card-text">Location: </p>
          <p className="card-text">Email: </p>
          <p className="card-text">Company: </p>
          <p className="card-text">Bio: </p>
          <p className="card-text">Reject</p>
          <button>-</button>
        </div>
      </div>
    </>
    
  );
};

export default SavedCandidates;
