// TODO: Create an interface for the Candidate objects returned by the API
interface Candidate {
    firstName: string;
    lastName: string;
    userName: string;
    location: string;
    email: string;
    company: string
  }
  
  const fullName: Candidate = {
    firstName: 'First',
    lastName: 'Last',
    userName: 'Username',
    location: 'Location',
    email: 'Email',
    company: 'Name'
  };