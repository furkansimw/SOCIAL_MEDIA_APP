# [View Demo](https://social-media-app-s0qt.onrender.com/)

<a id="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/furkansimw/SOCIAL_MEDIA_APP/#readme">
    <img src="./dist/client/public/vite.svg" alt="Logo" width="80" height="80">
  </a>

  <h1 align="center">FULL STACK SOCIAL MEDIA APP</h1>

  <h5 align="center">
    <a href="https://social-media-app-s0qt.onrender.com/">View Demo</a>
    ·
    <a  href="https://github.com/furkansimw/SOCIAL_MEDIA_APP/issues">Report Bug</a>
    ·
    <a  href="https://github.com/furkansimw/SOCIAL_MEDIA_APP/issues">Request Feature</a>
  </h5>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#screen-shots">Screen Shots</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

- server: 3000 lines client : 13000 lines total number of lines before compilation 16,000

- PostgreSQL ExpressJs ReactJs NodeJs + Typescript,Socket-io, Redux-toolkit,Context-api, JWT,Cloudinary, React-router-dom, Styled-components used.
- Create Account. Only unique username and mail, passwords are hashed.
- Post Shareable + You can make your account private. Posts are visible when you are not logged in, but if your account is private the logged in + viewer must follow you (after your confirmation) If your account is private they should follow you for the post even if they save the post until they follow you back (after your confirmation) they can't do it later.
- Post Shareable + You can make your account private. Posts are visible when you are not logged in, but if your account is private the logged in + viewer must follow you (after your confirmation) If your account is private they should follow you for the post even if they save the post until they follow you back (after your confirmation) they can't do it later.
- Posts from people you follow on your homepage come by date and are scalable (no offset), last line date, id based, more scalable and to avoid issues like data duplication during performance offset increase.
- All database queries were handled with a single query (triggers were used except insert operations in 2 different tables).
- After the postpopup is opened, it does not send requests to the server again and you can close it with the right and left arrow navigation esc.
- Security is provided with jwt. The token is refreshed every 2 hours. Renewal is canceled after logging out or changing the password. After changing the password, all sessions will be closed in 2 hours- If you type @username while posting or commenting, you can click to go to the specified person (there are no conditions here and the username does not need to be consistent)
- There are session features in the application, but (normally you cannot like, comment, etc. + features such as advanced post like, comment like)
- Real-time messaging, push notifications, no notifications and no inbox if you don't know the sender
- Relationships are blocked, all post likes, comments, sub-comments are completely hidden from you and vice versa (if he blocks you, you will not see it at all) but if you block him, you can see it in the search section.
<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Screen Shots

<div style="display:flex;padding:8px;border:1px solid #363636;border-radius:4px;overflow:hidden;flex-wrap:wrap">

<img style="width:50%;margin-bottom:8px;" src="./images/Screenshot%202023-06-16%20at%2003.56.00.png"/>
<img style="width:48%;margin-left:2%;margin-bottom:8px;" src="./images/Screenshot%202023-06-16%20at%2003.56.15.png"/>

<img style="width:50%;margin-bottom:8px;" src="./images/Screenshot%202023-06-16%20at%2003.56.33.png"/>
<img style="width:48%;margin-left:2%;margin-bottom:8px;" src="./images/Screenshot%202023-06-16%20at%2003.57.30.png"/>

<img style="width:50%;margin-bottom:8px;" src="./images/Screenshot%202023-06-16%20at%2003.57.42.png"/>
<img style="width:48%;margin-left:2%;margin-bottom:8px;" src="./images/Screenshot%202023-06-16%20at%2003.57.48.png"/>

<img style="width:50%;margin-bottom:8px;" src="./images/Screenshot%202023-06-16%20at%2003.58.11.png"/>
<img style="width:48%;margin-left:2%;margin-bottom:8px;" src="./images/Screenshot%202023-06-16%20at%2003.58.42.png"/>

<img style="width:50%;margin-bottom:8px;" src="./images/Screenshot%202023-06-16%20at%2003.58.42.png"/>
<img style="width:48%;margin-left:2%;margin-bottom:8px;" src="./images/Screenshot%202023-06-16%20at%2003.59.27.png"/>

<img style="width:50%;margin-bottom:8px;" src="./images/Screenshot%202023-06-16%20at%2004.00.08.png"/>
<img style="width:48%;margin-left:2%;margin-bottom:8px;" src="./images/Screenshot%202023-06-16%20at%2004.00.24.png"/>

<img style="width:50%;margin-bottom:8px;" src="./images/Screenshot%202023-06-16%20at%2004.02.42.png"/>
<img style="width:48%;margin-left:2%;margin-bottom:8px;" src="./images/Screenshot%202023-06-16%20at%2004.04.05.png"/>

