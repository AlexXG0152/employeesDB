<div align="center">

  <img src="assets/logo_large.png" alt="logo" width="200" height="auto" />
  <h1>Awesome template CRM for HR management </h1>
  
  <p>
    <a href="https://employeesdbf.onrender.com/home" target="_blank">An awesome README template for your projects! [working example]</a>
    <p>testUser / testUser</p>
  </p>
  
<!-- Badges -->
<p>
  <a href="">
    <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="" />
  </a>
  <a href="">
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="" />
  </a>
  <a href="">
    <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="" />
  </a>
  <a href="">
    <img src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="" />
  </a>
  <a href="">
    <img src="https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white" alt="" />
  </a>
  <a href="">
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="" />
  </a>
</p>
   
<h4>
    <a href="https://github.com/AlexXG0152/employeesDB/">View Demo</a>
  <span> · </span>
    <a href="https://github.com/AlexXG0152/employeesDB">Documentation</a>
  <span> · </span>
    <a href="https://github.com/AlexXG0152/employeesDB/issues/">Report Bug</a>
  <span> · </span>
    <a href="https://github.com/AlexXG0152/employeesDB/issues/">Request Feature</a>
  </h4>
</div>

<br />

<!-- Table of Contents -->

# :notebook_with_decorative_cover: Table of Contents

