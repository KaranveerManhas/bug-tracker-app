// Import Project Schema 
const Project = require('../models/projects');

// Render homepage and pass all projects
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