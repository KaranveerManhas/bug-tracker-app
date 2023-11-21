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
        let bug = await Bug.create({
            title: req.body.title,
            description: req.body.description,
            labels: req.body.labels,
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