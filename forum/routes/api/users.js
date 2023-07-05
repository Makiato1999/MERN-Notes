const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/', [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Email is invalid').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({
        
    })
], (req, res)=>{
    console.log(req.body);
    res.send('User route');
});

module.exports = router;