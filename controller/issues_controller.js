module.exports.home = function(req, res){
    return res.render('create_issue', {
        title: "Create a new issue"
    });
}