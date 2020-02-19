# mock-premier-league-backend-nodejs

Mock Premier League is an app that mocks the English Premier League teams and matches.

### Required Features

1. User can sign up.
2. User can login.
3. User (admin) can create a team.
4. User (admin) can delete a team.
5. User (admin) can update a team.
6. User (admin) can view a team.
7. User (admin) can create a fixture.
8. User (admin) can delete a fixture.
9. User (admin) can update a fixture.
10. User (admin) can view a fixture.
11. Users can view teams.
12. Users can view completed fixtures.
13. Users can view pending fixtures.
14. Users can robustly search fixtures/teams.

### Technologies

- [NodeJS](https://nodejs.org) A run time environment based off Chrome's v8 Engines for writing Javascript server-side applications.

- [Express](https://expressjs.com) Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
  
- [ES Lint](https://eslint.org) A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript. Maintain your code quality with ease.
  
- [Postgresql](postgresql.org)  A free and open-source relational database management system emphasizing extensibility and technical standards compliance.

### Tools

- [Postman](https://getpostman.com) Postman is the only complete API development environment, and flexibly integrates with the software development cycle.

- [Heroku](https://heroku.com) is a platform as a service (PaaS) that enables developers to build, run, and operate applications entirely in the cloud.

- [ElephantSQL](https://elephantsql.com) is a PostgreSQL database hosting service.

### Installations

##### Getting Started

- You need to have [node](https://nodejs.org) installed on your system
  
##### Clone

- To clone this repo, you need to open a command line terminal and run : `git clone https://github.com/ikeshegs/mock-premier-league-backend-nodejs.git`

##### Install

- Install all dependencies used in this project by running `npm install`

- Set the following environment variables in your .env file:

  - DB_URL - The URL to your database
  - JWT_SECRET - A random string used for generation authorization tokens.
  - CALL_PER_MINUTE - This specifies the number of calls made to your APIs from the same IP address before blocking access.

### Starting the server

- Run `npm run start-dev`

### Author

- Ikechukwu Okoro
