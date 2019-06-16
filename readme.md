# Express Coding Challenge

Here you will find my solution for the 'express-coding-challenge'.

I used `mongoose` to interface with a running instance of `mongodb` and have a file `db/initial_db.js` which creates 3 institutions along with 5 books upon app startup. In order to create a new user, the client will need to ensure that the user's email domain belongs to one of these 3 institutions.

I've added an additional `GET /users/logout` endpoint to end the current user's session.

## Set up

1. Clone this repository

2. Ensure `mongodb` is running locally

3. Create .env file within project root containing a `DB_CONN` property referencing your mongodb connection string, for example:

DB_CONN='mongodb://admin:admin123@localhost/bibliotech'

4. Run `npm install` and `npm start`

5. For tests, run `npm test` or `npm run coverage` to see nyc coverage

6. Please see `postman_collection.json` for handy requests
