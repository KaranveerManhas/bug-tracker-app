const Bug = require('../models/bugs');
const Project = require('../models/projects');
const User = require('../models/users');

// Module for rendering create a new bug
module.exports.home = async function(req, res){

    try{
        let labelsArray = [];

        let project = await Project.findById(req.query.id).populate('author').populate({
            path: 'bugs',
            populate: {
                path: 'author'
            }
        });
        
        project.bugs.forEach(function(bug){
            for (label of bug.labels){
                if (!labelsArray.includes(label)){
                    labelsArray.push(label);
                }
            }
        });

        return res.render('create_bug', {
            title: "Create a new bug",
            project_id: req.query.id,
            labels: labelsArray
        });

    }catch(err){
        console.log("Error in bugController home module: ", err);
    }
}

// Module for creating a bug
module.exports.createBug = async function(req, res){
    try {
        let labels = [];
        labels = req.body.labels.split(",");
        for(let i=0; i<labels.length; i++){
            labels[i] = labels[i].trim();
            if(labels[i] == " "){
                labels.splice(i, 1);
            }
        }

        let bug = await Bug.create({
            title: req.body.title,
            description: req.body.description,
            labels: labels,
            author: req.user,
            project: req.params.id
        });
        let project = await Project.findById(req.params.id);
        project.bugs.push(bug);
        await project.save();
        return res.redirect(`/projects/${req.params.id}`);
    }catch(err){
        console.log("Error in create issue module", err);
    }
}

// Module for deleting a bug
module.exports.deleteBug = async function(req, res){
    try{
        let bug = await Bug.findByIdAndDelete(req.params.id);

        let project = await Project.findById(bug.project._id);

        project.bugs.pull(bug._id);
        await project.save();

        if(req.xhr){
            return res.status(200).json({
                message: "Bug Deleted",
                data: {
                    bug_id: bug._id
                }
            });
        }
        return res.redirect('back');

    }catch(err){
        console.log("Error in delete bug module", err);
    }

}

// Module for searching bugs related to the project using title or description 
module.exports.searchBySearchTerm = async function(req, res){

    try{
        let searchTerm = req.query.searchTerm.toLowerCase();
        let bugArray = [];

        let bugs = await Bug.find({
            project: req.query.pId,
        }).populate('author');
        bugs.forEach(function(bug){
            if(bug.title.toLowerCase().includes(searchTerm) || bug.description.toLowerCase().includes(searchTerm)){
                bugArray.push(bug);
            }
        });

        return res.status(200).json({
            message: "Bugs Found",
            bugs: bugArray,
            user: req.user
        });



    }catch(err){
        console.log("Error in searchBySearchTerm module: ", err);
    }
}

// Module for filtering bugs by labels 
module.exports.searchByFilterLabel = async function(req, res){
    try{
        let bugLabels = req.query.labels;

        let bugs = await Bug.find({
            labels: bugLabels.length == 1 ? bugLabels[0] : {$all:bugLabels},
            project: req.params.id
        }).populate('author');

        return res.status(200).json({
            message: 'Bugs found',
            data: {
                bugs: bugs,
                user: req.user
            }
        });
    }catch(err){
        console.log("Error in searchByFilterLabel module: ", err);
    }
}

// Module for filtering bugs by author
module.exports.searchByFilterAuthor = async function(req, res){
    try{
        let author = await User.findOne({
            _id: req.query.author
        });
        let project = await Project.findOne({
            _id: req.params.id
        });
    
        let bugs = await Bug.find({
            author: author,
            project: project
        }).populate('author');
        
        
        return res.status(200).json({
            message: "Bugs Found",
            data: {
                bugs: bugs
            }
        });

    }catch(err){
        console.log("Error in searchByFilterAuthor module: ", err);
    }
}