// Ajax call to delete projects from project list on homepage
{
    let deleteProject = function(){
        // Add event listener to delete link of project
        $('.delete-project').on('click', function(e){
            // Prevent default action
            e.preventDefault();
            
            // Call ajax request to delete project from database
            $.ajax({
                type: 'GET',
                url: $(this).attr('href'),
                success: function(data){
                    // If the request is successful, remove the project from the DOM 
                    $(`#project-${data.data.project_id}`).remove();
                },
                error: function(err){
                    console.log(err.responseText);
                }
            })
        })
    }
    // Call the function
    deleteProject();
}