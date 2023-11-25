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

    let searchBugsBySearchTerm = function(){
        let searchBar = $('#bug-search');

        $(searchBar).on('keyup', function(){
            let self = this;
            let searchValue = $(this).val();
            let projectId = $('main').attr('id').split('-')[1];
            if (searchValue == ''){
                showFullBugList(projectId);
            }else{
                $.ajax({
                    type: "GET",
                    url: `/issue/search?searchTerm=${searchValue}&pId=${projectId}`,
                    success: function(data){
                        let bugTable = $('table');

                        bugTable.html('<tr><td>Title</td><td>Description</td><td>Labels</td><td>Author</td></tr>');

                        for(bug of data.bugs){
                            let newBug = newBugDom(bug);
                            $(bugTable).append(newBug);
                        }
                    }
                });
                
            }
        });
    }

    let filterByLabels = function(){

    }

    let showFullBugList = function(projectId){

        $.ajax({
            type: "GET",
            url: `/projects/${projectId}`,
            success: function(data){

                let bugTable = $('table');

                bugTable.html('<tr><td>Title</td><td>Description</td><td>Labels</td><td>Author</td></tr>');

                for(bug of data.data.bugs){
                    let newBug = newBugDom(bug);
                    $(bugTable).append(newBug);
                }
            },
            error: function(err){
                console.log(err.responseText);
            }
        });
    }


    let newBugDom = function(bug){
        let labels = "";
        for (let i = 0; i < bug.labels.length; i++){
            if(i == bug.labels.length-1){
                labels += bug.labels[i];
            }else{
                labels += bug.labels[i] + ", ";
            }
        }

        return $(`
        <tr id="bug-${bug._id}">
        <td class="bug-title">
            <a href="/issue/delete/${bug._id}>" class="delete-bug">
              <i class="fa-solid fa-trash-can" ></i>
            </a>
          ${bug.title}
        </td>
        <td>
          <p class="description"> ${bug.description}</p>
        </td>
        <td class="labels">
            ${labels}
        </td>
        <td>
          ${bug.author.name}
        </td>
      </tr>
        `);
    }




    deleteBug();
    searchBugsBySearchTerm();
}