- [About the Project](#star2-about-the-project)
  - [Screenshots](#camera-screenshots)
  - [Tech Stack](#space_invader-tech-stack)
  - [Features](#dart-features)
  - [Color Reference](#art-color-reference)
  - [Environment Variables](#key-environment-variables)
- [Getting Started](#toolbox-getting-started)
  - [Prerequisites](#bangbang-prerequisites)
  - [Installation](#gear-installation)
  - [Running Tests](#test_tube-running-tests)
  - [Run Locally](#running-run-locally)
  - [Deployment](#triangular_flag_on_post-deployment)
- [Usage](#eyes-usage)
- [Roadmap](#compass-roadmap)
- [Contributing](#wave-contributing)
  - [Code of Conduct](#scroll-code-of-conduct)
- [FAQ](#grey_question-faq)
- [License](#warning-license)
- [Contact](#handshake-contact)
- [Acknowledgements](#gem-acknowledgements)

<!-- About the Project -->

## :star2: About the Project

Это домашний проект, который я придумал для себя после окончания курсов по JavaScript и Angular, чтобы закрепить знания, полученные на курсах и от наставника.
У меня на работе был целый зоопарк )) систем (4 различные системы, написанные на чем-то в МСДОС, ФоксПро и Дельфи, С#) в которых нам приходилось работать с данными о персонале. По мере нарастания требований систем становилось все больше, интегрировать их в одну пока не поздно желающих не было, разработчики сидели в ожидании ЦРМ от 1С (как показала практика - напрасно).
По мере развития определенных событий в Беларуси в 2020 году я прошел курс обучения в RSSschool по JavaScript и Angular. И вот в 2022 году после окончания курса и еще кое-каких событий у меня стало больше времени, и после небольшого отдыха я решил укрепить свои знания в JavaScript, TypeScript, NodeJS и Angular и сделать CRM для управления персоналом на указанном стекетехнологий, такой, которая была бы удобна мне на моем прошлом месте работы, объединяющей все 4 системы в одной.
И сервер и клиент написаны мной самостоятельно, на основе уроков и статей из Интернета.
Проект далек от совершенства, так как восстанавливать все типы хранящейся информации в шаблонах я не стал, исходя из той логики, что если я смог сделать CRUD для данных о работнике, его семье и образовании, то сделать любой другой аналогичный функционал для другого набора данных я смогу.  
Само собой, это останется моим домашним проектом на который у меня будет больше времени для практики и закрепления знаний пока я не найду работу разработчика, и меньше времени после того, как я ее найду, так как я собираюсь вложить все силы в свое обучение этой новой и увлекающей меня работе.

<!-- Screenshots -->

### :camera: Screenshots

<div align="center"> 
    <img src="https://github.com/AlexXG0152/employeesDB/blob/develop/client/src/assets/Employees%20-%209%20January%202023.gif" width="800" alt="screenshot" />

</div>

<!-- TechStack -->

### :space_invader: Tech Stack

<details>
  <summary>Client</summary>
  <div>
Повторюсь, в связи с тем, что проект задуман и сделан для обучения, поэтому использованы Angular Material и Bootstrap. На боевых коммерческих проектах скорее всего так не делается, но мне нужно учиться, поэтому использовал обе библиотеки.
  </div>
  <ul>
    <li><a href="https://www.typescriptlang.org/">Typescript</a></li>
    <li><a href="https://angular.io/">Angular</a></li>
    <li><a href="https://getbootstrap.com/">Bootstrap</a></li>
    <li><a href="https://material.angular.io/">Angular Material</a></li>
  </ul>
</details>

<details>
  <summary>Server</summary>
  <ul>
    <li><a href="https://www.javascript.com/">JavaScript</a></li>
    <li><a href="https://nodejs.org/en/">Node.js</a></li>
    <li><a href="https://expressjs.com/">Express.js</a></li>
    <li><a href="https://mongoosejs.com/">Mongoose</a></li>
    <li><a href="https://github.com/expressjs/morgan#readme">Morgan</a></li>
    <li><a href="https://github.com/winstonjs/winston#readme">Winston</a></li>
    <li><a href="https://github.com/guigrpa/docx-templates#readme">Docx-templates</a></li>
  </ul>
</details>

<details>
<summary>Database</summary>
  <ul>
    <li><a href="https://www.mongodb.com/">MongoDB</a></li>
    <li><a href="https://github.com/expressjs/multer#readme">Multer</a></li>    
  </ul>
</details>

<details>
<summary>DevOps</summary>
  <ul>
    <li><a href="https://www.docker.com/">Docker</a></li>
    <li><a href="https://www.jenkins.io/">Jenkins</a></li>
  </ul>
</details>

<!-- Features -->

### :dart: Features

- Feature 1
- Feature 2
- Feature 3

<!-- Color Reference -->

### :art: Color Reference

| Color           | Hex                                                              |
| --------------- | ---------------------------------------------------------------- |
| Primary Color   | ![#222831](https://via.placeholder.com/10/222831?text=+) #222831 |
| Secondary Color | ![#393E46](https://via.placeholder.com/10/393E46?text=+) #393E46 |
| Accent Color    | ![#00ADB5](https://via.placeholder.com/10/00ADB5?text=+) #00ADB5 |
| Text Color      | ![#EEEEEE](https://via.placeholder.com/10/EEEEEE?text=+) #EEEEEE |

<!-- Env Variables -->

### :key: Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`API_KEY`

`ANOTHER_API_KEY`

<!-- Getting Started -->

## :toolbox: Getting Started

<!-- Prerequisites -->

### :bangbang: Prerequisites

This project uses Yarn as package manager

```bash
 npm install --global yarn
```

<!-- Installation -->

### :gear: Installation

Install my-project with npm

```bash
  yarn install my-project
  cd my-project
```

<!-- Running Tests -->

### :test_tube: Running Tests

To run tests, run the following command

```bash
  yarn test test
```

<!-- Run Locally -->

### :running: Run Locally

Clone the project

```bash
  git clone https://github.com/AlexXG0152/employeesDB.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  yarn install
```

Start the server

```bash
  yarn start
```

<!-- Deployment -->

### :triangular_flag_on_post: Deployment

To deploy this project run

```bash
  yarn deploy
```

<!-- Usage -->

## :eyes: Usage

Use this space to tell a little more about your project and how it can be used. Show additional screenshots, code samples, demos or link to other resources.

```javascript

```

<!-- Roadmap -->

## :compass: Roadmap

- [x] Todo 1
- [ ] Todo 2

<!-- Contributing -->

## :wave: Contributing

<a href="https://github.com/AlexXG0152/employeesDB/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=AlexXG0152/employeesDB" />
</a>

Contributions are always welcome!

See `contributing.md` for ways to get started.

<!-- Code of Conduct -->

### :scroll: Code of Conduct

Please read the [Code of Conduct](https://github.com/AlexXG0152/employeesDB/blob/master/CODE_OF_CONDUCT.md)

<!-- FAQ -->

## :grey_question: FAQ

- Question 1

  - Answer 1

- Question 2

  - Answer 2

<!-- License -->

## :warning: License

Distributed under the no License. See LICENSE.txt for more information.

<!-- Contact -->

## :handshake: Contact

Связь с помощью PR в этот проект или по электронной почте 😉

Project Link: [https://github.com/AlexXG0152/employeesDB](https://github.com/AlexXG0152/employeesDB)

<!-- Acknowledgments -->

## :gem: Acknowledgements

Use this section to mention useful resources and libraries that you have used in your projects.

- [Shields.io](https://shields.io/)
- [Awesome README](https://github.com/matiassingers/awesome-readme)
- [Emoji Cheat Sheet](https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md#travel--places)
- [Readme Template](https://github.com/othneildrew/Best-README-Template)