<img style="width:50%;" src="./images/Screenshot%202023-06-16%20at%2004.18.53.png"/>
<img style="width:48%;margin-left:2%;" src="./images/Screenshot%202023-06-16%20at%2004.19.04.png"/>

</div>
<br/>
<a target="_blank" style="cursor:pointer" href="https://photos.google.com/share/AF1QipN0eNtV55973qZQekhfEmQOhl5dTJXQ8BBfmkfpfOa0de_fwcgHqtaD4HH3pceiRg/photo/AF1QipMtesIKDzHyDFRcj0QZpIp2TB-3O78sqvKS0AQf?key=WWJ2Q0pZamJCeGY5V18tN2cyREtHOWdDeXJvZ0Zn">Sample Video</a>

<br/>

### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

- <a href="https://reactjs.org"><img src="https://react.dev/favicon.ico" alt="SocketIO" height="30"></a>
- [![Typescript][typescript]][typescript-url]
- [![NodeJS][node]][node-url]
- [![ExpressJS][express]][express-url]
- <a href="https://www.postgresql.org" target="_blank"><img src="https://www.postgresql.org/favicon.ico" alt="SocketIO" height="30"></a>
- <a href="https://socket.io/"><img src="https://camo.githubusercontent.com/3ba298842d34904ad3ae5b56d1c5e11bb745cd9b109073783dcbbd07883c01fd/68747470733a2f2f736f636b65742e696f2f696d616765732f6c6f676f2d6461726b2e737667" alt="SocketIO" height="30"></a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Clone the repo
   ```sh
   git clone https://github.com/furkansimw/SOCIAL_MEDIA_APP
   ```
2. Server for Install NPM Packages and normal start (npm run start) developement for (npm run dev)
   ```sh
   cd server && npm install && npm run start
   ```
3. Client for Install NPM Packages and Start

   ```sh
   cd client && npm install && npm run dev
   ```

4. Enter your System Environment Variables for server `server/.env`
   ```js
    DB_URL=***
    JWT_SECRET=***
    CLOUDINARY_CLOUD_NAME=***
    CLOUDINARY_API_KEY=***
    CLOUDINARY_API_SECRET=***
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

See the [open issues](https://github.com/furkansimw/SOCIAL_MEDIA_APP/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Furkan Şimşek - [Linkedin](https://www.linkedin.com/in/furkan-%C5%9Fim%C5%9Fek-215b33246/) - furkansimw@gmail.com

Project Link: [https://github.com/furkansimw/SOCIAL_MEDIA_APP](https://github.com/furkansimw/SOCIAL_MEDIA_APP)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

- [Choose an Open Source License](https://choosealicense.com)
- [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
- [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
- [Malven's Grid Cheatsheet](https://grid.malven.co/)
- [Img Shields](https://shields.io)
- [GitHub Pages](https://pages.github.com)
- [Font Awesome](https://fontawesome.com)
- [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/badge/contributors-0-green?style=for-the-badge
[contributors-url]: https://github.com/furkansimw/SOCIAL_MEDIA_APP/graphs/contributors
[forks-shield]: https://img.shields.io/badge/FORKS-0-blue?style=for-the-badge
[forks-url]: https://github.com/furkansimw/SOCIAL_MEDIA_APP/network/members
[stars-shield]: https://img.shields.io/badge/STARS-1-blue?style=for-the-badge
[stars-url]: https://github.com/furkansimw/SOCIAL_MEDIA_APP/stargazers
[issues-shield]: https://img.shields.io/badge/ISSUES-0-yellow?style=for-the-badge
[issues-url]: https://github.com/furkansimw/SOCIAL_MEDIA_APP/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/furkansimw/SOCIAL_MEDIA_APP/blob/master/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/furkan-%C5%9Fim%C5%9Fek-215b33246/
[product-screenshot]: images/screenshot.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[express]: https://expressjs.com/images/favicon.png
[express-url]: https://expressjs.com/
[node]: https://nodejs.org/static/images/favicons/favicon.png
[node-url]: https://nodejs.org
[postgre]: https://www.postgresql.org/favicon.ico
[postgre-url]: https://www.postgresql.org/
[socket]: https://camo.githubusercontent.com/3ba298842d34904ad3ae5b56d1c5e11bb745cd9b109073783dcbbd07883c01fd/68747470733a2f2f736f636b65742e696f2f696d616765732f6c6f676f2d6461726b2e737667
[socket-url]: https://socket.io/
[typescript]: https://camo.githubusercontent.com/b9e906aef319c32b64efb7b1713fed89c784ba17bc314e3320ce845b794be407/68747470733a2f2f7777772e747970657363726970746c616e672e6f72672f66617669636f6e2d33327833322e706e673f763d3839343461303561386236303138353564653131366338613536643362336165
[typescript-url]: https://www.typescriptlang.org/
