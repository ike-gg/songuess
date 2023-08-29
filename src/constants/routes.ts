export type SetCategories = "featured" | "community" | "personal";

const sets = {
  browser: (category: SetCategories = "featured", query?: string) => {
    const params = new URLSearchParams();
    params.set("category", category);
    query && params.set("query", query);

    return `/sets?` + params.toString();
  },
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

const multiplayer = {
  index: "/multiplayer",
  lobby: (lobbyId: string) => `/multiplayer/lobby/${lobbyId}`,
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

const github = {
  repo: "https://github.com/ike-gg/songuess",
  issues: "https://github.com/ike-gg/songuess/issues",
};

export const routes = { sets, auth, home, user, game, multiplayer, github };
