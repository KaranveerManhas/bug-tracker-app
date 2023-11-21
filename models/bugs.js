const mongoose = require('mongoose');

const bugSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    labels: [
        {
            type: String,
            required: true
        }
    ],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project'
    }
}, {
    timestamps: true
});


const Bug = mongoose.model('bugs', bugSchema);

module.exports = Bug;