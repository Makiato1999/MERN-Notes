# MERN Stack Front To Back: Full Stack React, Redux & Node.js

_provided by Brad Traversy on Udemy platform_ <br><br>
<img height="50" src="https://user-images.githubusercontent.com/25181517/182884177-d48a8579-2cd0-447a-b9a6-ffc7cb02560e.png">
<img height="50" src="https://user-images.githubusercontent.com/25181517/183859966-a3462d8d-1bc7-4880-b353-e2cbed900ed6.png">
<img height="50" src="https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png">
<img height="50" src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png">
<br>
Since this is a complete full stack MERN project, the tabel of contents also presents the project development sequential process.

#### Table of Contents

1. [Express and MongoDB Setup](#anchor_1)<br/>
1. [User API Routes & JWT Authentication](#anchor_2)<br/>
1. [Profile API Routes](#anchor_3)<br/>
1. [Redux For Beginners](#anchor_999)<br/>

## Express and MongoDB Setup<a name="anchor_1"></a>

- MongoDB Atlas admin
  ```
  signin-email: jiexiaoranca@gmail.com
  Username: admin-shawn
  Password: shawn990610
  ```
- npm for initialization

  ```
  npm i express express-validator bcryptjs config gravatar jsonwebtoken mongoose request
  ```

  nodemon

  ```
  npm i -D nodemon concurrently
  ```

- modify package.json, we will put react and react&node scripts here later
  ```
  ...
  "scripts": {
      "start": "node server",
      "server": "nodemon server"
  },
  ...
  ```
  run server by `npm run server`
- set config folder for database connection
  - where i can put my databaseName
  ```
  mongodb+srv://admin-shawn:<password>@cluster0.whfip5e.mongodb.net/databaseName?retryWrites=true&w=majority
  ```
- set routes folder for all pages, update the routes in server
  - note: don't forget '/' before the route

## User API Routes & JWT Authentication<a name="anchor_2"></a>

- set config folder for db connection and default.json
- set model folder, initialize User model for database
- register
  - validation input in routes/api/users.js (official documentation: [express-validator API](https://express-validator.github.io/docs/api/check))
  - handle errors and send status code to client
  - check if user exists
  - get users gravatar by email
  - create user by request body
  - encrypt password
  - return jsonwebtoken by user id
- set middelware folder for auth.js to parse the token
  - get token from header
  - check if not token
  - verify token
- put auth as middleware and get the auth user
- login
  - almost simmilar to register, but we only focus on email and password, also, don't forget return token

## Profile API Routes<a name="anchor_3"></a>

- initialize Profile model, join User model to Profile model
- get current user profile (after login/register we will have a valid token, then use it to get profile)
  - we need auth as middleware to decode the token
  ```
  router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required').notEmpty(),
      check('skills', 'Skills is required').notEmpty(),
    ],
  ],
  async (req, res) => {...
  ```
  - find profile database
  ```
  const profile = await Profile.findOne({ user: req.user.id }).populate(
    'user',
    ['name', 'avatar']
  );
  ```
- update current user profile
  - check the post
  - destructure request body, buld up profile object, build socialmedia object in profile object
  - look for a profile by the user(user id)
    - if find it, update it
    - or create a new profile
- sss

## Redux For Beginners<a name="anchor_999"></a>

More details need to access this video: [Redux For Beginners | React Redux Tutorial](https://www.youtube.com/watch?v=CVpUuw9XSjY)
