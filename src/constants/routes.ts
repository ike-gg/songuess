const sets = {
  browser: "/xsets",
  amimport: "/sets/templates",
  spotify: "/sets/spotify",
  set: (id: string) => `/sets/${id}`,
  update: (id: string) => `/sets/update?setid=${id}`,
  create: {
    blank: "/sets/create",
    spotifyPlaylist: (id: string) => `/sets/create?spotifyplaylistid=${id}`,
    amPlaylist: (id: string, album: boolean) =>
      `/sets/create?playlistid=${id}${album ? "&album=true" : ""}`,
    existingSet: (id: string) => `/sets/create?setid=${id}`,
  },
};

const auth = {
  signin: "/signin",
  signup: "/signup",
  recovery: "/recovery",
};

const user = {
  profile: "/user",
  id: (userId: string) => `/user/${userId}`,
};

const game = {
  set: (setId: string) => `/game/${setId}`,
};

const home = "/";

export const routes = { sets, auth, home, user, game };
