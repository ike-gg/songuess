const sets = {
  browser: "/sets",
  amimport: "/sets/importplaylist",
  spotify: "/sets/spotify",
  create: {
    blank: "/sets/create",
    spotifyPlaylist: (id: string) => `/sets/create?spotifyplaylistid=${id}`,
    amPlaylist: (id: string) => `/sets/create?playlistid=${id}`,
    existingSet: (id: string) => `/sets/create?setid=${id}`,
  },
};

export { sets };
