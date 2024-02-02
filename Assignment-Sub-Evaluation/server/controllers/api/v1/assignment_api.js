// import assignment model
const Assignment = require('../../../models/assignment');
// import user model
const User = require('../../../models/user');
const multer = require('multer');
const path = require('path');
module.exports.createAssignment = async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    console.log('dfdsfs', req.body);

    if (user && user.type === 'teacher') {
      let assign = await Assignment.create({
        title: req.body.title,
        description: req.body.description,
        owner: req.body.id,
      });
      console.log('assign bangaya', assign);
      await user.assignment.push(assign);
      await user.save();
      return res.status(200).json({
        message: 'assignment created!',
        success: true,
      });
    } else {
      return res.status(401).json({
        message: 'Invalid Request',
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
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  },
});
let upload = multer({ storage: storage }).single('file');
module.exports.submitAssignment = async (req, res) => {
  try {
    let user = await User.findById(req.user._id);

    if (user && user.type === 'student') {
      upload(req, res, function (err) {
        if (err) {
          return res.status(500).json(err);
        }

        const reqObj = JSON.parse(JSON.stringify(req.body));
        console.log('reqObj', reqObj.aid);

        let assignment = Assignment.findById(
          reqObj.aid,
          function (err, assign) {
            console.log('assignment********', assign);
            if (req.file && assign) {
              assign.students.push({
                id: req.user._id,
                status: 'submitted',
                upload: '/public' + '/' + req.file.filename,
              });
              assign.save();
              return res.status(200).json({
                message: 'assignment submitted!',
                success: true,
              });
            } else {
              return res.status(401).json({
                message: 'Invalid Request',
                success: false,
              });
            }
          }
        );
      });
    } else {
      return res.status(401).json({
        message: 'Invalid Request',
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

module.exports.getAllAssignments = async (req, res) => {
  try {
    let assignments = await Assignment.find({})
      .sort('createdAt')
      .populate({ path: 'owner', select: 'name email' })
      .populate({
        path: 'students',
        populate: {
          path: 'id',
        },
      });

    return res.status(200).json({
      message: 'list of assignments',
      data: { assignments: assignments },
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

module.exports.evaluateAssignments = async (req, res) => {
  try {
    let user = await User.findById(req.user._id);
    if (user && user.type === 'teacher') {
      console.log('indsiddd', req.body);
      let assignment = await Assignment.findById(req.body.aid);
      let std = await User.findById(req.body.sid);
      let exists = false;
      // let aid=null;
      if (assignment && std) {
        console.log('***');
        for (let obj of assignment.students) {
          if (obj.id == req.body.sid) {
            exists = true;
            obj.status = req.body.grade;
            await assignment.save();
            break;
          }
        }

        if (exists) {
          return res.status(200).json({
            data: {
              assignment: assignment,
            },
            message: 'Assignemnt Evaluated',
            success: true,
          });
        } else {
          return res.status(200).json({
            message: 'Not submitted',
            success: false,
          });
        }
      } else {
        return res.status(401).json({
          message: 'Invalid Request',
          success: false,
        });
      }
    } else {
      return res.status(401).json({
        message: 'Invalid Request',
        success: false,
      });
    }
  } catch (error) {
    return res.json(500, {
      message: 'Internal Server Error',
      success: false,
    });
  }
};

module.exports.getAllAssignmentsbyId = async (req, res) => {
  try {
    let assignments = await Assignment.find({ owner: req.body.id })
      .sort('createdAt')
      .populate({
        path: 'students',
        populate: {
          path: 'id',
        },
      });

    return res.status(200).json({
      message: 'list of assignments',
      data: { assignments: assignments },
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
