{
    let deleteProject = function(){
        $('.delete-project').on('click', function(e){
            e.preventDefault();
            
            $.ajax({
                type: 'GET',
                url: $(this).attr('href'),
                success: function(data){
                    $(`#project-${data.data.project_id}`).remove();
                },
                error: function(err){
                    console.log(err.responseText);
                }
            })
        })
    }

    deleteProject();
}