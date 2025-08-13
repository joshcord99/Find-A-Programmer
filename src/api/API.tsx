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

const searchGithub = async (since?: number): Promise<GithubUser[]> => {
  try {
    const start = since || Math.floor(Math.random() * 1000);
    const response = await fetch(
      `https://api.github.com/users?since=${start}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Invalid API response, check the network tab");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.log("An error occurred", err);
    return [];
  }
};

const searchGithubUser = async (username: string): Promise<GithubUser> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error("Invalid API response, check the network tab");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.log("An error occurred", err);
    return {} as GithubUser;
  }
};

export { searchGithub, searchGithubUser };
