# DreamTeamOSAlphaProject

## Frontend:

React, TypeScript, Material UI

## Backend:

Express, TypeScript, Sequelize, Postgres

## Devops:

Docker and Docker-Compose

## Third Party Services Used

**Alphavantage** `https://www.alphavantage.co/documentation/` and `https://www.alphavantage.co/premium/`\
**SendGrid** `https://app.sendgrid.com/`

## Why I chose this project

1. I wanted to showcase my fullstack ability:\
   **Frontend** By creating UI Components and using React Hooks\
   **Backend** Using Express for my backend and creating controllers and services\
   **DevOps** Using docker for a light microservice architecture\
   **General Ability** Ability to use other third party APIs and do some business logic with them (though was not able to do as much as I wanted)

2. It was related to stocks and finance which is a side-passion of mine.

3. It just seemed fun to build

## What I would do differently in a Production environment

1. I'd use the production builds for my containers and commands. Then have those containers running on the cloud using AWS or Firebase or Digital Ocean etc.
2. Also add a load balancer
3. Add Integration testing
4. Automated deployments
5. Add SSL for security between requests and responses
6. Using some kind of session token and authentication like JWT
7. Separate some of the backend services into their own containers as it grows

## ALSO NOTE:
Due to the limited API request usage from Alphavantage, data might not always show on the display page especially when it comes to picking multiple tickers with multiple data selection. The limit is 5 API requests per minute and 500 total API requests per day `https://www.alphavantage.co/premium/`. The UI will not crash nor break but it will not load any data where you might expect it to.

# Instructions
**Prerequisites:**
You must setup an .env file and place that file in the backend directory. The env variables names are listed and you should have values for\
`ALPHA_API_KEY`\
`EXPRESS_PORT`\
`PG_DATABASE`\
`PG_HOST`\
`PG_USER`\
`PG_DIALECT`\
`PG_PASSWORD`\
`PG_PORT`\
`SENDGRID_API_KEY`\
`EMAIL_ADDRESS`

## Backend

### How to Run:

**Step 1:**
`npm install` - Install the required packages\
**Step 2:**
`npm run build` - Make sure the project builds locally\
**Step 3:**
`docker-compose up` - Start the backend service, feel free to add `--build` when changes are made\
**Step 4:**
At this point your docker container should be booted and everything should be ready to go once you see the message `Running on port 8080`. Try hitting `http://localhost:8080/stocks` and see what happens!

## Frontend

### How to Run:

**Step 1:**
`npm install` - Install the required packages\
**Step 2:**
`npm run build` - Make sure the project builds locally\
**Step 3:**
`docker-compose up` - Start the frontend service, feel free to add `--build` when changes are made\
**Step 4:**
At this point your docker container should be booted and everything should be ready to go once you see the message `No issues found`. Go to `http://localhost:3000` to checkout the ugly basic interface!
