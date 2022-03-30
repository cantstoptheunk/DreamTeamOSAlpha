# DreamTeamOSAlpha Backend

## How to Run:
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

**Step 1:**
`npm install` - Install the required packages\
**Step 2:**
`npm run build` - Make sure the project builds locally\
**Step 3:**
`docker-compose up` - Start the backend service, feel free to add `--build` when changes are made\
**Step 4:**
At this point your docker container should be booted and everything should be ready to go once you see the message `Running on port 8080`. Try hitting `http://localhost:8080/stocks` and see what happens!
