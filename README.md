# ESS Requests

This application streamlines the process of creating training and exam requests for Esri Support Services employees. The form extrapolates some of the required information such as who to send it to and which charge code and cost center to use. Once it is submitted it sends an email. If the email is not sent automatically, a template will be generated and opened in the user's default email app. It also logs the request to a CSV so that the administrator has easy access for reports.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

The ``flowUrl`` variable in ``email.config.js`` will need to be added. If you don't have access to the current Flow, [this blog](https://flow.microsoft.com/fr-fr/blog/call-flow-restapi/) will help with creating a new one.

First, install the node modules:

```bash
npm install
```

For development, run the development server:

```bash
npm run dev
```

You can also build and run the application:

```bash
npm run build
npm start
```

To start the app for production with https use:

```bash
npm run prod
```
Check the Product Deployment section below for configuring https.

## Developer Notes

Since I used Next, the client routes are taken care of in the `/pages` directory, and the api routes are in `/pages/api`. The React components are in the `/components` directory, and there are a few modules with exported functions in `/utils`. The CSVs are saved to `/data`. If there is no CSV it will create one. Otherwise, if the headers match, it will append the new request information to the existing CSV. For more specific information check out `/docs/index.html`. This branch uses [Microsoft Flow](https://us.flow.microsoft.com/en-us/) to send the email automatically.  If Flow doesn't work, an email template will be provided for the user to send it themselves. The ``main`` branch uses [nodemailer](https://nodemailer.com/about/).

### Production Deployment

The production server hosts this application on the `requests` sub directory. In order to deploy to that server you will need to change the `assetPrefix` and `basePath` settings in `next.config.js` to `'/requests/'`. I am also not including the prod server certs in this repo so you will need to generate those as well. Make sure to uncomment the https configuration in `server.js` and generate CA certificates before deploying.

### Tooling

There is further documentation using JSDoc in the `docs` directory which can be regenerated by running:

```bash
npm run doc
```

I used ESLint for this project and included some VSCode settings to lint on save. You can lint your code with:

```bash
npm run lint
```

or to fix use:

```bash
npm run lint:fix
```

I also added some Jest test suites that you can run to make sure everything is still working:

```bash
npm run test
```

## Built With

- [NextJS](https://nextjs.org/) - SSR Framework
- [Bootstrap](https://getbootstrap.com/) - UI Kit
- [Jest](https://jestjs.io/) - Test Framework
- [Testing Library](https://testing-library.com/) React Test Utilities
- [ESLint](https://eslint.org/) - Code Linting
- [JSDoc](https://jsdoc.app/) - Documentation Generator
-  ... and more (see `package.json`)
