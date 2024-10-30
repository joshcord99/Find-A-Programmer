const SavedCandidates = () => {
  return (
    <>
      <h1>Potential Candidates</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Bio</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sample Location</td>
            <td>sample.email@example.com</td>
            <td>Sample Company</td>
            <td>Sample Bio</td>
            <td>
              <button>Reject</button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default SavedCandidates;
