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

- Database initialization
  - create config folder
    - set default.json, save cloud database URI
    - set db.js, implement connection
  - create model folder
    - set model(User.js)
      - design model structure
- API - Register user
  - `POST api/users`
    - public, no need auth
  - validate input (official documentation: [express-validator API](https://express-validator.github.io/docs/api/check)), such as below
  ```javascript
  router.post(
  '/',
  [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Email is invalid').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  ...
  ```
  - handle errors and send status code to client, such as below
  ```javascript
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  ```
  - check if user exists
    - get users gravatar by email
    - create user by request body
    - encrypt password
    ```javascript
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    ```
    - return jsonwebtoken
      - add customized token secrect key in config.js
      - secret key(in config.js) used to sign the token
    ```javascript
    const payload = {
        user: {
          id: user._id,
        },
      };
    jwt.sign(
      payload,
      config.get('jwtToken'),
      { expiresIn: 360000 },
      (error, token) => {
        if (error) throw error;
        res.json({ token });
      }
    );
    ```
  - send token json as response
- Middleware
  - create middelware folder
    - set auth.js, parse the token
      - get token from header
      - check if not token
      - verify token, such as below
      ```javascript
      const decoded = jwt.verify(token, config.get('jwtToken'));
      req.user = decoded.user;
      next();
      ```
- API - Get auth user
  - `GET api/auth`
    - private, need auth
    - findById().select()
      - use select() because we don't need to show user's password
  - send user json as response
- API - Login user
  - `POST api/auth`
    - public, no need auth
  - almost simmilar to Register API, but we only focus on email and password
  - send token json as response

## Profile API Routes<a name="anchor_3"></a>

- Database operations
  - goto model folder
    - set model(Profile.js)
      - join User model to Profile model, such as below
      ```javascript
      const ProfileSchema = new mongoose.Schema({
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user',
      },
      ...
      ```
- API - Get current user(me) profile
  - `GET api/profile/me`
    - private, need auth
      - after login/register we will have a valid token, then use it to get profile
  - we need auth as middleware to decode the token, such as below
  ```javascript
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
  - findOne().populate()
    - use populate() to get data from refer table(collection), here is User
  - send profile json as response
- API - Create/Update user profile by user(user id)
  - `POST api/profile`
    - private, need auth
  - check the user input
  - destructure request body, buld up profile object, build socialmedia object in profile object
  - findOne()
    - if successed to find it, update
    - if failed to find it, create
  - send profile json as response
- API - Get all profiles
  - `GET api/profile`
    - public, no need auth
  - find().populate()
  - send profiles json as response
- API - Get profile by user(user id)
  - `GET api/profile/user/:user_id`
    - public, no need auth
  - findOne().populate()
  - send profile json as response
- API - Delete profile, user & posts
  - `DELETE api/profile/user/:user_id`
    - private, need auth
  - findOneAndRemove() for both profile and user
  - send {msg: 'User deleted' } json as response
- API - Add profile experience
  - `PUT api/profile/experience`
    - private, need auth
  - handle the PUT request, such as below
    ```javascript
    const profile = await Profile.findOne({ user: req.user.id });
    profile.experience.unshift(newExperience);
    await profile.save();
    ...
    ```
  - send profile json as response
- API - Delete experience from profile
  > `DELETE api/profile/experience/experience_id`
    >> private, need auth
  - findOne(), map(), look for remove index, such as below
    ```javascript
    // Get remove index
    const removeIndex = profile.experience.map((item) => {
      return item.id === req.params.experience_id ? item.id : null;
    });
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    ```
  - send profile json as response
- API - Add profile education
  > `PUT api/profile/education`
  >> private, need auth
  - findOne(), unshift()
  - send profile json as response
- API - Delete education from profile
  > `DELETE api/profile/education/education_id`
  >> private, need auth
  - findOne(), map(), look for remove index
  - send profile json as response
- API - 

## Redux For Beginners<a name="anchor_999"></a>

More details need to access this video: [Redux For Beginners | React Redux Tutorial](https://www.youtube.com/watch?v=CVpUuw9XSjY)
