This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## End-to-End Testing

This documentation is designed for developers to build and test the
Pacifica Metadata Management tool. The processes for building a React
and NodeJS site must be followed prior to following the instructions
below.

### Development Environment Requirements

You should have the following available installed and available in your path.

 - node (>=10.16.0)
 - nginx
 - docker-ce
 - firefox
 - chrome
 - edge (windows only)

### Procedure for Setup

There are many services you need started and available for the
end-to-end testing to communicate correctly. If the following
commands do not give you your prompt back open up another shell.
You will have about six running processes if you are successful. 

#### Start Pacifica Metadata Service

The `npm` scripts run the Pacifica Metadata service through docker.
However, if you do not want to run docker you just need to have port
`8121` available on `localhost` to be listening with the Metadata
service.

 - Start the database `npm run e2e-metadb-start`
 - Start the service `npm run e2e-metadataserver-start`
 - Load the test data `npm run e2e-metadataserver-load`

#### Start Selenium Service

The `npm` scripts run the Selenium service locally though the node
package `selenium-standalone`. However, if you do not want to run
locally you need to have port `4444` available on `localhost` to be
a valid selenium server.

 - Install Selenium standalone `npm run e2e-selenium-install`
 - Start Selenium `npm run e2e-selenium-start`

#### Start Node Development Server

The standard approach to running the node development server applies.

 - Run Node `npm run start`

#### Start NGINX Server

The `npm` scripts to configure and start nginx are provided. This
service is required for the service to contact the metadata service
API. Check the configuration file before you start and verify file
paths exist that are referenced in the config.

 - Configure NGINX `npm run e2e-nginx-conf`
 - NOTE: Check the `travis/nginx.conf` and verify file paths
 - Start NGINX `npm run e2e-nginx-start`

#### Run the End-to-End Test

The `npm` scripts run selenium with `nightwatch` see that node
package for more details.

 - Run Tests `npm run e2e-firefox`
 - Run Tests `npm run e2e-chrome`
 - Run Tests `npm run e2e-edge`

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
