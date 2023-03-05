# Introduction

## What is this?

This is an express-based REST API that acts as a management system for Gemilang Synergy's product.

## Brief list of ENV Variables

| Variable          | Description                                                       |
| ----------------- | ----------------------------------------------------------------- |
| `CORS_DOMAIN`     | domain that will be use to bypass the cors (only 1 at the moment) |
|                   | example: `localhost`                                              |
| `JWT_PRIVATE_KEY` | JWT private key to sign the JWT token                             |
|                   | example: `privateKey`                                             |
| `JWT_DURATION`    | Expire duration for JWT token                                     |
|                   | example: `86400000` (for 24 hours)                                |
| `JWT_SALT`        | Random 128 char string which is inserted manually                 |
| `JWT_SECRET`      | JWT secret key                                                    |
|                   | example: `secretKey`                                              |
| `COOKIE_DOMAIN`   | Domain to set cookie                                              |
|                   | example: `domain.com`                                             |
| `MONGO_URI`       | MongoDB connection URI                                            |
| `MONGO_DATABASE`  | MongoDB Database name to communicate                              |

Note: We use system environment directly instead of .env file. Nodejs has capability to get system environment variable and installing 'dotenv' package will increase app size

## How to run?

### Project Setup

- Install Node.js and npm
- Run `npm install`

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
