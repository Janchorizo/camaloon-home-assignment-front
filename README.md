## camaloon-home-assignment-front

[![Unit tests](https://github.com/Janchorizo/camaloon-home-assignment-front/actions/workflows/unit-tests.yml/badge.svg)](https://github.com/Janchorizo/camaloon-home-assignment-front/actions/workflows/unit-tests.yml)

[![Netlify Status](https://api.netlify.com/api/v1/badges/2c9b9a3a-2fd4-40be-9521-6b82a9634bfa/deploy-status)](https://app.netlify.com/sites/camaloon-home-assignment/deploys)

Repository for the web application implemented for the job application at
[Camaloon](https://camaloon.com/).

It is a node application with [React](https://reactjs.org/) as the framework,
and transpiled using Webpack.

### Using the app
#### Locally
_Install Node.JS and Yarn (the later is optional but recommended)._

Clone the repo into the desired work directory:

`git clone git@github.com:Janchorizo/camaloon-home-assignment-front.git`

Install the dependencies using your preferred package manager:

`npm install` | `yarn install`

Execute the tests:

`npm run test` | `yarn test`

Run the development server with `npm run dev` | `yarn dev`, or alternatively
transpile the code using `npm run build` | `yarn build` (the app will be placed
in the dist folder).

#### Online
The app is being deployed using [Netlify](https://www.netlify.com/) from the
master branch. You can access it at [https://camaloon-home-assignment.netlify.app/](https://camaloon-home-assignment.netlify.app/).

### Collaborating
If you want to collaborate in the project, feel free to clone the repo and create
a pull request. Github will show a link to the deployed test environment so you
can checkout the result.

I will look through the code and decide if it should be integrated :)
