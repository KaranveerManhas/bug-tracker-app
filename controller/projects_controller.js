module.exports.home = function(req, res){
    return res.render('create_project', {
        title: 'Create a Project'
    });
}