![banner](/public/banner.png)

<br />
<div align="center">
  <h2 align="center">SonGuess</h2>

  <p align="center">
    Song guessing game.
    <br />
    <a href="https://songu.es">Play</a>
    ·
    <a href="https://github.com/ike-gg/songuess/issues">Report Bug</a>
    ·
    <a href="https://github.com/ike-gg/songuess/issues">Request Feature</a>
    ·
    <a href="https://songu.es">Check Live</a>
  </p>
</div>

## About The Project

SonGuess is an open-source project that's all about guessing songs. Players listen to song snippets and guess the right title.

Players can create their own sets of songs, tailored to their favorite artists, genres, or personal preferences. The game integrates with Spotify, allowing users to import their playlists and immerse themselves in their own music while playing along.

The future of the project holds the promise of a multiplayer mode, where you can challenge your friends and compete in real-time song guessing battles.

---

## Built with

![typescript](https://img.shields.io/badge/typescript-000000?style=for-the-badge&logo=typescript&logoColor=FFFFFF)
![react](https://img.shields.io/badge/react-000000?style=for-the-badge&logo=react&logoColor=FFFFFF)
![tailwind](https://img.shields.io/badge/tailwind-000000?style=for-the-badge&logo=tailwindcss&logoColor=FFFFFF)
![supabase](https://img.shields.io/badge/supabase-000000?style=for-the-badge&logo=supabase&logoColor=FFFFFF)
![next](https://img.shields.io/badge/next-000000?style=for-the-badge&logo=nextdotjs&logoColor=FFFFFF)
![postgreSQL](https://img.shields.io/badge/postgreSQL-000000?style=for-the-badge&logo=postgreSQL&logoColor=FFFFFF)
![framer](https://img.shields.io/badge/framer%20motion-000000?style=for-the-badge&logo=framer&logoColor=FFFFFF)
![zod](https://img.shields.io/badge/zod-000000?style=for-the-badge&logo=zod&logoColor=FFFFFF)

---

## Getting Started

1. Clone repo

```
git clone https://github.com/ike-gg/songuess
```

2. Install dependencies

```
npm install
```

3. Create .env file and fill it with your credentials

```go
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

SECRET=

//spotify for internal use, not required
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_CALLBACK_URL=
```

4. TODO: Prepare structure of database

5. Run project

```
npm run start
```

---

## Roadmap

- [x] First game interface
- [x] Creating accounts (sign in, sign up, recovery password, oauth with providers)
- [x] Creating sets
- [x] Modyfying (edit, delete) sets
- [x] Import user Spotify playlists _(removed because spotify does not allow to integrate with quiz/trivia music games/apps. 😭)_
- [x] Import Apple Music playlists
- [x] Game redesign
- [ ] Refactor and enhance codebase 🔥💀
- [ ] Level/experience system
- [ ] Leaderboard
- [ ] Multiplayer mode
- [ ] More game modes
- [ ] (?) Some AI shit

---

## Contributing

To contribute, simply fork this project and create a pull request with your changes. Whether it's a new feature, bug fix, or documentation improvement, we appreciate all contributions. Thank you for your interest in helping to make this project even better!
