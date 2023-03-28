# SPA

Contains a Login-Signup Page which is run by Node.js and Express.js. Authentication is done either by username/pass stored in a MongoDB database, or via Google OAuth.

Google OAuth is connected using passport.js and a middleware is initiated through express-session manager to persists cookies and session information.

Finally the HomePage dispalys an image based on NASA's apod image of the day. It fetches an API from the same and updates on the webpage.
