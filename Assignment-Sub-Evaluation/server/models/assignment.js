// import mongoose odm module
const mongoose = require('mongoose');

// creating the asset schema
const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    students: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        status: {
          type: String,
          default: 'Evalutation Pending',
        },
        upload: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// creating model from schema
const Assignment = mongoose.model('Assignment', assignmentSchema);

// export the model
module.exports = Assignment;
