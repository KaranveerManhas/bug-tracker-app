const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    bugs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'bugs'
        }
    ]
}, {
    timestamps: true
});

const Project = mongoose.model('project', projectSchema);

module.exports = Project;