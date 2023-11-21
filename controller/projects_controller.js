const Project = require('../models/projects');
const Bug = require('../models/bugs');


module.exports.home = function(req, res){
    return res.render('create_project', {
        title: 'Create a Project'
    });
}

module.exports.createProject = async function(req, res){
    try {
        let project = await Project.findOne({
            name: req.body.name
        });
        if(project){
            console.log("Project already exists");
        }
        await Project.create({
            name: req.body.name,
            description: req.body.description,
            author: req.user._id
        });
        return res.redirect('/');

    }catch(err){
        console.log("Error in project controller: ", err);
    }
}

module.exports.projectDetails = async function(req, res) {
    try {
        let project = await Project.findById(req.params.id).populate('author').populate({
            path: 'bugs',
            populate: {
                path: 'author'
            }
        });
        // console.log(project);
        return res.render("project_page", {
            title: "Project Details",
            project: project
        });

    }catch(err){
        console.log("error", err);
    }
}