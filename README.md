# Template Bidirectional API

This server provides a Template Bidirectional API, using Eradani Connect to access the required IBM i resources and to provide access to external APIs for IBM i programs.

## Features

This application is a production-ready TypeScript/Express webserver preconfigured with several helpful programming tools:

- [TypeScript](#typescript)
- [Automatic Code Formatting with Prettier](#automatic-code-formatting-with-prettier)
- [Code Linting with ESLint](#code-linting-with-eslint)
- [Automatic Documentation with TypeDoc](#automatic-documentation-with-typedoc)
- [Automated Testing with Mocha and Chai](#automated-testing-with-mocha-and-chai)
- [Process Management with PM2](#process-management-with-pm2)
- [Development Management Scripts](#development-management-scripts)
- [Over 520 Authentication Methods](#over-520-authentication-methods)
- [Automatic Swagger Documentation](#automatic-swagger-documentation)
- [Runtime Performance Dashboard](#runtime-performance-dashboard)

### TypeScript

JavaScript is a loosely-typed programming language. That means that there are no compile-time restrictions on data types whatsoever. On small projects, this is a powerful asset in JavaScript's corner; developers are able to save the significant amounts of time required to develop and synchronize the data types used throughout their applications. However, on larger projects this can become an issue, as one developer has no assurances that they are using another developer's code interfaces correctly. As a result, hard-to-find bugs often arise in normal JavaScript applications.

TypeScript is a superset of JavaScript which encompases all of the features of normal JavaScript but also provides strict compile-time type-checking. When developers incorrectly configure a data structure in TypeScript, a compilation error is generated before the code is run.

You can run the TypeScript compiler using the `npm run build:dev` or `npm run build:release` commands.

### Automatic Code Formatting with Prettier

On larger teams, it is valuable to have all code in an application written using the same style standards. This helps developers easily read each other's code, since they all code in the same style.

Prettier is an automatic code formatting tool. Before a developer's code is compiled, Prettier will process the code and format it based on the standards set in your project's `.prettierrc` file. This means that developers can code in their own styles, and the entire codebase will still be automatically transformed to meet the style guidelines you set!

You can run Prettier using the `npm run format` command.

### Code Linting with ESLint

In the same vein as Prettier, ESLint helps ensure more detailed coding standards are met by developers on your team.

ESLint is the industry-standard among JavaScript developers for code-linting. Before the code is compiled, ESLint will check to make sure the new code conforms to the standards you configure in the project's `.eslintrc.js` file. If any standards are violated, a compilation error will be generated and the build process will be stopped. ESLint is included alongside Prettier because it provides more detailed checking options.

You can run ESLint using the `npm run lint` command.

### Automatic Documentation with TypeDoc

When a developer needs to work with a part of the application they didn't build, a centralized documentation system is extremely valuable. Instead of having to ask another developer how their code works or read the source code, the relevant information is presented in an easily-digestible web-based format.

TypeDoc will take your TypeScript source code and automatically generate web documentation for your entire application based only on source code and comments. To add additional notes to the documentation, you can add standard JSDoc comments to your code, and they will be parsed and included in the generated documentation pages.

You can run TypeDoc using the `npm run docs` command.
You can then view your generated docs using the `npm run view-docs` command.

### Automated Testing with Mocha and Chai

As an application grows, manual testing can become extremely inefficient, especially for quickly-changing applications. Adding automated tests will help your team focus on development, rather than having to retest the entire application every time they make a change.

Mocha is the most popular automated testing framework for Node.js applications. It allows you to quickly define test cases, setup, and teardown, all in JavaScript. Chai is an extremely english-like assertion library built for Mocha. It allows you to check test case outputs with code like `expect(result).to.be.a('number')` so you can read, write, and reason about test cases very quickly.

You can run your testing suite using the `npm run test` command.

### Process Management with PM2

While Node.js applications can be run using the `node` command, there are a few problems here when your applicatino goes into production. First, what happens if your Node.js application fails? The `node` command will simply exit and leave it down. Second, the `node` command only creates one instance of your Node.js application, which is far from the most efficient way to run a Node.js application.

PM2 is a process manager for Node.js applications. PM2's features include automatically restarting your Node.js application on failure, and simple integration with Node.js's `cluster` mode. In Node.js, your business logic is run in a single thread. When you run your application in `cluster` mode via PM2, your Node.js application will be replicated once for each CPU core on your machine. PM2 will also automatically load-balance between these processes, ensuring you get maximum performance out of your Node.js application. This project comes pre-configured with a PM2 configuration file so that you can run your application in cluster mode easily with `pm2 start`.

You can start the application using the `npm run start` command.

### Development Management Scripts

As you develop your Node.js application, it is important that your build process and integration pipeline are followed by developers. That is, when code is developed, it should be formatted, linted, compiled, tested, and documented. These steps can be difficult to manage manually, so this application comes with several development scripts to help your team.

These scripts are configured in the `package.json` file. The most important script is the `package:dev` script, run in your terminal with `npm run package:dev`. This script runs through the entire series of scripts in the pipeline so that your developers can focus on developing code, and automate the rest. Check out the `scripts` section of the `package.json` file to see the other available scripts!

The `npm run package:dev` command will run all of the scripts in the previous sections in sequence.

### Over 520 Authentication Methods

Setting up robust API Authentication and Authorization is a complex effort that is highly specialized to each particular use-case. For example, some APIs are for internal users who have a Single-Sign-On system or are using Google OAuth to authenticate. Some APIs are destined to be accessed by external users with API keys. Still others require public-key authentication, one-time codes, multifactor authentication, or JSON Web Token access.

This API application is designed to support whatever authentication mechanism is required for a particular project via its integration with [Passport.js](https://passportjs.org). That integration provides over 500 authentication methods, and we've added 20+ more IBM i-specific methods the open source community didn't already have.

### Automatic Swagger Documentation

This application comes packaged with a module that will generate Swagger (OpenAPI) documentation in both the v2 and v3 formats. 

These generated documents will be placed in the `oas` directory.

Since the generator must analyze your code and API calls, it comes with a hefty performance penalty. As a result, it is disabled by default.

You can enable the generator by switching the configuration value at `swagger.generate` to `true` and restarting your application. Once your server is running, call each of your APIs with a range of inputs to provide the generator with sample inputs and outputs from the real APIs. The generator will record this information and save it to the specs in the `oas` directory every 10 seconds. **When you are done, please give the generator at least 10 seconds to write the swagger documents before you shut down the server.**

Once the docs have been generated, you will be able to access the system's embedded Swagger UI API Explorer by navigating to [http://your.server.url/dashboard/docs](http://your.server.url/dashboard/docs) in a web browser.

### Runtime Performance Dashboard

This application also comes packaged with a performance dashboard that is fed by your Swagger definitions. **Note that the performance dashboard is only accessible if you have a Swagger spec in the `oas` directory!**

This dashboard shows various performance metrics and is accessible at [http://your.server.url/dashboard/stats](http://your.server.url/dashboard/stats) by default.

## Installing the Eradani Connect Client (Outbound)

### Initial Setup

#### 1. Remove existing libraries

If a previous version of *Eradani Connect Client* was installed, delete the `ECNCT` library provided the *Eradani Connect Server* is not installed on the same machine. If the server is installed you will have to either manually delete the previous versions of the *Eradani Connect Client* objects or delete the whole library and recreate the server's objects.

If a previous version of the *Eradani Connect Client Template* was installed, delete the `ECNCTAPP` library.

#### 2. Install JavaScript dependencies

`cd` to the extracted `ecc-template-x.x.x` directory and run `npm install`.

#### 3.  Create JavaScript config file

Configuration is based on the popular `config` open source module. A full guide on configuration using this module can be found here: [https://github.com/lorenwest/node-config/wiki](https://github.com/lorenwest/node-config/wiki)

Create the `development.json` configuration file to override default configuration options. The only required override are the `weather.apikey` and `traffic.apikey` fields. Demo API keys can be obtained at, https://openweathermap.org/api and https://www.shipengine.com/. To add the API keys and override other default options add a configure like this in `development.json`:

```json
{
  "weather": {
    "apikey": "00000000000000000000000000000000"
  },
  "traffic": {
      "apiKey": "0000000000000000000000000000000000000000000"
  },
  "ecclient": {
    "appLibrary": "ECNCTAPP",
    "debug": true,
    "pooling": false
  }
}
```

The full list of options can be found in `src/config/default.json`.

#### 4. Create the logs directory

`mkdir logs`

#### 5. Create the IBM i objects

```shell
make -C node_modules/\@eradani-inc/ec-client/native library
make -C node_modules/\@eradani-inc/ec-client/native
make -C qsys library
liblist -a ecnct
liblist -a ecnctapp
make -C qsys
```

#### 6. Create DTAQs and DTAARAs

```
ADDLIBLE ECNCT
ADDLIBLE ECNCTAPP
ECCCRTDTAQ LIB(ECNCTAPP)
```

### Running the sample programs

To run the sample applications perform the following steps:

#### 1. Start the node.js server

Using your ssh client, `cd` to the extracted `ecc-template-x.x.x` directory and run:

```shell
node src/server
```

#### 2. Add the library

Add the sample application's library to your library list:

```
ADDLIBLE ECNCT
ADDLIBLE ECNCTAPP
```

#### 3. Run the sample commands

The template comes with sample commands and RPG programs to demonstrate how to call web services using *Eradani Connect*. The following is a list of commands in the `ECNCTAPP` library:

- `DSPJK`: This command will make a call to the *Internet Chuck Norris Database (ICNDB)*, https://api.icndb.com, and retrieve a random Chuck Norris joke.
- `DSPTRFC`: This command will make make a call to a traffic report web service, https://traffic.ls.hereapi.com, and retrieve the current traffic conditions.
- `DSPVHCL`: This command will make a call to the U.S. Department of Transportation's *NHTSA Product Information Catalog and Vehicle Listing*, https://vpic.nhtsa.dot.gov/api, to retrieve information based on a vehicle identification number.
- `DSPWF`: This command will make a call to the *Open Weather* web service, https://api.openweathermap.org/data/2.5/, and retrieve a weather forecast based on a latitude and longitude.
- `PRTLBL`: This command will make a call to the *ShipEngine* web service, https://api.shipengine.com/v1, and download a PDF of a USPS shipping label based on an address and weight and size information.

Run `WRKSPLF` to view the output of the RPG programs.

Each of the commands above invokes an RPG program of the same name in the `ECNCTAPP` library.

## Configuration

As a general rule, configuration files for open source applications are not added to the git repository because they may contain sensitive configuration data such as user profiles or API keys. The `src/config/default.json` file is included in the git repository and has the structure expected by the application so that you can simply fill in the values you need. As you develop, a good rule of thumb is to add non-sensitive data into the `src/config/default.json` file so that those configuration values will be tracked by git.

To set up the server, there are a few configuration values we need to set. Open your new `src/config/development.json` file 

- Set app.port to an available port
- Set the xml.* options to match those of the XMLSERVICE instance you will be using
- Set the logger.maxLoggingLevel option to your desired level of logging. Available levels are listed below in order of increasing severity. Once you set a logging level, **all levels below it in this list will also be enabled!** For example, if you set the logging level to _"info"_, the server will also store _"warn"_ and _"error"_ level logs, but not _"verbose"_, _"debug"_, or _"silly"_ level logs.
    - "silly"
    - "debug"
    - "verbose"
    - "info"
    - "warn"
    - "error"

## Updating the server application

Once you have committed and pushed your updated code to GitHub, there are 4 steps you will need to take to update the live application:

1. Download the updated code on to your IBM i
2. Make any required configuration changes
3. Compile the TypeScript code to executable JavaScript
4. Restart the application to apply the changes

### Downloading the updated code

By default, this application is set up to use Git to ship source code to the server. However, any deployment method is acceptable - the important part is that the TypeScript code on the IBM i gets updated with your changes. This guide will show you how to do this using Git.

First, open an SSH session (PuTTY) into the PASE environment on your IBM i.

Once there, move to the directory where the application source code resides:
```sh
$ cd /opt/eradani/eradani-connect-template
```

Then, tell Git to pull down the latest code from the cloud-hosted repository:
```sh
$ git pull
```

This command may ask you for your GitHub credentials.

Once the command finishes, the code on the server will be updated.

### Updating the application's configuration files

All of the application's configuration files are available on your IBM i at `/opt/eradani/eradani-connect-template/config`. By default, configuration files are automatically ignored by Git because they often include sensitive data such as API keys and passwords. So, if you have made changes to the configuration files in your development environment, you will also need to change them directly on the IBM i to make them match.

The main configuration file is `development.json`. You can edit it with the following command:
```sh
nano /opt/eradani-connect-template/src/config/development.json
```

Once you make your changes and save the file, you're done with this section!

### Compiling the TypeScript code

At the base level, all that needs to be done here is run the package script that came with the application. You can find this script in the `package.json` file under `package:dev` and `package:release`. It is up to you whether you would like to run `package:dev` or `package:release` to generate the executable JavaScript. Essentially, the difference is that `package:dev` will run much more quickly than `package:release` because `package:dev` writes over the previously generated JavaScript while `package:release` fully deletes the previous version before re-generating. `package:dev` also creates sourcemaps will make the application significantly easier to debug, but also increase the size of the generated JavaScript code. In general, we recommend running `package:dev` while your application is in development, and only running `package:release` on major version updates.

Run the package script:

```sh
$ npm run package:dev
```

-- OR --

```sh
$ npm run package:release
```

Once this command finishes, the JavaScript code will have been updated.

### Restarting the application

This application is managed by an open-source tool called PM2. PM2 is a Process Manager (PM) build specifically for Node.js, and provides a series of useful commands for managing the server. You can find a complete list [here](https://pm2.keymetrics.io/docs/usage/quick-start/#managing-processes).

To perform a zero-downtime reload of the application, use the following command:
```sh
$ pm2 reload eradani-connect-template
```

We recommend checking the application logs to make sure it restarts successfully. You can do that with the following command:
```sh
pm2 logs
```

If you see a message in the logs like "Server listening on Port XXXX", you're done!

Congratulations, your application is now updated!

## Final Notes

If you need any help managing or developing on this application, Eradani is here to help!

If you have a direct technical question about this application, you can reach out to Eradani Support directly at (510) 239-7331 or support@eradani.com.

Happy Coding!
