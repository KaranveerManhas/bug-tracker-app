const Project = require('../models/projects');
const User = require('../models/users');

module.exports.home = async function(req, res){
    try{
        let projects = await Project.find({}).populate('author');
        return res.render('home', {
            title: "Home",
            projects: projects
        });
    }catch(err){
        console.log("Error in home controller: ", err);
    }
}