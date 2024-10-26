// TODO: Create an interface for the Candidate objects returned by the API

interface Candidate {
    id: string;   
    name?: string;       
    avatar: string;    
    html_url: string;       
    location?: string;   
    email?: string;        
    company?: string;   
  };

  export default Candidate;
