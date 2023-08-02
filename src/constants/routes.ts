const sets = {
  browser: "/sets",
  amimport: "/sets/importplaylist",
  spotify: "/sets/spotify",
  update: (id: string) => `/sets/update?setid=${id}`,
  create: {
    blank: "/sets/create",
    spotifyPlaylist: (id: string) => `/sets/create?spotifyplaylistid=${id}`,
    amPlaylist: (id: string) => `/sets/create?playlistid=${id}`,
    existingSet: (id: string) => `/sets/create?setid=${id}`,
  },
};

const auth = {
  signin: "/signin",
  signup: "/signup",
  recovery: "/recovery",
};

const home = "/";

export const routes = { sets, auth, home };
