// import user model
const User = require('../../../models/user');
// import bcrypt to encrypt passwords
const bcrypt = require('bcrypt');
// to avoid attack config for bcrypt to set encryption level
const saltRounds = 10;

// import jsonweb token module to create token
const jwt = require('jsonwebtoken');

// controller action to register User by name,email and password and type sending success result
module.exports.register = async (req, res) => {
  try {
    // find if already present in db
    let user = await User.findOne({ email: req.body.email });

    // if new registration then storing user info
    if (!user) {
      const bcryptPassword = await bcrypt.hash(req.body.password, saltRounds);
      let newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: bcryptPassword,
        type: req.body.type,
      });

      // sending the success response message along with registered user info.
      return res.status(200).json({
        message: 'Registration Success!',
        success: true,
      });
    } else {
      // if present then sending that registered  user info
      return res.status(200).json({
        message: 'Already registered with us!',
        success: false,
      });
    }
  } catch (error) {
    // return error response on request failure
    console.log('***', err);
    return res.status(500).json({
      message: 'Internal Server Error',
      success: false,
    });
  }
};

// controller action to login registered user using email and password
module.exports.login = async (req, res) => {
  try {
    // find if present in db
    let user = await User.findOne({ email: req.body.email });

    // check if user does not exists or invalid credentials and sending appropriate response
    if (user) {
      console.log('user', user);
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        console.log('result:', result);
        if (result !== true) {
          return res.status(422).json({
            message: 'Invalid username or password',
            success: false,
          });
        } else {
          // removing sensitive info like password from newly created user object
          let newUserObj = user.toObject();
          delete newUserObj.password;
          // return success response with jwt token created from user's info.
          return res.status(200).json({
            message:
              'Sign in successful,here is your token,please keep it safe!',
            data: {
              token: jwt.sign(user.toJSON(), 'onlineclassroom', {
                expiresIn: '2300000',
              }),
              user: newUserObj,
            },
            success: true,
          });
        }
      });
    } else {
      return res.status(422).json({
        message: 'Invalid username or password',
        success: false,
      });
    }
  } catch (error) {
    // return error response on request failure
    console.log('***', err);
    return res.status(500).json({
      message: 'Internal Server Error',
      success: false,
    });
  }
};

// controller action to update name and  passwords stored in encrypted format
module.exports.updateCredentials = async function (req, res) {
  try {
    // to check if password and confirm pass matches

    if (req.body.id === req.user.id) {
      const bcryptPassword = await bcrypt.hash(req.body.password, saltRounds);

      await User.findByIdAndUpdate(
        req.body.id,
        {
          name: req.body.name,
          password: bcryptPassword,
        },
        (err, user) => {
          if (err) {
            return res.status(422).json({
              message: 'Invalid user',
              success: false,
            });
          }
          let userObj = user.toObject();
          delete userObj.password;

          return res.status(200).json({
            message: 'User updated!',
            data: {
              token: jwt.sign(user.toJSON(), 'onlineclassroom', {
                expiresIn: '2300000',
              }),
              user: userObj,
            },
            success: true,
          });
        }
      );
    } else {
      // return error response on request failure
      console.log('***', err);
      return res.status(401).json({
        message: 'Unauthorized',
        success: false,
      });
    }
  } catch (err) {
    // return error response on request failure
    console.log('***', err);
    return res.status(500).json({
      message: 'Internal Server Error',
      success: false,
    });
  }
};

module.exports.allStudents = async (req, res) => {
  try {
    let students = await User.find({
      type: 'student',
    }).sort('createdAt');

    return res.status(200).json({
      message: 'list of students',
      data: { students: students },
      success: true,
    });
  } catch (error) {
    // send error response on req fail
    console.log('***', err);
    return res.json(500, {
      message: 'Internal Server Error',
      success: false,
    });
  }
};
