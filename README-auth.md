# Eradani Connect JWT Authentication Module

## Introduction

The Eradani Connect JWT Authentication Module provides a simplified OAuth-like authenticatio mechanism for quick, secure API authentication on IBM i.

This guide includes instructions on how to set up the module and how to use it to secure your APIs.

## Setup

### Authorizing Users

To access the system, users need to go through an authentication process using the OAuth2.0 `client_credentials` flow, described in the "Usage" section of this guide. Here's how you can set up a new user:

1. Users must be added to the USERS table in the IBM i database.

2. The USERS table contains three columns:
   - **clientId:** This is the user's Client ID (username).
   - **clientSecret:** The Client Secret (password) for this user is stored as a bcrypt hash in the database.
   - **scope:** Users are assigned a space-separated list of allowed scopes. You may define whatever custom scopes you want. Note that the text of the scope in the database must match exactly with the text of the scope in your API configuration in order to be valid.

3. Use the provided script, `npm run generate-password`, with Node.js to generate a randomized client secret and its bcrypt hash. Give the plaintext secret to the user, and store the bcrypt hash in the database.

4. Add a record for the new user which includes a clientId of your choice, the bcrypt hash generated in step 3, and appropriate scopes as a space-separated list.

5. Once the user's record is added to the database, their credentials are immediately usable with the API.

> *Note: Due to the use of bcrypt hashes in the database, passwords cannot be retrieved once saved. If a user loses their password, a new one must be generated.*

## Usage

### Requiring Authentication and Scopes

Authentication and Authorization are handled by API plugins (middlewares) within Eradani Connect. These plugins can be attached to a single API endpoint or to a group of API endpoints based on a shared URL pattern. Plugins are attached in the API definition (index.ts).

There are two plugins that are important to understand to secure your APIs:
1. `requireAuth` - requires users to have a token to access a given API endpoint
2. `requireScope` - requires specific scopes to be present in the token to access the API endpoint

Attaching plugins to an API is easy - given the following unsecured API definition:
```ts
router.get(
    '/customers',
    validate(validators.getCustomers),
    respond((req: any) => sqlController.getCustomers(req.query))
);
```

We can add a token requirement by attaching the `requireAuth` plugin like so:
```ts
router.get(
    '/customers',
    requireAuth,
    validate(validators.getCustomers),
    respond((req: any) => sqlController.getCustomers(req.query))
);
```

From there, we can require the `billing` and `admin` scopes to both be present in the token by attaching the `requireScope` plugin like so:
```ts
router.get(
    '/customers',
    requireAuth,
    requireScope(['billing', 'admin']),
    validate(validators.getCustomers),
    respond((req: any) => sqlController.getCustomers(req.query))
);
```

Once this API is recompiled and re-run, users will need a valid JWT issued by the system and will have to have the `billing` and `admin` scopes granted to them in order to access this endpoint.

### Authenticating via the API

To authenticate via the API, follow these steps:

1. The API uses OAuth2.0 client_credentials authorization flow.

2. Start by calling the `POST /auth` endpoint and provide your clientId and clientSecret to retrieve a token in the following JSON format:

   ```json
   {
       "clientid": "abc123",
       "clientsecret": "xxxxxxxxxxxxxxxxxxx"
   }
   ```

3. Then, use the token to call the actual API endpoint you want to call. Attach your token from step 3 in the `Authorization` header of your request with the value `Bearer <token>` (Bearer scheme). 
   
4. If your token is valid, the system will run the requested operation. Otherwise, you will receive an HTTP 401 or 403 response code indicating that you are not authorized to perform your requested action.

## Maintenance

For general system operation details, refer to your Eradani Next-Gen Application Administration Guide. To stay updated and inquire about system changes, contact Eradani Support through eradani.com by clicking the green button at the bottom of the page to submit a support ticket. We will get back to you as soon as possible.
