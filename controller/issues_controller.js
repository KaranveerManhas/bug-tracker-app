const Bug = require('../models/bugs');
const Project = require('../models/projects');


module.exports.home = function(req, res){
    return res.render('create_issue', {
        title: "Create a new issue",
        project_id: req.query.id
    });
}

module.exports.createIssue = async function(req, res){
    try {
        let labels = req.body.labels.split(",");

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

module.exports.deleteIssue = async function(req, res){
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
        console.log("Error in delete issue module", err);
    }

}