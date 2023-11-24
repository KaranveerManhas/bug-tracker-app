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

module.exports.deleteProject = async function(req, res){
    try{

        let deletedProject = await Project.findByIdAndDelete(req.params.id);
        let deletedBugs = await Bug.deleteMany({
            project: deletedProject
        });
        if(req.xhr){
            return res.status(200).json({
                message: "Deleted Successfully",
                data: {
                    project_id: deletedProject._id
                }
            });
        }

        return res.redirect('back');

    }catch(err){
        console.log("Error in deleteProject: ", err);
    }
}

module.exports.projectDetails = async function(req, res) {
    try {
        let project = await Project.findById(req.params.id).populate('author').populate({
            path: 'bugs',
            populate: {
                path: 'labels'
            },
            populate: {
                path: 'author'
            }
        });
        console.log(project);
        let labels = [];
        project.bugs.forEach(function(bug){
            for (lb of bug.labels){
                if (!labels.includes(lb)){
                    labels.push(lb);
                }
            }
        })
        // console.log(project);
        return res.render("project_page", {
            title: "Project Details",
            project: project,
            labels: labels
        });

    }catch(err){
        console.log("error", err);
    }
}