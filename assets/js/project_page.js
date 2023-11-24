{
    let deleteBug = function(){

        $('.delete-bug').on('click', function(e){
            e.preventDefault();

            $.ajax({
                type: 'GET',
                url: $(this).attr('href'),
                success: function(data){
                    $(`#bug-${data.data.bug_id}`).remove();
                },
                error: function(error){
                    console.error(error.responseText);
                }
            });
        });
    }

    deleteBug();
}